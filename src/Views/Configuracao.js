import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Style from "../Styles.js/ConfiguracaoStyle"
import { View, Text, ImageBackground, TouchableOpacity, Image, ScrollView, Alert, Modal, Pressable } from 'react-native'
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { FIREBASE_AUTH, FIREBASE_APP } from "../../FirebaseConfig";
import { collection, setDoc, doc, getDocs, updateDoc, query, where, deleteDoc } from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { sendPasswordResetEmail } from "firebase/auth";




export default function Configuracao() {

    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [id, setId] = useState();
    const auth = FIREBASE_AUTH
    const db = getFirestore(FIREBASE_APP);
    const userId = auth.currentUser?.uid;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const usersRef = collection(db, "users");
                const q = query(usersRef, where("userId", "==", userId));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const userDoc = querySnapshot.docs[0];
                    const data = userDoc.data();
                    setEmail(data.email || "");
                    setId(data.userId || "");
                } else {
                    Alert.alert("Usuário não encontrado.");
                }

            } catch (error) {
                console.error("Erro ao buscar dados:", error);
                Alert.alert("Erro ao carregar dados.");
            }
        };

        fetchUserData();
    }, []);

    async function deleteConta(id) {

        try {
            const userLogado = auth.currentUser;
            const usersDocs = doc(db, "users", id);
            setModalVisible(false);
            await deleteDoc(usersDocs);
            await deleteUser(userLogado);
            
        } catch (error) { 
            Alert.alert(error,"error")

        }



    }
    const logout = async () => {
        try {
          const auth = FIREBASE_AUTH;
    
          await auth.signOut();
          console.log("Logout realizado com sucesso.");
        } catch (error) {
          console.error("Erro ao realizar logout:", error);
        }
      };

    const resetPassword = async (auth, email) => {
        if (!email) {
            Alert.alert('Por favor, insira o e-mail para redefinição de senha.');
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            Alert.alert(
                'E-mail enviado',
                'Um link para redefinição de senha foi enviado para o endereço fornecido. Por favor, verifique sua caixa de entrada.'
            );
        } catch (error) {
            console.log(error);
            if (error.code === "auth/user-not-found") {
                Alert.alert('Usuário não encontrado.');
                console.log(error)
            } else {
                Alert.alert('Erro ao enviar o e-mail. Tente novamente mais tarde.');
            }
        }
    };
    return (
        <LinearGradient colors={['#D5D4FB', '#9B98FC']} style={Style.gradient} >
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={Style.centeredView}>
                    <View style={Style.modalView}>
                        <Text style={Style.modalText}>Deseja realmente apagar sua conta?</Text>
                        <View style={Style.modalOpcao}><Pressable
                            style={[Style.button, Style.buttonClose]} onPress={()=> deleteConta(id)}>
                            <Text style={Style.textStyle}>Sim</Text>
                        </Pressable>
                            <Pressable
                                style={[Style.button, Style.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={Style.textStyle}>Não</Text>
                            </Pressable>
                        </View>


                    </View>
                </View>
            </Modal>
            <ScrollView contentContainerStyle={Style.container}>
                <View style={Style.containerOpcao}>
                    <Text style={Style.txtTituloPrincipal}>Configurações</Text>
                </View>
                <View Style={Style.containerOpcao}>
                    <View style={Style.containerBorder}>
                        <Text style={Style.txtTitulo}>Conta</Text>
                        <View style={Style.containerLabel}>
                            <Text style={Style.txtLabel}>Editar Perfil:</Text>
                            <TouchableOpacity style={Style.botao} onPress={() => navigation.navigate('EditarConfig')}>
                                <Text style={Style.txtBotao}>Editar</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={Style.containerLabel}>
                            <Text style={Style.txtLabel}>Alterar Senha:</Text>
                            <TouchableOpacity style={Style.botao} onPress={() => resetPassword(auth, email)}>
                                <Text style={Style.txtBotao}>Alterar</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={Style.containerLabel}>
                            <Text style={Style.txtLabel}>Apagar Perfil:</Text>
                            <TouchableOpacity style={Style.botao} onPress={() => setModalVisible(true)}>
                                <Text style={Style.txtBotao}>Apagar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </ScrollView>
        </LinearGradient>
    );
}
