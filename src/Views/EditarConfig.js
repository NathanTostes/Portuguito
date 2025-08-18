import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Text, Alert, ScrollView, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Styles from "../Styles.js/StylesCadastro";
import { LinearGradient } from "expo-linear-gradient";
import { FIREBASE_APP, FIREBASE_AUTH } from "../../FirebaseConfig";
import { collection, setDoc, doc, getDocs, updateDoc, query, where } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";


export default function EditarConfig() {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [confirmarEmail, setConfirmarEmail] = useState("");

    const [oldData, setOldData] = useState({});

    const navigation = useNavigation();
    const db = getFirestore(FIREBASE_APP);
    const auth = FIREBASE_AUTH;
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

                    setNome(data.nome || "");
                    setEmail(data.email || "");
                    setOldData({ id: userDoc.id, nome: data.nome, email: data.email });
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

    const handleSubmit = async () => {
        try {
            if (!oldData.id) {
                Alert.alert("Erro", "Usuário não carregado.");
                return;
            }

            if (nome === oldData.nome && email === oldData.email) {
                Alert.alert("Nenhuma alteração detectada.");
                return;
            }


            if (email !== confirmarEmail) {
                Alert.alert("Erro", "E-mail e confirmação não coincidem.");
                return;
            }
            if(email===null || email===""){
                Alert.alert("Erro", "E-mail Invalido.");
                return;
            }
            if(nome===null || nome===""){
                Alert.alert("Erro", "Nome Invalido.");
                return;
            }

            const docRef = doc(db, "users", oldData.id);

            await updateDoc(docRef, {
                nome: nome,
                email: email
            });

            Alert.alert("Sucesso", "Dados atualizados com sucesso!");
            navigation.goBack();
        } catch (error) {
            console.error("Erro ao atualizar:", error);
            Alert.alert("Erro ao salvar alterações.");
        }
    };
    return (
        <LinearGradient colors={["#D5D4FB", "#9B98FC"]} style={Styles.gradient}>
            <ScrollView>
                <View style={Styles.container}>
                    <View style={Styles.containerFilho}>
                        <Text style={Styles.txtTituloPrincipal}>Alterar dados do Usuario</Text>
                        <Text style={Styles.descricao}>Apelido:</Text>

                        <TextInput
                            style={Styles.input}
                            value={nome}
                            onChangeText={(text) => setNome(text)}
                        />
                    </View>

                    <View style={Styles.containerFilho}>
                        <Text style={Styles.descricao}>E-mail:</Text>

                        <TextInput
                            style={Styles.input}
                            value={email}
                            onChangeText={(text) => setEmail(text.toLocaleLowerCase())}
                        />
                    </View>

                    <View style={Styles.containerFilho}>
                        <Text style={Styles.descricaoGrande}>Confirmação do e-mail:</Text>

                        <TextInput
                            style={Styles.input}
                            onChangeText={(text) => setConfirmarEmail(text.toLocaleLowerCase())}
                        />
                    </View>

                    <TouchableOpacity style={Styles.botao} onPress={handleSubmit}>
                        <Text style={Styles.textBotao}>Salvar Alterações</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}