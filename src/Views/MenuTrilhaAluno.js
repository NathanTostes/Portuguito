import React, { useEffect, useState, useCallback} from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import Styles from "../Styles.js/StylesMenuTrilha";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import {
  useCopilot, CopilotStep,
  walkthroughable
} from "react-native-copilot";

export default function MenuTrilha() {
  const navigation = useNavigation();
  const route = useRoute();
  const { start, copilotEvents, copilotOptions, stop } = useCopilot({});
  const WalkthroughableView = walkthroughable(View);
  const WalkthroughableTouchable = walkthroughable(TouchableOpacity);

    useFocusEffect(
    useCallback(() => {
      
      if (route.params?.iniciarTutorial) {
        
        setTimeout(() => {
          start();
        }, 5000); 
        navigation.setParams({ iniciarTutorial: false });
        
        
      }
      
      
      const handleStop = () => {
        console.log("Tutorial finalizado na MenuTrilha!");
        
      };

      copilotEvents.on("stop", handleStop);

      return () => {
        copilotEvents.off("stop", handleStop);
      };
    }, [route.params?.iniciarTutorial, start, navigation, copilotEvents])
  );

  return (

    <ImageBackground
      style={Styles.imageAjust}
      source={require("../Imagens/Trilha_Esborco2_2.png")}
    >
      <StatusBar style="auto" />

      <View style={Styles.cor}>
        <CopilotStep text="texto" order={1} name="Tutorial1">
          <WalkthroughableView>
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
          </WalkthroughableView>
        </CopilotStep>

        <CopilotStep text="texto2" order={2} name="tutorial2">
          <WalkthroughableView>
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
          </WalkthroughableView>
        </CopilotStep>

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
      </View>


    </ImageBackground>
  );
}
