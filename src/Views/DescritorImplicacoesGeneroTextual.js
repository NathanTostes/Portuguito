import React from "react";
import {View, Image, Text, TouchableOpacity, Alert } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import Descritores from "../Buttons/Descritores";
import Styles from "../Styles.js/StylesDescritores";

export default function DescritorImplicacoesGeneroTextual() {
    
    return(
    <LinearGradient colors={['#D5D4FB', '#9B98FC']}
    style={Styles.gradient} >

    <View style={Styles.container}>
        <Descritores titulo='Interpretação de textos' descritor='D5'/>
        <Descritores titulo='Reconhecimento do gênero discursivo' descritor='D16'/>
        <Descritores titulo='Identificação da finalidade textual'  descritor='D9'/>
        
        
    </View>




    </LinearGradient>
    )
}