import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, ActivityIndicator, Alert, BackHandler } from "react-native";
import { ScrollView } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import Markdown from "react-native-markdown-display";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { FIREBASE_APP } from "../../FirebaseConfig";
import styles from "../QuestionStyles/StyleQuestaoNumeroDe";
import LoadingScreen from "../Componentes/LoadingScreen";
import { Ionicons } from "@expo/vector-icons";
import areas from "../data/areas";
import { useFocusEffect } from "@react-navigation/native";

export default function QuestaoNumeroDe({ route, navigation }) {

    const time = 30 - areas[route.params.area].tempoDecrescido + route.params.character.extraTime;

    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [inputValue, setInputValue] = useState("");
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
        const fetchQuestion = async () => {
            try {
                const ref = collection(db, "questoesNumeroDe");
                const snapshot = await getDocs(ref);
                const total = snapshot.size;
                if (total === 0) {
                    setQuestion(null);
                    setLoading(false);
                    return;
                }
                const randomIndex = Math.floor(Math.random() * total);
                const doc = snapshot.docs[randomIndex];
                setQuestion(doc.data());
            } catch (err) {
                console.error("Erro ao buscar questão:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestion();
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
        const acertou = inputValue.trim() === question.numero;

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
                        {question.urlImagem && question.urlImagem.startsWith("http") && (
                            <View style={styles.backgroundImagem}>
                                <TouchableOpacity onPress={() => setIsExpanded(true)}>
                                    <ActivityIndicator size="large" color="#EFEFFE" style={styles.loader} />
                                    <Image
                                        style={styles.imagem}
                                        source={{ uri: question.urlImagem }}
                                        contentFit="contain"
                                    />
                                </TouchableOpacity>

                                <Modal visible={isExpanded} transparent={true} animationType="fade">
                                    <View style={styles.modalContainer}>
                                        <TouchableOpacity onPress={() => setIsExpanded(false)}>
                                            <Image source={{ uri: question.urlImagem }} style={styles.fullImage} />
                                        </TouchableOpacity>
                                    </View>
                                </Modal>
                            </View>
                        )}

                        <Text
                            style={styles.pergunta}
                        >
                            {question.pergunta}
                        </Text>

                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            value={inputValue}
                            onChangeText={setInputValue}
                            placeholder="0"
                            maxLength={4}
                        />
                    </View>

                    <View style={{ marginTop: 30, alignItems: "center" }}>
                        <TouchableOpacity
                            style={[styles.confirmar, { paddingHorizontal: 40, paddingVertical: 15 }]}
                            onPress={handleConfirm}
                        >
                            <Text style={styles.label}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}
