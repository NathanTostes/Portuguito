import React from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "../Styles.js/StyleItemShop";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import itemsByArea from '../data/items.js';

export default function ItemShop() {
    const navigation = useNavigation();
    const route = useRoute();
    const { characterInfo, currentFase } = route.params;

    const getRandomItems = (areaItems) => {
        const sortedItems = [];

        const getRarity = () => {
            const rand = Math.random();
            if (rand < 0.45) return "common";
            if (rand < 0.80) return "rare";
            if (rand < 0.96) return "epic";
            return "legendary";
        };

        while (sortedItems.length < 3) {
            const rarity = getRarity();
            const rarityItems = areaItems.filter(item => item.rarity === rarity);

            if (rarityItems.length > 0) {
                const item = rarityItems[Math.floor(Math.random() * rarityItems.length)];
                if (!sortedItems.includes(item)) {
                    sortedItems.push(item);
                }
            }
        }

        return sortedItems;
    };

    const items = getRandomItems(itemsByArea[Math.floor((currentFase - 1) / 3)]);

    const handleBuy = (item) => {
        const updatedCharacter = {
            ...characterInfo,
            life: characterInfo.life + (item.life || 0),
            damage: characterInfo.damage + (item.damage || 0),
            extraTime: characterInfo.extraTime + (item.extraTime || 0),
        };

        navigation.navigate("AdventureFases", {
            characterInfo: updatedCharacter,
            currentFase
        });
    };

    return (
        <LinearGradient colors={['#D5D4FB', '#9B98FC']} style={styles.gradient}>

            <View style={styles.container}>
                <Text style={styles.title}>Escolha um item para continuar sua aventura</Text>

                <FlatList
                    data={items}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.item} onPress={() => handleBuy(item)}>
                            <View style={styles.itemRow}>
                                {item.type === 'LIFE' &&
                                    <Image style={styles.itemImage} source={require("../Imagens/adventure/itemLife.png")} />}
                                {item.type === 'DAMAGE' &&
                                    <Image style={styles.itemImage} source={require("../Imagens/adventure/itemDamage.png")} />}
                                {item.type === 'TIME' &&
                                    <Image style={styles.itemImage} source={require("../Imagens/adventure/itemTime.png")} />}

                                <View style={styles.itemText}>
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    <Text style={styles.itemDescription}>{item.description}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>

        </LinearGradient>
    );
}
