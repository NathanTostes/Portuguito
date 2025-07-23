import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Styles from '../Styles.js/StyleMenuAdventure'; 
import { Ionicons } from '@expo/vector-icons';

export default function MenuAdventure() {
  const navigation = useNavigation();
  return (
    <View style={Styles.container}>
      <View style={Styles.topo}>
        <TouchableOpacity style={Styles.buttonTop}>
          <Ionicons name="storefront-outline" style={Styles.iconStyle} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={Styles.buttonTop} 
          onPress={() =>
            navigation.navigate("AdventureRanking", {
            screen: "AdventureRanking",
          })
        }>
          <Ionicons name="podium-outline" style={Styles.iconStyle} />
        </TouchableOpacity>
      </View>

      <View style={Styles.personagemArea}>
        <TouchableOpacity>
          <Text style={Styles.seta}>{'<'}</Text>
        </TouchableOpacity>

        <View style={Styles.personagem}>
          <Image
            style={Styles.imagemPersonagem}
            source={require("../Imagens/adventure/Portuguita-frente.png")}
          />
          <Text style={Styles.caractherName}>Portuguita</Text>
        </View>

        <TouchableOpacity>
          <Text style={Styles.seta}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      {/* Botão Iniciar */}
      <TouchableOpacity 
        style={Styles.botaoIniciar}
        onPress={() =>
          navigation.navigate("AdventureFases", {
            screen: "AdventureFases",
        })
      }>
        <Text style={Styles.textoIniciar}>Iniciar Aventura</Text>
      </TouchableOpacity>
    </View>
  );
}
