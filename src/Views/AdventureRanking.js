import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import Styles from "../Styles.js/StyleAdventureRanking";
import { useNavigation } from "@react-navigation/native";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";
import { FIREBASE_APP, FIREBASE_AUTH } from "../../FirebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";

const RankingRow = ({ position, nome, fasesConcluidas, isUser = false }) => (
    <TouchableOpacity
        onPress={() => {
            if (isUser) {
                Alert.alert("Ação", "Você clicou na sua própria linha.");
                return;
            }
            Alert.alert("Visualizar Perfil", `Isso navegaria para o perfil de ${nome}.`);
        }}
        style={[
            Styles.row,
            isUser && { backgroundColor: "#E89CA3" },
        ]}
    >
        <Text style={[Styles.cell, Styles.positionCell]}>{position}</Text>
        <Text style={[Styles.cell, Styles.nameCell]}>{nome}</Text>
        <Text style={Styles.cell}>{fasesConcluidas}</Text>
    </TouchableOpacity>
);

export default function AdventureRanking() {
    const navigation = useNavigation();
    const db = getFirestore(FIREBASE_APP);

    const [rankingData, setRankingData] = useState([]);
    const [currentUserData, setCurrentUserData] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null);

    // 🔹 Captura o usuário autenticado
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
            if (user) {
                setCurrentUserId(user.uid);
            } else {
                setCurrentUserId(null);
            }
        });
        return unsubscribe;
    }, []);

    // 🔹 Só busca ranking depois de ter o usuário
    useEffect(() => {
        if (!currentUserId) return;

        const fetchRanking = async () => {
            try {
                const rankingSnapshot = await getDocs(collection(db, "AdventureRanking"));
                const usersWithProgress = [];

                for (const docSnap of rankingSnapshot.docs) {
                    const rankingData = docSnap.data();
                    if ((rankingData.lastFaseCompleted || 0) > 0) {

                        const userDoc = await getDoc(doc(db, "users", rankingData.userId));
                        const userName = userDoc.exists() ? userDoc.data().nome : "Sem nome";

                        usersWithProgress.push({
                            userId: rankingData.userId,
                            userName,
                            fasesConcluidas: rankingData.lastFaseCompleted
                        });
                    }
                }

                usersWithProgress.sort((a, b) => b.fasesConcluidas - a.fasesConcluidas);
                const rankedData = usersWithProgress.map((user, index) => ({
                    ...user,
                    position: index + 1
                }));

                setRankingData(rankedData);
                const currentUser = rankedData.find(user => user.userId === currentUserId);
                setCurrentUserData(currentUser || null);

            } catch (error) {
                console.error("Erro ao buscar ranking:", error);
            }
        };

        fetchRanking();
    }, [currentUserId]);

    return (
        <View style={Styles.container}>
            <View style={Styles.header}>
                <Text style={Styles.headerText}>Ranking da Aventura</Text>
            </View>

            <View style={Styles.tableHeader}>
                <Text style={[Styles.cell, Styles.columnHeader]}>Posição</Text>
                <Text style={[Styles.cell, Styles.nameCell, Styles.columnHeader]}>Aluno</Text>
                <Text style={[Styles.cell, Styles.columnHeader]}>{`Fases\nCompletas`}</Text>
            </View>

            <ScrollView style={Styles.scrollContainer} persistentScrollbar={true}>
                {rankingData.map((item) => (
                    <RankingRow
                        key={item.userId}
                        position={item.position}
                        nome={item.userName}
                        fasesConcluidas={item.fasesConcluidas}
                        isUser={item.userId === currentUserId}
                    />
                ))}
            </ScrollView>

            {currentUserData && (
                <View style={[Styles.row, Styles.userRow]}>
                    <Text style={[Styles.cell, Styles.positionCell]}>{currentUserData.position}</Text>
                    <Text style={[Styles.cell, Styles.nameCell]}>{currentUserData.userName}</Text>
                    <Text style={Styles.cell}>{currentUserData.fasesConcluidas}</Text>
                </View>
            )}

            <TouchableOpacity
                style={Styles.button}
                onPress={() => navigation.goBack()}
            >
                <Text style={Styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
        </View>
    );
}
