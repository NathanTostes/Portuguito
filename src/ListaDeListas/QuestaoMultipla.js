import React, { useState, useEffect, useCallback } from "react";
import { View, TouchableOpacity, Text, Modal, ActivityIndicator, BackHandler, Alert } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import Markdown from "react-native-markdown-display";
import { ScrollView } from "react-native-gesture-handler";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { FIREBASE_APP } from "../../FirebaseConfig";
import styles from "../QuestionStyles/StyleQuestaoMultipla";
import { RadioButtonGroup, RadioButtonItem } from "../Componentes/RadioButtonGroup";
import LoadingScreen from "../Componentes/LoadingScreen";
import { Ionicons } from "@expo/vector-icons";
import areas from "../data/areas";
import { useFocusEffect } from "@react-navigation/native";

export default function QuestaoMultipla({ route, navigation }) {
    
    const time = 30 - areas[route.params.area].tempoDecrescido + route.params.character.extraTime;

    const [question, setQuestion] = useState(null);
    const [showInitialAnimation, setShowInitialAnimation] = useState(true);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    const [btnRadioClicado, setbtnRadioClicado] = useState(true);
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
                const questoesRef = collection(db, "questoes");
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

    const handleConfirm = () => {
        const acertou = selectedAnswer === question.respostaCorreta;

        navigation.navigate("Battle", {
            area: route.params.area,
            faseInfo: route.params.faseInfo,
            characterInfo: route.params.character,
            faseNumber: route.params.faseNumber,
            enemyIndex: route.params.enemyIndex,
            hitSuccess: acertou,
            loseByTime: false,
        });
    };

    return (
        <LinearGradient colors={["#D5D4FB", "#9B98FC"]} style={styles.gradient}>

            {question && !showInitialAnimation ? (
                <>
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
                                        <ActivityIndicator size="large" color="#EFEFFE" style={styles.loader} />
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

                                {/* Modal imagem expandida */}
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
                                        top: 0,
                                        width: "90%",
                                        left: 5,
                                        padding: 5,
                                        textAlign: "left",
                                        fontFamily: "Inder_400Regular",
                                    },
                                }}
                            >
                                {question.pergunta}
                            </Markdown>
                        </View>

                        <View style={styles.container}>
                            <ScrollView style={styles.questoes}>
                                <RadioButtonGroup
                                    selected={selectedAnswer}
                                    onSelected={(selectedAnswer) => {
                                        setSelectedAnswer(selectedAnswer);
                                        setbtnRadioClicado(false);
                                    }}
                                    radioBackground="#F54F59"
                                >
                                    {question.respostas.map((resposta, index) => (
                                        <RadioButtonItem
                                            key={index}
                                            label={
                                                <View
                                                    style={{
                                                        flexDirection: "row-reverse",
                                                        backgroundColor: "#ffb9bd",
                                                        borderRadius: 40,
                                                        width: '90%',
                                                        paddingHorizontal: '3%',
                                                        marginTop: 5,
                                                        height: "auto",
                                                        left: -30,
                                                        position: "relative",
                                                        zIndex: -1,
                                                    }}
                                                >
                                                    <Markdown
                                                        style={{
                                                            body: {
                                                                fontSize: 16,
                                                                color: "#fff",
                                                                top: 0,
                                                                width: "90%",
                                                                left: -0.5,
                                                                padding: 5,
                                                                textAlign: "center",
                                                                fontFamily: "Inder_400Regular",
                                                            },
                                                        }}
                                                    >
                                                        {resposta}
                                                    </Markdown>
                                                </View>
                                            }
                                            value={resposta}
                                            style={{
                                                borderWidth: 1,
                                                borderRadius: 12.5,
                                                borderColor: "#fff",
                                                left: 7,
                                                top: 3,
                                                backgroundColor: '#fff',
                                                width: 25,
                                                height: 25,
                                            }}
                                        />
                                    ))}
                                </RadioButtonGroup>

                                <View style={styles.containerContinuar}>
                                    <TouchableOpacity
                                        style={[styles.confirmar, btnRadioClicado ? styles.btnDesativado : styles.btnAtivado]}
                                        disabled={btnRadioClicado}
                                        onPress={() => {
                                            handleConfirm()
                                            setbtnRadioClicado(true);
                                        }}
                                    >
                                        <Text style={styles.label}>Confirmar</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </>
            ) : (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <LoadingScreen />
                </View>
            )}
        </LinearGradient>
    );      
}
