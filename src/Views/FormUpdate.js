import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
    updateDoc,
    doc,
    deleteDoc
} from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_APP } from "../../FirebaseConfig";

import Styles from "../Styles.js/StylesHome";
import style from "../Styles.js/StylesAdicionarQuestaoLista";

export default function EditarPerfil() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");

    const navigation = useNavigation();
    const db = getFirestore(FIREBASE_APP);
    const auth = FIREBASE_AUTH;
    const user = auth.currentUser?.uid;

    useEffect(() => {
        const carregarDados = async () => {
            try {
                const usersRef = collection(db, "users");
                const q = query(usersRef, where("userId", "==", user));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const data = querySnapshot.docs[0].data();
                    setNome(data.nome || "");
                    setEmail(data.email || "");
                }
            } catch (error) {
                console.error("Erro ao carregar perfil:", error);
                Alert.alert("Erro ao carregar perfil.");
            }
        };

        carregarDados();
    }, [user]);

    const handleSalvar = async () => {
        try {
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("userId", "==", user));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0].ref;
                await updateDoc(userDoc, { nome, email });
                Alert.alert("Perfil atualizado com sucesso!");
                navigation.goBack();
            }
        } catch (error) {
            console.error("Erro ao atualizar perfil:", error);
            Alert.alert("Erro ao atualizar o perfil.");
        }
    };

    const handleExcluirConta = async () => {
        Alert.alert(
            "Confirmar exclusão",
            "Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const usersRef = collection(db, "users");
                            const q = query(usersRef, where("userId", "==", user));
                            const querySnapshot = await getDocs(q);

                            if (!querySnapshot.empty) {
                                const userDoc = querySnapshot.docs[0].ref;
                                await deleteDoc(userDoc);
                            }

                            await auth.currentUser.delete();

                            Alert.alert("Conta excluída com sucesso!");
                            navigation.reset({
                                index: 0,
                                routes: [{ name: "Login" }], 
                            });
                        } catch (error) {
                            console.error("Erro ao excluir conta:", error);
                            Alert.alert("Erro ao excluir conta.");
                        }
                    },
                },
            ]
        );
    };

    return (
        <LinearGradient colors={["#D5D4FB", "#9B98FC"]} style={Styles.gradient}>
            <ScrollView contentContainerStyle={style.container}>
                <View style={style.voltar}>
                    <TouchableOpacity
                        style={style.paginationButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" style={style.iconStyle} />
                    </TouchableOpacity>
                </View>

                <Text style={Styles.frase}>Editar Perfil</Text>

                <View style={style.inputContainer}>
                    <Text style={Styles.txtInput}>Nome:</Text>
                    <TextInput
                        style={Styles.input}
                        value={nome}
                        onChangeText={setNome}
                    />
                </View>

                <View style={style.inputContainer}>
                    <Text style={Styles.txtInput}>Email:</Text>
                    <TextInput
                        style={Styles.input}
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                <View style={Styles.containerBotao}>
                    <TouchableOpacity style={Styles.botao} onPress={handleSalvar}>
                        <Text style={Styles.txtBotao}>Salvar Alterações</Text>
                    </TouchableOpacity>
                </View>

                <View style={Styles.containerBotao}>
                    <TouchableOpacity
                        style={[Styles.botao, { backgroundColor: "red" }]}
                        onPress={handleExcluirConta}
                    >
                        <Text style={Styles.txtBotao}>Excluir Conta</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}
