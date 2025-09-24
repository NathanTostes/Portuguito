import React, { useCallback, useEffect, useState } from "react";
import { View, Text, ImageBackground, TouchableOpacity, Image, BackHandler, Alert } from "react-native";
import Styles from "../Styles.js/StyleBattle.js";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import areas from "../data/areas.js";

export default function Battle({ route, navigation }) {
    const { faseInfo, characterInfo, area, faseNumber } = route.params;

    const [enemies, setEnemies] = useState(
        faseInfo.enemies.map(e => ({ ...e, vidaMax: e.vida }))
    );

    const [character, setCharacter] = useState(characterInfo);

    const colors = {
        life: { bg: "#27ae60", border: "#1e8449" },
        damage: { bg: "#e74c3c", border: "#b2312b" },
        extraTime: { bg: "#3498db", border: "#2a75b0" },
    };

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
        if (route.params) {
            const { hitSuccess, enemyIndex } = route.params;
            if (hitSuccess !== undefined && enemyIndex !== undefined) {
                const updatedEnemies = [...enemies];

                if (hitSuccess) {
                    updatedEnemies[enemyIndex].vida -= character.damage;
                } else {
                    setCharacter(prev => ({
                        ...prev,
                        life: prev.life - updatedEnemies[enemyIndex].dano
                    }));
                }

                const filteredEnemies = updatedEnemies.filter(enemy => enemy.vida > 0);
                setEnemies(filteredEnemies);
            }
        }
    }, [route.params]);

    useEffect(() => {
        if (character.life <= 0) {
            navigation.navigate("LoseAdventure", { fase: faseNumber });
        } else if (enemies.length === 0) {
            if (faseNumber + 1 >= 22) {
                navigation.navigate("WinAndEndAdventure");
            } else {
                navigation.navigate("WinAdventure", { characterInfo: character, nextFase: (faseNumber + 1) });
            }
        }
    }, [character.life, enemies]);

    const attackEnemy = (index) => {
        const types = ["NumeroDe", "VF", "Multipla", "Completar"];
        const randomType = types[Math.floor(Math.random() * types.length)];

        navigation.navigate(`Questao${randomType}`, {
            area,
            faseInfo,
            character,
            enemyIndex: index,
            faseNumber,
        })
    };

    const Enemy = ({ enemy, index }) => {
        const vidaPercent = Math.max(0, (enemy.vida / enemy.vidaMax) * 100);

        return (
            <TouchableOpacity
                style={[Styles.boxImageButton, { position: 'absolute', ...areas[area].enemyPositions[index] }]}
                onPress={() => attackEnemy(index)}
            >
                <Image style={Styles.boxImageImage} source={enemy.imagem} />
                <View style={Styles.lifeBarContainer}>
                    <View style={[Styles.lifeBarFill, { width: `${vidaPercent}%` }]} />
                </View>
            </TouchableOpacity>
        );
    };


    return (
        <ImageBackground
            style={Styles.imageAjust}
            source={areas[area].backgroundBattle || areas[area].backgroundBattle[0]}
        >
            <View style={Styles.topBar}>
                <View
                    style={[
                        Styles.statItem,
                        { backgroundColor: colors.life.bg, borderColor: colors.life.border },
                    ]}
                >
                    <Text style={Styles.statText}>{character.life}</Text>
                    <Ionicons name="heart" size={30} color="#fff" style={{ marginLeft: 8 }} />
                </View>

                <View
                    style={[
                        Styles.statItem,
                        { backgroundColor: colors.damage.bg, borderColor: colors.damage.border },
                    ]}
                >
                    <Text style={Styles.statText}>{character.damage}</Text>
                    <Ionicons name="flame" size={30} color="#fff" style={{ marginLeft: 8 }} />
                </View>

                <View
                    style={[
                        Styles.statItem,
                        { backgroundColor: colors.extraTime.bg, borderColor: colors.extraTime.border },
                    ]}
                >
                    <Text style={Styles.statText}>{character.extraTime}s</Text>
                    <Ionicons name="time" size={30} color="#fff" style={{ marginLeft: 8 }} />
                </View>
            </View>

            <View style={Styles.box}>
                <View style={Styles.AjustItens_center}>
                    <View style={[Styles.boxImage, { position: 'relative', height: 300 }]}>
                        {enemies.map((enemy, index) => (
                            <Enemy key={index} enemy={enemy} index={index} />
                        ))}
                    </View>
                </View>
            </View>

            <View style={Styles.box}>
                <View style={Styles.AjustItens_center}>
                    <View style={Styles.boxImage}>
                        <Image
                            style={Styles.boxImagePortuguita}
                            source={characterInfo.imagemBack}
                        />
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
}
