import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, ActivityIndicator, Alert, BackHandler, ScrollView } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import Markdown from "react-native-markdown-display";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { FIREBASE_APP } from "../../FirebaseConfig";
import styles from "../QuestionStyles/StyleQuestaoCompletar";
import LoadingScreen from "../Componentes/LoadingScreen";
import { Ionicons } from "@expo/vector-icons";
import areas from "../data/areas";
import { useFocusEffect } from "@react-navigation/native";

export default function QuestaoLacuna({ route, navigation }) {

    const time = 30 - areas[route.params.area].tempoDecrescido + route.params.character.extraTime;

    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [inputText, setInputText] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    const [timeLeft, setTimeLeft] = useState(time);

    const db = getFirestore(FIREBASE_APP);

    useFocusEffect(
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

    useEffect(() => {
        if (!loading && question) {
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
    }, [loading, question]);

    const handleConfirm = () => {
        const respostaUsuario = inputText.trim().toLowerCase();
        const respostasValidas = question.possiveisLacunas.map(r => r.toLowerCase());

        const acertou = respostasValidas.includes(respostaUsuario);

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

    if (loading) {
        return (
            <LinearGradient colors={["#D5D4FB", "#9B98FC"]} style={styles.gradient}>
                <LoadingScreen />
            </LinearGradient>
        );
    }

    return (
        <LinearGradient colors={["#D5D4FB", "#9B98FC"]} style={styles.gradient}>
            <ScrollView>
                <View contentContainerStyle={styles.container}>
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
                    <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", padding: 12, marginTop: 15, alignItems: "center" }}>
                        <Text style={{ color: "#fff", fontSize: 18, fontFamily: "Inder_400Regular" }}>
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
                                alignSelf: "center",
                            }}
                            value={inputText}
                            onChangeText={setInputText}
                            placeholder="Digite aqui"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />

                        <Text style={{ color: "#fff", fontSize: 18, fontFamily: "Inder_400Regular" }}>
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
            </ScrollView>
        </LinearGradient>
    );
}
