import React, { useEffect } from "react";
import { View, Image, Text, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Descritores from "../Buttons/Descritores";
import Styles from "../Styles.js/StylesDescritores";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

export default function DescritoresProcedimentoLeitura() {
  const navigation = useNavigation();

  const route = useRoute()

  const id = route.params.id

  console.log(id)

  useEffect(() => {
    navigation.setOptions({ tabBarVisible: false });
  });

  return (
    <LinearGradient colors={["#D5D4FB", "#9B98FC"]} style={Styles.gradient}>
      <View style={Styles.container}>
        <View style={Styles.voltar}>
          <TouchableOpacity style={Styles.paginationButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" style={Styles.iconStyle} />
          </TouchableOpacity>
        </View>
        <Descritores
          titulo="Localização de informações explícitas (D1)"
          descritor="D1"
          id={id}
        />
        <Descritores titulo="Inferência de sentido (D3)" descritor="D3" id={id} />
        <Descritores
          titulo="Inferência de informação implícita (D4)"
          descritor="D4"
          id={id}
        />
        <Descritores titulo="Identificação do tema do texto (D6)" descritor="D6" id={id} />
        <Descritores titulo="Distinção entre fato e opinião (D11)" descritor="D11" id={id} />
      </View>
    </LinearGradient>
  );
}
