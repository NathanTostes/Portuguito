import React, { useCallback, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import Styles from "../Styles.js/StylesMenuTrilha";
import { useNavigation, useFocusEffect, useRoute } from "@react-navigation/native";
import { TourGuideZone, TourGuideZoneByPosition, useTourGuideController } from 'rn-tourguide'

export default function MenuTrilha() {
  const navigation = useNavigation();
  const route = useRoute()
  const tutorialFinalizado = route.params?.tutorialConcluido;
  const { start, tourKey, canStart, eventEmitter, stop } = useTourGuideController();

  const handleOnStop = useCallback(() => {
    eventEmitter.off('stop', handleOnStop);
    console.log('Tour finalizado. Navegando para próxima fase.'); 
    navigation.navigate('StackNavTrilha', { 
    screen: 'SubMenu1', 
    params: { tutorialConcluidofase2: true }}); 
  }, [navigation]);

  useEffect(() => {
    let timer
    if (tutorialFinalizado && canStart) {
      timer = setTimeout(() => {
        console.log("Iniciando tour no passo 10 com delay de segurança.");
        start(10);
        navigation.setParams({ tutorialConcluido: undefined });
      }, 500);
    }
    eventEmitter.on('stop', handleOnStop);
    return () => {
      clearTimeout(timer);
    };
  }, [tutorialFinalizado, canStart, start, navigation]);


  return (
    <ImageBackground
      style={Styles.imageAjust}
      source={require("../Imagens/Trilha_Esborco2_2.png")}
    >


      <StatusBar style="auto" />
      <View style={Styles.cor}>
        <TourGuideZone zone={10}>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate("SubMenu2")}>
              <ImageBackground
                source={require("../Imagens/Placa4.png")}
                style={Styles.buttom}
              >
                <Text style={Styles.textButtom}>Morfologia</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </TourGuideZone>

        <TourGuideZone zone={11}>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate("SubMenu3")}>
              <ImageBackground
                source={require("../Imagens/Placa4.png")}
                style={Styles.buttom}
              >
                <Text style={Styles.textButtom}>Ortografia</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </TourGuideZone>

        <TourGuideZone zone={12}>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate("SubMenu1")}>
              <ImageBackground
                source={require("../Imagens/Placa4.png")}
                style={Styles.buttom}
              >
                <Text style={Styles.textButtom}>Sintaxe</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </TourGuideZone>
      </View>

    </ImageBackground>
  );
}
