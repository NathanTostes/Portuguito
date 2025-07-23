import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, Modal, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import Markdown from "react-native-markdown-display";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { FIREBASE_APP } from "../../FirebaseConfig";
import styles from "../ListaDeListas/styles";
import LoadingScreen from "../Componentes/LoadingScreen";

export default function QuestaoVF({ route, navigation }) {
    const { faseInfo } = route.params;

    const [question, setQuestion] = useState(null);
    const [showInitialAnimation, setShowInitialAnimation] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const [noImage, setNoImage] = useState(null);
    const [loadingImage, setLoadingImage] = useState(true);

    const db = getFirestore(FIREBASE_APP);

    useEffect(() => {
        const fetchRandomQuestion = async () => {
            try {
                const questoesRef = collection(db, "questoesVF");
                const snapshot = await getDocs(questoesRef);
                const total = snapshot.size;
                if (total === 0) {
                    setQuestion(null);
                    return;
                }
                const randomIndex = Math.floor(Math.random() * total);
                const randomDoc = snapshot.docs[randomIndex];
                const questaoData = randomDoc.data();
                setQuestion(questaoData);

                if (!questaoData.urlImagem) {
                    const noImageAnimations = [
                        require('../Imagens/noImageAnimations/Alertinha.gif'),
                        require('../Imagens/noImageAnimations/Lupinha.gif'),
                        require('../Imagens/noImageAnimations/Aflito.gif'),
                    ];
                    const randomImage = noImageAnimations[
                        Math.floor(Math.random() * noImageAnimations.length)
                    ];
                    setNoImage(randomImage);
                }

                setLoadingImage(false);
            } catch (error) {
                console.log("Erro ao buscar questão aleatória: ", error);
            }
        };

        fetchRandomQuestion();

        const timer = setTimeout(() => {
            setShowInitialAnimation(false);
        }, 2050);

        return () => clearTimeout(timer);
    }, []);

    const handleAnswer = (answer) => {
        const acertou = answer === question.respostaCorreta;
        navigation.navigate("Battle", { faseInfo: faseInfo, acertou });
    };

    return (
        <LinearGradient colors={["#D5D4FB", "#9B98FC"]} style={styles.gradient}>

            {question && !showInitialAnimation ? (
                <View style={styles.container}>
                    <View style={styles.enunciado}>
                        <View style={styles.backgroundImagem}>
                            {loadingImage ? (
                                <ActivityIndicator size="large" color="#EFEFFE" />
                            ) : question.urlImagem && question.urlImagem.startsWith('http') ? (
                                <TouchableOpacity onPress={() => setIsExpanded(true)}>
                                    <Image
                                        style={styles.imagem}
                                        source={{ uri: question.urlImagem }}
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
                            )}

                            <Modal visible={isExpanded} transparent={true} animationType="fade">
                                <View style={styles.modalContainer}>
                                    <TouchableOpacity onPress={() => setIsExpanded(false)}>
                                        <Image source={{ uri: question.urlImagem }} style={styles.fullImage} />
                                    </TouchableOpacity>
                                </View>
                            </Modal>
                        </View>

                        <Markdown
                            style={{
                                body: {
                                    fontSize: 16,
                                    color: "#fff",
                                    width: "90%",
                                    padding: 5,
                                    textAlign: "justify",
                                    fontFamily: "Inder_400Regular",
                                },
                            }}
                        >
                            {question.pergunta}
                        </Markdown>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 20, gap: 5 }}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: "#4CAF50",
                                paddingVertical: 15,
                                paddingHorizontal: 40,
                                borderRadius: 12,
                                alignItems: "center",
                            }}
                            onPress={() => handleAnswer("V")}
                        >
                            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>Verdadeiro</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                backgroundColor: "#F44336",
                                paddingVertical: 15,
                                paddingHorizontal: 40,
                                borderRadius: 12,
                                alignItems: "center",
                            }}
                            onPress={() => handleAnswer("F")}
                        >
                            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>Falso</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <LoadingScreen />
                </View>
            )}
        </LinearGradient>
    );
}
