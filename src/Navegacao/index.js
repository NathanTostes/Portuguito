import React from "react";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native"
import { NavigationContainer } from '@react-navigation/native'
import TabNav from "./TabNav";
import LoginNav from "./LoginNav";
import TabNavAluno from "./TabNavAluno";
import { View } from "react-native";
import { Image } from "expo-image";
import { useAuthentication } from "../hooks/useAutentication";
import { userVerification } from "../FuncoesFirebase/Funcoes";
import { updateSequenceDays } from "../FuncoesFirebase/Funcoes";

export default function Navegacao() {
  //retorna o usuário atualmente autenticado (ou null se não estiver logado)
  const user = useAuthentication();

  const [isProfessor, setIsProfessor] = useState(null);

  useEffect(() => {
    const fetchVerification = async () => {
      //Verifica se o usuário é professor ou aluno (baseado no email do usuário)
      const result = await userVerification(user?.email);
      setIsProfessor(result);
      //chama a função para atualizar(se for o caso) a última data de login
      await updateSequenceDays(user?.email);
      console.log(`É professor: ${result}`);
      console.log(`Usuário: ${user?.email}`);
    };

    if (user) {
      fetchVerification();
    }
  }, [user]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        {
          user !== null ? (
            user ? (
              isProfessor ? <TabNav /> : <TabNavAluno />
            ) : (
              //transição de imagem que é renderizada enquanto não carrega a tela do aluno ou do professor
              <View
                style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
              >
                <Image
                  style={{
                    flex: 1,
                    width: "100%",
                    height: undefined,
                    aspectRatio: 1,
                  }}
                  source={require("../Imagens/TranFinal.gif")}
                  contentFit="contain"
                />
              </View>

            )
          ) : (
            <LoginNav />
          )
        }
      </NavigationContainer>
    </SafeAreaView>
  )
}