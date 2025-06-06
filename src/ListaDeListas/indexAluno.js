import React, { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity, Text, Modal, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./styles";
import { FIREBASE_APP } from "../../FirebaseConfig";
import { useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Styles from "../Styles.js/StylesRespostaCorretaAluno";
import Styless from "../Styles.js/StylesRespostaIncorretaAluno";
import StylesEnd from "../Styles.js/StylesTerminouListaAluno";
import "firebase/firestore";
import { BackHandler } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Markdown from "react-native-markdown-display";
import { RadioButtonGroup, RadioButtonItem } from "../Componentes/RadioButtonGroup";

import { getFirestore, doc, getDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import { FIREBASE_AUTH } from "../../FirebaseConfig";

export default function QuestoesAluno() {
  const route = useRoute();
  let codigoLista = route.params.itemId;
  const [questoes, setQuestoes] = useState([]);
  const [indice, setIndice] = useState(0);
  const [questoesCarregadas, setQuestoesCarregadas] = useState(false);
  const [value, setValue] = useState("");
  const [acertos, setAcertos] = useState(0);
  const [erros, setErros] = useState(0);
  const [acertoQuestoes, setAcertoQuestoes] = useState([]);
  const [correct, setCorrect] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const [end, setEnd] = useState(false);
  const [atualizar, setAtualizar] = useState(true);
  const [showInitialAnimation, setShowInitialAnimation] = useState(true);
  const [noImage, setNoImage] = useState(null);
  const [loadingImage, setLoadingImage] = useState(true);
  const [showUnlockModal, setShowUnlockModal] = useState(false);

  const auth = FIREBASE_AUTH;

  const aluno = auth.currentUser.uid;

  const navigation = useNavigation();

  const questoesCarregadasRef = useRef(questoesCarregadas);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("MenuAluno");
      return true;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => backHandler.remove();
  }, [navigation]);

  useEffect(() => {
    setShowInitialAnimation(true);
    codigoLista = route.params.itemId;

    setIndice(0);
    setQuestoesCarregadas(false);

    if (codigoLista) {
      const obterQuestoes = async () => {
        try {
          const db = getFirestore(FIREBASE_APP);
          const documentoRef = doc(db, "ListaAluno", codigoLista);
          const documentoSnapshot = await getDoc(documentoRef);

          if (documentoSnapshot.exists()) {
            const data = documentoSnapshot.data();

            if (data && data.questoes.length > 0) {
              const referenciasQuestoes = data.questoes;
              const questoesPromises = referenciasQuestoes.map(
                async (referencia) => {
                  const questaoDoc = await getDoc(referencia);
                  return questaoDoc.exists() ? questaoDoc.data() : null;
                }
              );

              const questoesArrayResultado =
                await Promise.all(questoesPromises);
              const questoesFiltradas = questoesArrayResultado.filter(
                (questao) => questao
              );
              setQuestoes(questoesFiltradas);
              setQuestoesCarregadas(true);

              const acertos = 0;
              const erros = 0;
              setAcertos(acertos);
              setErros(erros);
            } else {
              setQuestoesCarregadas(false);
            }
          } else {
            console.log("Documento não encontrado.");
          }
        } catch (error) {
        }
        setLoadingImage(false);
      };

      obterQuestoes();
    }

    setTimeout(() => {
      setShowInitialAnimation(false);
    }, 2050);
  }, [codigoLista, navigation, atualizar]);

  const refreshComponent = () => {
    setAtualizar((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refreshComponent();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const noImageAnimations = [
      require('../Imagens/noImageAnimations/Alertinha.gif'),
      require('../Imagens/noImageAnimations/Lupinha.gif'),
      require('../Imagens/noImageAnimations/Aflito.gif'),
    ];

    if (
      !questaoAtual?.urlImagem
    ) {
      const randomImage = noImageAnimations[
        Math.floor(Math.random() * noImageAnimations.length)
      ];
      setNoImage(randomImage);
    }
  }, [questaoAtual]);

  const conferirQuestao = async (respostaCorreta, respostaALuno) => {
    const isAcerto = respostaCorreta === respostaALuno;

    const novosAcertos = isAcerto ? acertos + 1 : acertos;
    const novosErros = !isAcerto ? erros + 1 : erros;
    const novoAcertoQuestoes = [...acertoQuestoes, isAcerto];

    setAcertos(novosAcertos);
    setErros(novosErros);
    setAcertoQuestoes(novoAcertoQuestoes);

    respostaCorreta === respostaALuno
      ? setCorrect(true)
      : setIncorrect(true);
  };

  const proximaQuestao = () => {
    if (indice < questoes.length - 1) {
      setIndice(indice + 1);
      setCorrect(false);
      setIncorrect(false);
    } else {
      setEnd(true);
    }
    setLoadingImage(false);
  };

  const unlockImage = async () => {
    if (questoes.length == acertos) {
      const db = getFirestore(FIREBASE_APP);
      const userRef = doc(db, "users", aluno);
      const userProfilesRef = collection(userRef, "userProfiles");
      const imageQuery = query(userProfilesRef, where("profileName", "==", "studentProfile"));
      const querySnapshot = await getDocs(imageQuery);

      querySnapshot.forEach(async (docSnap) => {
        const data = docSnap.data();
        if (data.has === false) {
          await updateDoc(docSnap.ref, { has: true });
          setShowUnlockModal(true);
        }
      });
    }
  };

  const finishActivity = async () => {
    try {
      const db = getFirestore(FIREBASE_APP);
      const listaDocRef = doc(db, "ListaAluno", codigoLista);
      const listaDocSnapshot = await getDoc(listaDocRef);

      const oldAcertos = listaDocSnapshot.data().acertos;
      console.log(oldAcertos);

      if (oldAcertos >= acertos) {
        return;
      }

      if (listaDocSnapshot.exists()) {
        await updateDoc(listaDocRef, {
          acertos: acertos,
          erros: erros,
          acertoQuestoes: acertoQuestoes,
        });

      }
    } catch (error) {
      console.log(error)
    }
  }

  const finishList = async () => {
    setIndice(0);
    setCorrect(false);
    setIncorrect(false);
    setAcertos(0);
    setErros(0);
    setAcertoQuestoes([]);

    unlockImage();
    finishActivity();

    setEnd(false);
    navigation.navigate("MenuAluno");
  };

  const ModalUnlock = () => {
    return (
      <Modal animationType="fade" transparent={false} visible={showUnlockModal}>
        <LinearGradient colors={["#D5D4FB", "#9B98FC"]} style={Styless.gradient}>
          <View style={Styles.container}>
            <View style={Styles.boxTitle}>
              <Text style={Styles.Title}>
                PARABÉNS!
                <Text style={Styles.SubTitle}>{'\n'}Você desbloqueou uma nova imagem!</Text>
              </Text>
            </View>

            <View style={Styless.boxImage}>
              <Image
                style={{ width: 200, height: 200, marginTop: 100, borderRadius: 20 }}
                source={require("../Imagens/profile/profileLibrary.png")}
              />
            </View>

            <View style={Styles.buttomBox}>
              <TouchableOpacity
                style={Styles.buttom}
                onPress={() => setShowUnlockModal(false)}
              >
                <Text style={[Styles.FontFormatButtom, Styles.shadow]}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </Modal>
    );
  };


  const ModalSad = () => {
    return (
      <Modal animationType="fade" transparent={false} visible={incorrect}>
        <LinearGradient
          colors={["#D5D4FB", "#9B98FC"]}
          style={Styless.gradient}
        >
          <View style={Styless.container}>
            <View style={Styles.boxTitle}>
              <Text style={Styles.Title}>
                QUE PENA
                <Text style={Styles.SubTitle}>{'\n'}Resposta Incorreta</Text>
              </Text>
            </View>

            <View style={Styless.box}>
              <View style={Styless.boxImage}>
                <Image
                  style={Styless.ImageFormat}
                  source={require("../Imagens/animations/AnimacoesMascoteErrouMaioria.gif")}
                />
              </View>

              <View style={Styless.subDivTag}>
                <View style={Styless.subSubDivTag}>
                  <View style={Styless.tagText}>
                    <Text style={Styless.FontFormat}>Acertos:</Text>
                  </View>
                  <View style={Styless.tagText}>
                    <Text style={Styless.FontFormat}>Erros:</Text>
                  </View>
                </View>
              </View>

              <View style={Styless.buttomBox}>
                <TouchableOpacity
                  style={Styless.buttom}
                  onPress={() => proximaQuestao()}
                >
                  <Text style={[Styless.FontFormatButtom, Styless.shadow]}>
                    Próxima questão
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>
      </Modal>
    );
  };

  const ModalHappy = () => {
    return (
      <Modal animationType="fade" transparent={false} visible={correct}>
        <LinearGradient colors={["#D5D4FB", "#9B98FC"]} style={Styles.gradient}>
          <View style={Styles.container}>
            <View style={Styles.boxTitle}>
              <Text style={Styles.Title}>
                MUITO BEM!
                <Text style={Styles.SubTitle}>{'\n'}Certa Resposta</Text>
              </Text>
            </View>

            <View style={Styles.box}>
              <View style={Styles.boxImage}>
                <Image
                  style={Styles.ImageFormat}
                  source={require("../Imagens/animations/AnimacoesMascoteAcimaDaMedia.gif")}
                />
              </View>

              <View style={Styles.subDivTag}>
                <View style={Styles.subSubDivTag}>
                  <View style={Styles.tagText}>
                    <Text style={Styles.FontFormat}>Acertos:</Text>
                  </View>
                  <View style={Styles.tagText}>
                    <Text style={Styles.FontFormat}>Erros:</Text>
                  </View>
                </View>
              </View>

              <View style={Styles.buttomBox}>
                <TouchableOpacity
                  style={Styles.buttom}
                  onPress={() => proximaQuestao()}
                >
                  <Text style={[Styles.FontFormatButtom, Styles.shadow]}>
                    Próxima questão
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>
      </Modal>
    );
  };

  const ModalEnd = () => {
    const acertouTodas = acertos === questoes.length
    const acertouMaioria = acertos > questoes.length / 2;
    return (
      <Modal animationType="fade" transparent={false} visible={end}>
        <LinearGradient
          colors={["#D5D4FB", "#9B98FC"]}
          style={StylesEnd.gradient}
        >
          <View style={StylesEnd.container}>
            <View style={StylesEnd.boxTitle}>
              {acertouTodas ? (
                <Text style={StylesEnd.Title}>
                  PERFEITO!
                  <Text style={StylesEnd.SubTitle}>
                    {'\n'}Você acertou todas as questões e passou de fase!
                  </Text>
                </Text>
              ) : acertouMaioria ? (
                <Text style={StylesEnd.Title}>
                  PARABÉNS!
                  <Text style={StylesEnd.SubTitle}>
                    {'\n'}Você acertou a maioria da lista!
                  </Text>
                </Text>
              ) : (
                <View>
                  <Text style={StylesEnd.Title}>
                    POR POUCO
                  </Text>
                  <Text style={StylesEnd.SubTitle}>
                    {'\n'}Tente novamente...
                  </Text>
                </View>
              )}
            </View>

            <View style={StylesEnd.box}>
              <View style={StylesEnd.boxImage}>
                {acertouTodas ? (
                  <Image
                    style={StylesEnd.ImageFormat}
                    source={require("../Imagens/animations/AnimacoesMascoteAcertatudo.gif")}
                  />
                ) : acertos > questoes.length * 0.6 ? (
                  <Image
                    style={StylesEnd.ImageFormat}
                    source={require("../Imagens/animations/AnimacoesMascoteAcimaDaMedia.gif")}
                  />
                ) : (
                  <Image
                    style={StylesEnd.ImageFormat}
                    source={require("../Imagens/animations/AnimacoesMascoteErrouMaioria.gif")}
                  />
                )}

              </View>

              <View style={StylesEnd.subDivTag}>
                <View style={StylesEnd.subSubDivTag}>
                  <View style={StylesEnd.tagText}>
                    <Text style={StylesEnd.FontFormat}>Acertos: {acertos}</Text>
                  </View>
                  <View style={StylesEnd.tagText}>
                    <Text style={StylesEnd.FontFormat}>Erros: {erros}</Text>
                  </View>
                </View>
              </View>

              <View style={StylesEnd.buttomBox}>
                <TouchableOpacity
                  style={StylesEnd.buttom}
                  onPress={() => finishList()}
                >
                  <Text style={[StylesEnd.FontFormatButtom, StylesEnd.shadow]}>
                    Confirmar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>
      </Modal>
    );
  };

  const questaoAtual = questoes[indice];
  const [btnRadioClicado, setbtnRadioClicado] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <LinearGradient colors={["#D5D4FB", "#9B98FC"]} style={styles.gradient}>
      <ModalHappy />
      <ModalSad />
      <ModalEnd />
      <ModalUnlock />
      {questoesCarregadas && questaoAtual && !showInitialAnimation ? (
        <>
          <View style={styles.progressContainerInfo}>
            <Text style={styles.infoAcertos}>{acertos}</Text>
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, { width: `${(acertos / questoes.length) * 100}%`, backgroundColor: '#4CAF50' }]} />
              <View style={[styles.progressBar, { width: `${(erros / questoes.length) * 100}%`, backgroundColor: '#F54F59', left: `${100 - (erros / questoes.length) * 100}%` }]} />
            </View>
            <Text style={styles.infoErros}>{erros}</Text>
          </View>

          <View style={styles.container}>
            <View style={styles.enunciado}>
              <View style={styles.backgroundImagem}>
                {loadingImage ? (
                  <ActivityIndicator size="large" color="#EFEFFE"></ActivityIndicator>
                ) : (
                  questoes[indice]?.urlImagem && questoes[indice].urlImagem.startsWith('http') ? (
                    <TouchableOpacity onPress={() => setIsExpanded(true)}>
                      <ActivityIndicator size="large" color="#EFEFFE" style={styles.loader}></ActivityIndicator>
                      <Image
                        style={styles.imagem}
                        source={{ uri: questoes[indice].urlImagem }}
                        contentFit="contain"
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity>
                      <Image
                        style={styles.imagem}
                        source={noImage}
                        contentFit="contain"
                      />
                    </TouchableOpacity>
                  )
                )
                }

                {/* Modal para exibir a imagem expandida */}
                <Modal visible={isExpanded} transparent={true} animationType="fade">
                  <View style={styles.modalContainer}>
                    <TouchableOpacity onPress={() => setIsExpanded(false)}>
                      <Image source={{ uri: questoes[indice].urlImagem }} style={styles.fullImage} />
                    </TouchableOpacity>
                  </View>
                </Modal>
              </View>
              <Markdown
                style={{
                  body: {
                    fontSize: 16,
                    color: "#fff",
                    top: 0,
                    width: "90%",
                    left: 5,
                    padding: 5,
                    textAlign: "left",
                    fontFamily: "Inder_400Regular",
                  },
                }}
              >
                {questoes[indice].pergunta}
              </Markdown>
            </View>

            <View style={styles.container}>
              <ScrollView style={styles.questoes}>
                <RadioButtonGroup
                  selected={value}
                  onSelected={(value) => {
                    setValue(value)
                    setbtnRadioClicado(false)
                  }}
                  radioBackground="#F54F59"
                >

                  {questoes[indice].respostas.map((resposta, index) => (
                    <RadioButtonItem
                      key={index}
                      label={
                        <View
                          style={{
                            flexDirection: "row-reverse",
                            backgroundColor: "#ffb9bd",
                            borderRadius: 40,
                            width: '90%',
                            paddingHorizontal: '3%',
                            marginTop: 5,
                            height: "auto",
                            left: -30,
                            position: "relative",
                            zIndex: -1,
                          }}
                        >
                          <Markdown
                            style={{
                              body: {
                                fontSize: 16,
                                color: "#fff",
                                top: 0,
                                width: "90%",
                                left: -0.5,
                                padding: 5,
                                textAlign: "center",
                                fontFamily: "Inder_400Regular",
                              },
                            }}
                          >
                            {resposta}
                          </Markdown>
                        </View>
                      }
                      value={resposta}
                      style={{
                        borderWidth: 1,
                        borderRadius: 12.5,
                        borderColor: "#fff",
                        left: 7,
                        top: 3,
                        backgroundColor: '#fff',
                        width: 25,
                        height: 25,
                      }}
                    />
                  ))}
                </RadioButtonGroup>
                <View style={styles.containerContinuar}>
                  <TouchableOpacity
                    style={[styles.confirmar, btnRadioClicado ? styles.btnDesativado : styles.btnAtivado]}
                    disabled={btnRadioClicado}
                    onPress={() => {
                      setLoadingImage(true);
                      conferirQuestao(
                        questoes[indice].respostaCorreta,
                        value
                      )
                      setbtnRadioClicado(true)
                    }}
                  >
                    <Text style={styles.label}>Confirmar</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            style={{
              flex: 1,
              width: "100%",
              height: undefined,
              aspectRatio: 1,
            }}
            source={require("../Imagens/TranFinal.gif")}
            contentFit="contain"
          />
        </View>
      )}
    </LinearGradient>
  );
}
