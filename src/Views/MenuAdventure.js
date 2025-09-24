import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Styles from '../Styles.js/StyleMenuAdventure';
import { Ionicons } from '@expo/vector-icons';
import characters from '../data/characters';
import { LinearGradient } from 'expo-linear-gradient';
import { doc, getDocs, collection, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { FIREBASE_APP, FIREBASE_AUTH } from "../../FirebaseConfig.js";

export default function MenuAdventure() {
  const auth = FIREBASE_AUTH;
  const db = getFirestore(FIREBASE_APP);
  const userId = auth.currentUser.uid;

  const navigation = useNavigation();
  
  const [userCharacters, setUserCharacters] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const fetchOrCreateAdventureInfo = async () => {
        try {
          const userRef = doc(db, "users", userId);
          const adventureInfoCollectionRef = collection(userRef, "adventureInfo");

          const snapshot = await getDocs(adventureInfoCollectionRef);

          if (snapshot.empty) {
            const initialData = {
              characters: ["Portuguita"],
              coins: 0,
              lastFaseCompleted: 0
            };

            const newDocRef = doc(adventureInfoCollectionRef);
            await setDoc(newDocRef, initialData);

            setUserCharacters(initialData.characters);
          } else {
            const adventureDoc = snapshot.docs[0].data();
            setUserCharacters(adventureDoc.characters);
          }
        } catch (error) {
          console.error("Erro ao buscar ou criar adventureInfo:", error);
        }
      };

      fetchOrCreateAdventureInfo();
    }, [userId])
  );

  const characterList = Object.entries(characters).map(([key, value]) => ({
    key,
    ...value,
    unlocked: userCharacters.includes(value.name)
  }));

  const currentCharacter = characterList[currentIndex];

  const nextCharacter = () => {
    setCurrentIndex((prev) => (prev + 1) % characterList.length);
  };

  const prevCharacter = () => {
    setCurrentIndex((prev) => (prev - 1 + characterList.length) % characterList.length);
  };

  return (
    <LinearGradient colors={['#D5D4FB', '#9B98FC']} style={Styles.gradient}>
      <View style={Styles.container}>
        <View style={Styles.topo}>
          <TouchableOpacity style={Styles.buttonTop} onPress={() => navigation.navigate("AdventureShop")}>
            <Ionicons name="storefront-outline" style={Styles.iconStyle} />
          </TouchableOpacity>
          <TouchableOpacity style={Styles.buttonTop} onPress={() => navigation.navigate("AdventureRanking")}>
            <Ionicons name="podium-outline" style={Styles.iconStyle} />
          </TouchableOpacity>
        </View>

        <View style={Styles.personagemArea}>
          <TouchableOpacity onPress={prevCharacter}>
            <Text style={Styles.seta}>{'<'}</Text>
          </TouchableOpacity>

          <View style={Styles.personagem}>
            <Image
              style={[
                Styles.imagemPersonagem,
                !currentCharacter.unlocked && { opacity: 0.4 }
              ]}
              source={currentCharacter.imagemFront}
            />
            <Text style={Styles.caractherName}>
              {currentCharacter.name} {!currentCharacter.unlocked}
            </Text>
          </View>

          <TouchableOpacity onPress={nextCharacter}>
            <Text style={Styles.seta}>{'>'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            Styles.botaoIniciar,
            !currentCharacter.unlocked && { backgroundColor: '#aaa' } // botão desabilitado
          ]}
          disabled={!currentCharacter.unlocked}
          onPress={() =>
            navigation.navigate("AdventureFases", {
              screen: "AdventureFases",
              characterInfo: currentCharacter,
              currentFase: 1,
            })
          }
        >
          <Text style={Styles.textoIniciar}>Iniciar Aventura</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
