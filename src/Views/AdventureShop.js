import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import Styles from "../Styles.js/StyleAdventureShop";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import characters from "../data/characters";
import { doc, getDocs, collection, updateDoc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { FIREBASE_APP, FIREBASE_AUTH } from "../../FirebaseConfig.js";

export default function AdventureShop() {
    const navigation = useNavigation();
    const db = getFirestore(FIREBASE_APP);
    const auth = FIREBASE_AUTH;
    const userId = auth.currentUser.uid;

    const [coins, setCoins] = useState(0);
    const [userCharacters, setUserCharacters] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userRef = doc(db, "users", userId);
                const adventureInfoCollectionRef = collection(userRef, "adventureInfo");
                const snapshot = await getDocs(adventureInfoCollectionRef);

                if (snapshot.empty) {
                    const initialData = {
                        characters: ["Portuguita"],
                        coins: 100,
                        lastFaseCompleted: 0
                    };
                    const newDocRef = doc(adventureInfoCollectionRef);
                    await setDoc(newDocRef, initialData);
                    setUserCharacters(initialData.characters);
                    setCoins(initialData.coins);
                } else {
                    const adventureDoc = snapshot.docs[0];
                    const data = adventureDoc.data();
                    setUserCharacters(data.characters || []);
                    setCoins(data.coins || 0);
                }
            } catch (error) {
                console.error("Erro ao buscar dados do usuário:", error);
            }
        };
        fetchUserData();
    }, []);

    // Comprar personagem
    const handleBuyCharacter = async (character) => {
        if (userCharacters.includes(character.title)) return;

        if (coins < character.price) {
            Alert.alert("Saldo insuficiente", "Você não possui moedas suficientes para comprar este personagem.");
            return;
        }

        try {
            const userRef = doc(db, "users", userId);
            const adventureInfoCollectionRef = collection(userRef, "adventureInfo");
            const snapshot = await getDocs(adventureInfoCollectionRef);
            const adventureDoc = snapshot.docs[0];

            const newCoins = coins - character.price;
            const newCharacters = [...userCharacters, character.title];

            await updateDoc(adventureDoc.ref, {
                coins: newCoins,
                characters: newCharacters
            });

            setCoins(newCoins);
            setUserCharacters(newCharacters);
            Alert.alert("Compra realizada!", `${character.title} foi adicionado ao seu time.`);
        } catch (error) {
            console.error("Erro ao comprar personagem:", error);
        }
    };

    const aventureiros = Object.entries(characters).map(([key, value]) => ({
        id: key,
        title: value.name,
        image: value.imagemFront,
        description: value.description,
        price: value.price,
        unlocked: userCharacters.includes(value.name)
    }));

    const sections = [{ title: "Aventureiros", data: aventureiros }];

    const renderCard = ({ item }) => (
        <View style={Styles.card}>
            <Text style={Styles.cardTitle}>{item.title}</Text>
            <Image source={item.image} style={Styles.cardImage} resizeMode="contain" />
            <Text style={Styles.cardDescription}>{item.description}</Text>
            <View style={Styles.cardPriceContainer}>
            </View>
            {item.unlocked ? (
                <View style={Styles.unlockButton}>
                    <Text style={Styles.unlockButtonText}>Desbloqueado</Text>
                </View>
            ) : (
                <TouchableOpacity
                    style={Styles.buyButton}
                    onPress={() => handleBuyCharacter(item)}
                >
                    <Text style={Styles.buyButtonText}>
                        {item.price} moedas
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );

    return (
        <View style={Styles.container}>
            <View style={Styles.header}>
                <Text style={Styles.headerText}>Mercado da Aventura</Text>
                <View style={Styles.coinsContainer}>
                    <Text style={Styles.coinsText}>{coins} moedas</Text>
                </View>
            </View>

            <ScrollView>
                {sections.map((section, index) => (
                    <View key={index} style={Styles.section}>
                        <Text style={Styles.sectionTitle}>{section.title}</Text>
                        <FlatList
                            data={section.data}
                            renderItem={renderCard}
                            keyExtractor={(item) => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}
