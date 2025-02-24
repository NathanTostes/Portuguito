import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, TouchableOpacity, Image, ActivityIndicator, Modal } from "react-native";
import Styles from "../Styles.js/StylesPerfilAluno";
import style from "../Styles.js/StylesModalIcon";
import { getInfoUser } from "../FuncoesFirebase/Funcoes";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_APP } from "../../FirebaseConfig";
import { format } from "date-fns";

import { updateSequenceDays } from "../FuncoesFirebase/Funcoes";
import { doc, getDocs, collection, query } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { Ionicons } from "react-native-vector-icons";

export default function PerfilAluno() {
  const db = getFirestore(FIREBASE_APP);

  const [user, setUser] = useState(null);
  const [sequenciaDias, setSequenciaDias] = useState(0);
  const [icons, setIcons] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalIconColor, setModalIconColor] = useState(null);
  const [modalDescription, setModalDescription] = useState(null);

  const userIcons = {};

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = FIREBASE_AUTH;

      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          const userInfo = await getInfoUser(currentUser.email);
          if (userInfo) {
            setUser(userInfo);
            setSequenciaDias(userInfo.sequenciaDias || 0);

            try {
              const userRef = doc(db, "users", userInfo.userId);
              const userIconsRef = collection(userRef, "userIcons");
              const userIconsQuery = query(userIconsRef);
              const dayInfoSnapshot = await getDocs(userIconsQuery);

              const iconNames = [];
              dayInfoSnapshot.forEach((icon) => {
                iconNames.push((icon.data()).icon);
              });

              iconNames.forEach((iconName) => {
                if (!userIcons[iconName]) {
                  userIcons[iconName] = 1;
                  return;
                }
                userIcons[iconName] += 1;
              });

              setIcons(userIcons);
            } catch (error) {
              console.error("Erro ao buscar ícones: ", error);
            }


            try {
              await updateSequenceDays(currentUser.email);
            } catch (error) {
              console.error("Erro ao atualizar sequência de dias:", error);
            }
          } else {
            console.error("Usuário não encontrado no Firestore.");
          }
        } else {
          setUser(null);
        }
      });

      return () => unsubscribe();
    };

    fetchUserData();
  }, []);

  const logout = async () => {
    if (!user) {
      console.error("Usuário não autenticado.");
      return;
    }

    try {
      const auth = FIREBASE_AUTH;

      console.log("UID do usuário:", user.userId);

      await auth.signOut();
      console.log("Logout realizado com sucesso.");
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
    }
  };

  const openIconModal = (iconPath, descriptionText) => {
    setModalIconColor(iconPath);
    setModalDescription(descriptionText);
    setModalVisible(true);
  };

  function IconModalThrophy({ iconColor, description, visible, onClose }) {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}>
        <View style={style.container}>
          <View style={style.boxGeral}>
            <View style={style.modalHeader}>
              <Text style={style.modalTitle}>Conquista</Text>
              <TouchableOpacity style={style.closeButton} onPress={onClose}>
                <Ionicons name="close" style={style.iconeDelete} />
              </TouchableOpacity>
            </View>
            <View style={style.modalBody}>
              <Ionicons name="trophy" size={55} color={iconColor} />
              <Text style={style.modalDescription}>{description}</Text>
            </View>
          </View>
        </View>
      </Modal >
    );
  }


  return (
    <LinearGradient colors={["#D5D4FB", "#9B98FC"]} style={Styles.gradient}>
      <View style={Styles.container}>
        <IconModalThrophy
          iconColor={modalIconColor}
          description={modalDescription}
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
        <View style={Styles.backgroundUser}>
          <Image
            style={Styles.image}
            source={require("../Imagens/portuguita_profile.jpg")}
          />
        </View>

        <TouchableOpacity
          style={[Styles.botao, Styles.sombra]}
          onPress={() => logout()}
        >
          <Text style={Styles.txtBotao}>Sair</Text>
        </TouchableOpacity>

        <View style={Styles.containerFilho}>
          <View style={Styles.viewOptions}>
            <Text style={Styles.txtInput}>
              Nome: {user ? user.nome : ""}
            </Text>
          </View>
        </View>

        <View style={Styles.containerFilho}>
          <View style={Styles.containerSonAux}>
            <View style={Styles.containerSonAuxFlexbox}>
              <View style={Styles.ViewDados}>
                <View style={Styles.titleView}>
                  <Text style={Styles.txtTitleView}>Sequência</Text>
                </View>

                <View style={Styles.numberDays}>
                  <Text style={Styles.txtnumberDays}>{sequenciaDias}</Text>
                </View>

                <View style={Styles.titleView}>
                  <Text style={Styles.txtTitleView}>Dia(s)</Text>
                </View>
              </View>

              <View style={Styles.ViewDados}>
                <View style={Styles.titleView}>
                  <Text style={Styles.txtTitleView}>Desde</Text>
                </View>

                <View style={Styles.numberDays}>
                  <Text style={Styles.txtDate}>
                    {user
                      ? format(user.dataCadastro.toDate(), "dd/MM/yy")
                      : ""}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={Styles.containerFilho}>
          <View style={[Styles.viewOptions, Styles.campoEmail]}>
            <Text style={Styles.txtInput}>
              E-mail: {user ? user.email : ""}
            </Text>
          </View>
        </View>

        <Text style={Styles.txtAchievements}>Conquistas</Text>

        {
          (icons === null) ? (
            <View style={Styles.containerFilho}>
              <View style={Styles.playerIcons}>
                <ActivityIndicator size="large" color="#EFEFFE"></ActivityIndicator>
              </View>
            </View>
          ) : (
            (Object.keys(icons).length === 0) ? (
              <View style={Styles.containerFilho}>
                <View style={Styles.playerIcons}>
                  <Text style={Styles.txtNoIcon}>
                    Você ainda não possui nenhuma conquista
                  </Text>
                </View>
              </View>
            ) : (
              <View style={Styles.containerFilho}>
                <View style={Styles.playerIcons}>
                  {icons?.primeiroDesafio &&
                    <TouchableOpacity
                      onPress={() => {
                        openIconModal();
                        setModalIconColor("#FFD700");
                        setModalDescription('1° lugar no desafio semanal');
                      }
                      }>
                      <View style={Styles.iconContainer}>
                        <Ionicons name="trophy" size={55} color="#FFD700" />
                        <View style={Styles.iconQuantity}>
                          <Text style={Styles.txtNoIcon}>{icons.primeiroDesafio}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  }
                  {icons?.segundoDesafio &&
                    <TouchableOpacity
                      onPress={() => {
                        openIconModal();
                        setModalIconColor("#E9E9E9");
                        setModalDescription('2° lugar no desafio semanal');
                      }
                      }>
                      <View style={Styles.iconContainer}>
                        <Ionicons name="trophy" size={55} color="#E9E9E9" />
                        <View style={Styles.iconQuantity}>
                          <Text style={Styles.txtNoIcon}>{icons.segundoDesafio}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  }
                  {icons?.terceiroDesafio &&
                    <TouchableOpacity
                      onPress={() => {
                        openIconModal();
                        setModalIconColor("#CD853F");
                        setModalDescription('3° lugar no desafio semanal');
                      }
                      }>
                      <View style={Styles.iconContainer}>
                        <Ionicons name="trophy" size={55} color="#CD853F" />
                        <View style={Styles.iconQuantity}>
                          <Text style={Styles.txtNoIcon}>{icons.terceiroDesafio}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  }
                </View>
              </View>
            )
          )
        }
      </View>
    </LinearGradient>
  );
}
