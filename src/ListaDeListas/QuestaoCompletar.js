import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, ActivityIndicator, Alert } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import Markdown from "react-native-markdown-display";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { FIREBASE_APP } from "../../FirebaseConfig";
import styles from "../ListaDeListas/styles";
import LoadingScreen from "../Componentes/LoadingScreen";

export default function QuestaoLacuna({ route, navigation }) {
    const { faseInfo } = route.params;

    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [inputText, setInputText] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);

    const db = getFirestore(FIREBASE_APP);

    useEffect(() => {
        const fetchRandomQuestion = async () => {
            try {
                const questoesRef = collection(db, "questoesComplete");
                const snapshot = await getDocs(questoesRef);
                const total = snapshot.size;
                if (total === 0) {
                    setQuestion(null);
                    setLoading(false);
                    return;
                }
                const randomIndex = Math.floor(Math.random() * total);
                const randomDoc = snapshot.docs[randomIndex];
                const questaoData = randomDoc.data();
                setQuestion(questaoData);
                setLoading(false);
            } catch (error) {
                console.log("Erro ao buscar questão lacuna: ", error);
                setLoading(false);
            }
        };

        fetchRandomQuestion();
    }, []);

    const handleConfirm = () => {
        if (!inputText.trim()) {
            Alert.alert("Aviso", "Por favor, preencha a lacuna.");
            return;
        }

        // Checa se a resposta está dentro das possíveis, ignorando caixa (case insensitive)
        const respostaUsuario = inputText.trim().toLowerCase();
        const respostasValidas = question.possiveisLacunas.map(r => r.toLowerCase());

        const acertou = respostasValidas.includes(respostaUsuario);

        navigation.navigate("Battle", { faseInfo: faseInfo, acertou });
    };

    if (loading) {
        return (
            <LinearGradient colors={["#D5D4FB", "#9B98FC"]} style={styles.gradient}>
                <LoadingScreen />
            </LinearGradient>
        );
    }

    return (
        <LinearGradient colors={["#D5D4FB", "#9B98FC"]} style={styles.gradient}>
            <View style={styles.container}>
                <View style={styles.enunciado}>

                    {question.urlImagem && question.urlImagem.startsWith('http') && (
                        <View style={styles.backgroundImagem}>
                            <TouchableOpacity onPress={() => setIsExpanded(true)}>
                                <ActivityIndicator size="large" color="#EFEFFE" style={styles.loader} />
                                <Image
                                    style={styles.imagem}
                                    source={{ uri: question.urlImagem }}
                                    contentFit="contain"
                                />
                            </TouchableOpacity>
                            {/* Modal imagem expandida */}
                            <Modal visible={isExpanded} transparent={true} animationType="fade">
                                <View style={styles.modalContainer}>
                                    <TouchableOpacity onPress={() => setIsExpanded(false)}>
                                        <Image source={{ uri: question.urlImagem }} style={styles.fullImage} />
                                    </TouchableOpacity>
                                </View>
                            </Modal>
                        </View>
                    )}

                    <Markdown
                        style={{
                            body: {
                                fontSize: 16,
                                color: "#fff",
                                padding: 10,
                                fontFamily: "Inder_400Regular",
                            },
                        }}
                    >
                        {question.pergunta}
                    </Markdown>

                </View>
                <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 30, marginBottom: 10, alignItems: "center" }}>
                    <Text style={{ color: "#fff", fontSize: 18, fontFamily: "Inder_400Regular", textAlign:"justify" }}>
                        {question.preLacuna + " "}
                    </Text>

                    <TextInput
                        style={{
                            backgroundColor: "#fff",
                            borderRadius: 8,
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            fontSize: 16,
                            minWidth: 100,
                            color: "#000",
                            fontFamily: "Inder_400Regular",
                            alignSelf: "center", // alinha com o texto
                        }}
                        value={inputText}
                        onChangeText={setInputText}
                        placeholder="Digite aqui"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />

                    <Text style={{ color: "#fff", fontSize: 18, fontFamily: "Inder_400Regular", textAlign:"justify" }}>
                        {" " + question.posLacuna}
                    </Text>
                </View>
                <View style={styles.containerContinuar}>
                    <TouchableOpacity
                        style={[styles.confirmar, styles.btnAtivado]}
                        onPress={() => {
                            handleConfirm()
                        }}
                    >
                        <Text style={styles.label}>Confirmar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    );
}
