import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, ImageBackground, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs, query, where, getFirestore } from "firebase/firestore";
import { FIREBASE_APP } from "../../FirebaseConfig";
import Styles from "../Styles.js/StylesIlhasChallenge";

const db = getFirestore(FIREBASE_APP);


//tem que receber o dia por parâmentro quando o navigate for usado na tela MenuChallenge
export default function IlhasChallenge() {
  const [islands, setIslands] = useState([]);
  let dia = 1

  async function getIslands() {
    try {
      const collectionRef = collection(db, "questoesDesafio");
      const q = query(collectionRef, where("dia", "==", dia));
      const querySnapshot = await getDocs(q);

      const fetchedIslands = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setIslands(fetchedIslands);
    } catch (error) {
      console.error("erro na  busca das ilhas", error);
    }
  }

  useEffect(() => {
    getIslands();
  }, [dia]);

  return (
    <View style={Styles.container}>
        <ImageBackground
            style={Styles.imageAjust}
            source={require("../Imagens/TelaIlha.png")}
            resizeMode="cover"
            //imagem tá sendo cortada.
        >
            <StatusBar style="auto" />
            <Text style={Styles.title}>Ilhas do Desafio</Text>
            {islands.map((island) => (
                <View key={island.id} style={Styles.islandContainer}>
                    <Image
                        source={require("../Imagens/ilha")} //Adicionar a imagem da ilha 
                    />
                </View>
            ))}
        </ImageBackground>

    </View>
  );
}
