import React, { useState, useEffect } from "react";
import { View, Modal, Image, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Styles from "../Styles.js/StylesPerfil";
import stylesModalIcon from "../Styles.js/StylesModalIcon";
import { onAuthStateChanged } from 'firebase/auth';
import { getInfoUser } from "../FuncoesFirebase/Funcoes";
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Ionicons } from "@expo/vector-icons";


export default function Perfil() {
  const [usuario, setUsuario] = useState();
  const [modalLogoVisible, setModalLogoVisible] = useState(false);

  const navigation = useNavigation();

  const logout = () => {
    const auth = getAuth();

    signOut(auth);
  }

  useEffect(() => {
    const fetchData = async (user) => {
      try {
        const usuario = await getInfoUser(user.email);
        setUsuario(usuario);
      } catch (error) {
        console.error("Erro ao obter informações do usuário:", error);
      }
    };

    const unsubscribeFromAuthStateChanged = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        fetchData(user);
      }
    });

    return () => {
      unsubscribeFromAuthStateChanged();
    };
  }, []);

  function ModalLogo({ visible, onClose }) {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}>
        <View style={stylesModalIcon.container}>
          <View style={stylesModalIcon.boxGeral}>
            <View style={stylesModalIcon.modalHeader}>
              <Text style={stylesModalIcon.logoModalTitle}></Text>
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

  return (
    <LinearGradient colors={['#D5D4FB', '#9B98FC']}
      style={Styles.gradient} >
      <View style={Styles.container}>
        <ModalLogo
          visible={modalLogoVisible}
          onClose={() => setModalLogoVisible(false)}
        />
        <TouchableOpacity style={Styles.editIconFrame} onPress={() => navigation.navigate("Rate")}>
          {/* <Text style={Styles.txtBotao}>Avaliar</Text> */}
          <AntDesign name="notification" style={Styles.editIcon} />
        </TouchableOpacity>
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
        <View style={Styles.backgroundUser}>
          <Image style={Styles.image} source={require("../Imagens/profile/profileBase.jpg")} />
        </View>
        <View style={Styles.containerBotoes}>
          <TouchableOpacity style={[Styles.botao, Styles.sombra]} onPress={() => logout()}>
            <Text style={Styles.txtBotao}>Sair</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[Styles.botao, Styles.sombra]} onPress={() =>navigation.navigate("Configuracao")}>
            <Text style={Styles.txtBotao}>Configuração</Text>
          </TouchableOpacity>
        </View>

        <View style={Styles.containerFilho}>
          <View style={Styles.input}>
            <Text style={Styles.txtInput}>Nome: {usuario ? usuario.nome : ""}</Text>
          </View>
        </View>
        <View style={Styles.containerFilho}>
          <View style={[Styles.input, Styles.campoEmail]}>
            <Text style={Styles.txtInput}>E-mail: {usuario ? usuario.email : ""}</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  )
}