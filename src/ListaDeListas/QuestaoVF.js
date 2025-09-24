import React, { useState, useEffect, useCallback } from "react";
import { View, TouchableOpacity, Text, Modal, ActivityIndicator, BackHandler, Alert, ScrollView } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import Markdown from "react-native-markdown-display";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { FIREBASE_APP } from "../../FirebaseConfig";
import styles from "../QuestionStyles/StyleQuestaoVF";
import LoadingScreen from "../Componentes/LoadingScreen";
import { Ionicons } from "@expo/vector-icons";
import areas from "../data/areas";
import { useFocusEffect } from "@react-navigation/native";

export default function QuestaoVF({ route, navigation }) {

    const time = 30 - areas[route.params.area].tempoDecrescido + route.params.character.extraTime;

    const [question, setQuestion] = useState(null);
    const [showInitialAnimation, setShowInitialAnimation] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const [noImage, setNoImage] = useState(null);
    const [loadingImage, setLoadingImage] = useState(true);
    const [timeLeft, setTimeLeft] = useState(time);

    const db = getFirestore(FIREBASE_APP);

    useFocusEffect (
        useCallback(() => {
            const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
                Alert.alert(
                    "Sair da Batalha",  
                    "Tem certeza de que deseja abandonar a batalha? Você perderá todo o progresso da aventura.",
                    [
                        { text: "Cancelar", style: "cancel" },
                        {
                            text: "Abandonar Aventura",
                            style: "destructive",
                            onPress: () => navigation.navigate("MenuAdventure", {
                                screen: "MenuAdventure ",
                            })
                        },
                    ]
                );
                return true;
            });

            return () => backHandler.remove();
        }, [])
    );

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

    useEffect(() => {
        if (!loadingImage && question) {
            setTimeLeft(time);
            const interval = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        navigation.navigate("Battle", {
                            area: route.params.area,
                            faseInfo: route.params.faseInfo,
                            characterInfo: route.params.character,
                            faseNumber: route.params.faseNumber,
                            enemyIndex: route.params.enemyIndex,
                            hitSuccess: false,
                            loseByTime: true,
                        });
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [loadingImage, question]);

    const handleAnswer = (answer) => {
        const acertou = answer === question.resposta;

        navigation.navigate("Battle", {
            area: route.params.area,
            faseInfo: route.params.faseInfo,
            faseNumber: route.params.faseNumber,
            characterInfo: route.params.character,
            enemyIndex: route.params.enemyIndex,
            hitSuccess: acertou,
            loseByTime: false,
        });
    };

    return (
        <LinearGradient colors={["#D5D4FB", "#9B98FC"]} style={styles.gradient}>

            {question && !showInitialAnimation ? (
                <View style={styles.container}>
                    <View style={{ flexDirection: "row", alignItems: "center", margin: 30 }}>
                        <Ionicons name="time-outline" size={24} color="#fff" style={{ marginRight: 8 }} />
                        <View style={{ flex: 1, height: 12, backgroundColor: "#ccc", borderRadius: 6 }}>
                            <View
                                style={{
                                    height: "100%",
                                    width: `${(timeLeft / time) * 100}%`,
                                    backgroundColor: "#3498db",
                                    borderRadius: 6,
                                }}
                            />
                        </View>
                        <Text style={{ color: "#fff", marginLeft: 8, fontFamily: "Inder_400Regular" }}>
                            {timeLeft}s
                        </Text>
                    </View>
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
                                    textAlign: "left",
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
                            onPress={() => handleAnswer(true)}
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
                            onPress={() => handleAnswer(false)}
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
