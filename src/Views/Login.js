import React from "react";
import {View, Image, Text, TouchableOpacity, Alert } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import Styles from "../Styles.js/StylesLogin";




export default function Login({navigation}) {
    return (
        <LinearGradient colors={['#D5D4FB', '#9B98FC']}
        style={Styles.gradient} >
        
            <View style={Styles.container}>

        <Image style = {Styles.imageNome} source={require('../Imagens/NomePortuguito.png')}/>

            <View>
            <TouchableOpacity style={Styles.botaoGrande} onPress={() => {navigation.navigate('Home')}}>
                <Text style = {Styles.textBotao}>Login</Text>
            </TouchableOpacity>
            </View>

            <View style={Styles.containerFilho}>
                <TouchableOpacity style={Styles.botaoPequeno} onPress={() => {navigation.navigate('Cadastro')
                } }>
                    <Text style = {Styles.textBotaoPequeno}>Cadastrar</Text>
                </TouchableOpacity>

            </View>

            <Text style={Styles.frase}>Aprender pode ser divertido</Text>

            </View>

            <Image style = {Styles.imageLogo} source={require('../Imagens/Levri8Cortado.gif')} />

         </LinearGradient>
    )
}
