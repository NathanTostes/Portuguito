import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, ImageBackground, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "react-native-vector-icons";
import Styles from "../Styles.js/StyleChallengeFases.js";
import { useRoute } from "@react-navigation/native";
import { doc, getDocs, collection, query, where, getDoc, setDoc, updateDoc, increment} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { FIREBASE_APP, FIREBASE_AUTH } from "../../FirebaseConfig.js";
import { useNavigation } from "@react-navigation/native";

export default function ChallengeFases() {
  const auth = FIREBASE_AUTH;
  const db = getFirestore(FIREBASE_APP);
  const route = useRoute();
  const navigation = useNavigation();

  const getDayName = (day) => {
    switch (day) {
      case 0:
        return 'domingo'
      case 1:
        return 'segunda'
      case 2:
        return 'terca'
      case 3:
        return 'quarta'
      case 4:
        return 'quinta'
      case 5:
        return 'sexta'
      case 6:
        return 'sabado'
    }
  }

  const day = route.params.params.day;
  const dayName = getDayName(day);
  const userId = auth.currentUser.uid;

  const [currentPage, setCurrentPage] = useState(0);
  const [lastCompletedFase, setLastCompletedFase] = useState(-1);

  const fasesPerPage = 3;
  const totalPages = day === 6 ? 10 : 5;

  useEffect(() => {
    const fetchData = async () => {
        const userRef = doc(db, "users", userId);
        const desafioInfoCollectionRef = collection(userRef, "desafioInfo");
        const dayInfoQuery = query(desafioInfoCollectionRef, where("dia", "==", dayName));
        const dayInfoSnapshot = await getDocs(dayInfoQuery);
  
          const dayInfoDoc = dayInfoSnapshot.docs[0].data();
          const ultimaFase = dayInfoDoc.ultimaFaseConcluida;
          setLastCompletedFase(ultimaFase);
  
          if (ultimaFase > 0 && ultimaFase > (lastCompletedFase || 0)) {
            const userDoc = await getDoc(userRef);
            const userName = userDoc.exists() ? userDoc.data().nome : "NomeDesconhecido";
  
            const faseConcluidaRef = doc(db, "fasesConcluidasDesafio", userId);
            const faseConcluidaDoc = await getDoc(faseConcluidaRef);
    
            if (faseConcluidaDoc.exists()) {
              await updateDoc(faseConcluidaRef, {
                fasesConcluidas: increment(1),
                userName: userName 
              });
            } else {
              await setDoc(faseConcluidaRef, {
                fasesConcluidas: 1,
                userId: userId,
                userName: userName 
              });
            }
          }
    };  
    const unsubscribe = navigation.addListener("focus", fetchData)

    fetchData();

    return unsubscribe;
  }, [userId, dayName, navigation]);

  const FreeFased = ({ txt }) => {
    return (
      <TouchableOpacity
        style={Styles.boxImageButton}
        onPress={() =>
          navigation.navigate("ChallengeQuestions", {
            screen: "ChallengeQuestions",
            params: { userId: userId, day: day, dayName: dayName, fase: txt },
          })
        }
      >
        <Image
          source={require("../Imagens/openedFase.png")}
          style={Styles.boxImageImage}
        />
        <Text style={Styles.boxImageButtonText}>{txt}</Text>
      </TouchableOpacity>
    );
  };

  const ClosedFased = ({ txt }) => {
    return (
      <TouchableOpacity style={Styles.boxImageButton} activeOpacity={1}>
        <Image
          source={require("../Imagens/closedFase.png")}
          style={Styles.boxImageImage}
        />
        <Text style={Styles.boxImageButtonText}>{txt}</Text>
      </TouchableOpacity>
    );
  };

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const FaseIcon = ({ index, style }) => {
    return (
      <View style={Styles.box}>
        <View style={style}>
          <View style={Styles.boxImage}>
            {index < lastCompletedFase + 1 ? (
              <FreeFased txt={index + 1} />
            ) : (
              <ClosedFased txt={index + 1} />
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <ImageBackground
      style={Styles.imageAjust}
      source={require("../Imagens/challengeBackground.png")}
    >
      <StatusBar style="auto" />

      {currentPage > 0 && (
        <View style={Styles.topButtonContainer}>
          <TouchableOpacity style={Styles.paginationButton} onPress={goToPreviousPage}>
            <Ionicons name="arrow-up" style={Styles.iconStyle} />
          </TouchableOpacity>
        </View>
      )}

      <View style={Styles.divTela}>
        {
          lastCompletedFase >= 0 ? (
            <>
              <FaseIcon
                index={(currentPage * fasesPerPage)}
                style={Styles.AjustItens_high}
              />
              <FaseIcon
                index={(currentPage * fasesPerPage) + 1}
                style={Styles.AjustItens_center}
              />
              <FaseIcon
                index={(currentPage * fasesPerPage) + 2}
                style={Styles.AjustItens_low}
              />
            </>
          ) : (
            <></>
          )
        }
      </View>

      {currentPage < totalPages - 1 && (
        <View style={Styles.bottomButtonContainer}>
          <TouchableOpacity style={Styles.paginationButton} onPress={goToNextPage}>
            <Ionicons name="arrow-down" style={Styles.iconStyle} />
          </TouchableOpacity>
        </View>
      )}
    </ImageBackground>
  );
}
