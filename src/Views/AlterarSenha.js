import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Alert, ScrollView, Modal } from "react-native";
import Styles from "../Styles.js/StylesCadastro";
import { LinearGradient } from "expo-linear-gradient";

export default function AlterarSenha(){

    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    return (
        <LinearGradient colors={["#D5D4FB", "#9B98FC"]} style={Styles.gradient}>
          <ScrollView>
            <View style={Styles.container}>
    
              <View style={Styles.containerFilho}>
                <Text style={Styles.txtTituloPrincipal}>Alterar Senha do Usuario</Text>
                <Text style={Styles.descricao}>Senha:</Text>
    
                <TextInput
                  style={Styles.input}
                  onChangeText={(text) => setConfirmarSenha(text)}
                  secureTextEntry={true}
                />
              </View>
              <View style={Styles.containerFilho}>
                <Text style={Styles.descricaoGrande}>Confirmação da senha:</Text>
    
                <TextInput
                  style={Styles.input}
                  onChangeText={(text) => setSenha(text)}
                  secureTextEntry={true}
                />
              </View>
    
    
              <TouchableOpacity style={Styles.botao}>
                <Text style={Styles.textBotao}>Alterar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </LinearGradient>
      );
}