import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, TouchableOpacity, Image, ActivityIndicator, Modal, BackHandler } from "react-native";
import Styles from "../Styles.js/StylesPerfilAluno";
import style from "../Styles.js/StylesModalIcon";
import { FIREBASE_APP } from "../../FirebaseConfig";
import { format } from "date-fns";
import { useNavigation, useRoute } from "@react-navigation/native";

import { where, doc, getDocs, collection, query } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { Ionicons } from "react-native-vector-icons";

export default function UserProfile() {
  const db = getFirestore(FIREBASE_APP);
  const navigation = useNavigation()
  const route = useRoute()

  const userId = route.params?.params?.userId;

  const [user, setUser] = useState(null);
  const [sequenciaDias, setSequenciaDias] = useState(0);
  const [icons, setIcons] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalIconColor, setModalIconColor] = useState(null);
  const [modalDescription, setModalDescription] = useState(null);
  const [profileImage, setProfileImage] = useState(undefined);

  const userIcons = {};

  const profileImages = {
    "baseProfile": require("../Imagens/profile/profileBase.jpg"),
    "oldProfile": require("../Imagens/profile/profileOld.png"),
    "coguProfile": require("../Imagens/profile/profileCogu.png"),
    "studentProfile": require("../Imagens/profile/profileLibrary.png"),
    "pirateProfile": require("../Imagens/profile/profilePirate.png"),
    "podioProfile": require("../Imagens/profile/profilePodio.png"),
  };

  useEffect(() => {
    const getUserById = async (id) => {
      try {
        const q = query(collection(db, "users"), where("userId", "==", id));

        const querySnapshot = await getDocs(q);

        if (querySnapshot.size <= 0) {
          return;
        }

        const userData = querySnapshot.docs[0].data();

        setUser(userData);
        setSequenciaDias(userData.sequenciaDias);
        if (userData.urlImagemPerfil === "") {
          setProfileImage(profileImages["baseProfile"]);
        } else {
          setProfileImage(profileImages[userData.urlImagemPerfil]);
        }
      } catch (error) {
        console.error("(Error) User not found: ", error);
      }
    }

    const getUserIconsById = async (id) => {
      try {
        const userRef = doc(db, "users", id);
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
        console.error("(error) User icons not found: ", error);
      }
    }

    getUserIconsById(userId);
    getUserById(userId);
  }, [])

  useEffect(() => {
    const onBackPress = () => {
      navigation.navigate("ChallengeRanking");

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress
    );

    return () => backHandler.remove();
  }, []);

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
        <View style={Styles.voltar}>
          <TouchableOpacity style={Styles.paginationButton} onPress={() => navigation.navigate('ChallengeRanking')}>
            <Ionicons name="arrow-back" style={Styles.iconStyle} />
          </TouchableOpacity>
        </View>
        <IconModalThrophy
          iconColor={modalIconColor}
          description={modalDescription}
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
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
                    Este usuário não possui nenhuma conquista
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
