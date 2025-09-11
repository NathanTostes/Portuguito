import React, { useState, useEffect, useCallback } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, TouchableOpacity, Image, ActivityIndicator, Modal, ScrollView } from "react-native";
import Styles from "../Styles.js/StylesPerfilAluno";
import stylesModalIcon from "../Styles.js/StylesModalIcon";
import { getInfoUser } from "../FuncoesFirebase/Funcoes";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_APP } from "../../FirebaseConfig";
import { format } from "date-fns";
import AntDesign from '@expo/vector-icons/AntDesign';

import { updateSequenceDays } from "../FuncoesFirebase/Funcoes";
import { doc, getDocs, collection, query } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { Ionicons } from "react-native-vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

export default function PerfilAluno() {
  const db = getFirestore(FIREBASE_APP);

  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [sequenciaDias, setSequenciaDias] = useState(0);
  const [icons, setIcons] = useState(null);
  const [modalIconVisible, setModalIconVisible] = useState(false);
  const [modalLogoVisible, setModalLogoVisible] = useState(false);
  const [modalIconColor, setModalIconColor] = useState(null);
  const [modalDescription, setModalDescription] = useState(null);
  const [profileImage, setProfileImage] = useState(undefined);

  const navigation = useNavigation();

  const auth = FIREBASE_AUTH;

  const profileImages = {
    "baseProfile": require("../Imagens/profile/profileBase.jpg"),
    "oldProfile": require("../Imagens/profile/profileOld.png"),
    "coguProfile": require("../Imagens/profile/profileCogu.png"),
    "studentProfile": require("../Imagens/profile/profileLibrary.png"),
    "pirateProfile": require("../Imagens/profile/profilePirate.png"),
    "podioProfile": require("../Imagens/profile/profilePodio.png"),
  };

  const userIcons = {};

  const fetchUserData = async () => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userInfo = await getInfoUser(currentUser.email);
        if (userInfo) {
          setUser(userInfo);
          setUserId(userInfo.userId);
          setSequenciaDias(userInfo.sequenciaDias || 0);
          if (userInfo.urlImagemPerfil === "") {
            setProfileImage(profileImages["baseProfile"]);
          } else {
            setProfileImage(profileImages[userInfo.urlImagemPerfil]);
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

  useFocusEffect(

    useCallback(() => {
      setProfileImage(undefined);
      fetchUserData();
    }, [])
  );

  useEffect(() => {
    const fetchUserAchieviments = async () => {
      const fetch = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          const userInfo = await getInfoUser(currentUser.email);
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
        }
      });

      return () => unsubscribe();
    }

    fetchUserAchieviments();
  }, []);

  const logout = async () => {
    try {
      const auth = FIREBASE_AUTH;

      await auth.signOut();
      console.log("Logout realizado com sucesso.");
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
    }
  };

  const openIconModal = (iconPath, descriptionText) => {
    setModalIconColor(iconPath);
    setModalDescription(descriptionText);
    setModalIconVisible(true);
  };

  function ModalLogo({ visible, onClose }) {

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}>
        <View style={stylesModalIcon.container}>
          <View style={stylesModalIcon.boxGeral}>
            <View style={stylesModalIcon.modalHeader}>
              <Text style={stylesModalIcon.logoModalTitle}>Apoiador</Text>
              <TouchableOpacity style={stylesModalIcon.closeButton} onPress={onClose}>
                <Ionicons name="close" style={stylesModalIcon.iconeDelete} />
              </TouchableOpacity>
            </View>
            <View style={stylesModalIcon.modalBody}>
              <Text style={stylesModalIcon.modalLogoDescription}>Projeto desenvolvido no </Text>
              <View
                style={Styles.modalLogoContainer}
                onPress={() => {
                  setModalLogoVisible(true);
                }}>
                <Image
                  style={Styles.modalLogo}
                  source={require('./../Imagens/modalLogoIF.png')}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal >
    );
  }

  function IconModalThrophy({ iconColor, description, visible, onClose }) {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}>
        <View style={stylesModalIcon.container}>
          <View style={stylesModalIcon.boxGeral}>
            <View style={stylesModalIcon.modalHeader}>
              <Text style={stylesModalIcon.modalTitle}>Conquista</Text>
              <TouchableOpacity style={stylesModalIcon.closeButton} onPress={onClose}>
                <Ionicons name="close" style={stylesModalIcon.iconeDelete} />
              </TouchableOpacity>
            </View>
            <View style={stylesModalIcon.modalBody}>
              <Ionicons name="trophy" size={55} color={iconColor} />
              <Text style={stylesModalIcon.modalDescription}>{description}</Text>
            </View>
          </View>
        </View>
      </Modal >
    );
  }

  return (

    <LinearGradient colors={["#D5D4FB", "#9B98FC"]} style={Styles.gradient}>

      <ScrollView contentContainerStyle={Styles.container}>
        <IconModalThrophy
          iconColor={modalIconColor}
          description={modalDescription}
          visible={modalIconVisible}
          onClose={() => setModalIconVisible(false)}
        />
        <ModalLogo
          visible={modalLogoVisible}
          onClose={() => setModalLogoVisible(false)}
        />
        <TouchableOpacity
          style={Styles.logoContainer}
          onPress={() => {
            setModalLogoVisible(true);
          }}>
          <Image
            style={Styles.logo}
            source={require('./../Imagens/logoIF.png')}
          />
        </TouchableOpacity>
        <View style={Styles.profileFrame}>
          <TouchableOpacity
            style={Styles.editIconFrame}
            onPress={() => {
              navigation.navigate('ProfileImage', { userId })
            }}
          >
            <Ionicons name="add-outline" style={Styles.editIcon} />
          </TouchableOpacity>
          <View style={Styles.backgroundUser}>
            {
              profileImage === undefined ? (
                <View style={Styles.loadingProfile}>
                  <ActivityIndicator size="large" color="#ffffff"></ActivityIndicator>
                </View>
              ) : (
                <Image
                  style={Styles.image}
                  source={profileImage}
                />
              )
            }
          </View>
        </View>

        <View style={Styles.buttonRate}>
          <TouchableOpacity
            style={Styles.editIconFrame}
            onPress={() => navigation.navigate("Rate")}
          >
            <AntDesign name="notification" style={Styles.editIcon} />
          </TouchableOpacity>
        </View>

        <View style={Styles.containerBotoes}>
          <TouchableOpacity
            style={[Styles.botao, Styles.sombra]}
            onPress={() => logout()}
          >
            <Text style={Styles.txtBotao}>Sair</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[Styles.botao, Styles.sombra]}
            onPress={() => navigation.navigate("Configuracao")}
          >
            <Text style={Styles.txtBotao}>Configuração</Text>
          </TouchableOpacity>
        </View>



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

      </ScrollView>

    </LinearGradient >
  );
}
