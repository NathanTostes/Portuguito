import React, { useCallback, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import Styles from '../Styles.js/StylesSubMenu1'
import { useNavigation, useRoute,useFocusEffect } from "@react-navigation/native";
import { TourGuideZone, TourGuideZoneByPosition, useTourGuideController } from 'rn-tourguide'

export default function SubMenu1() {
  const navigation = useNavigation()
  const route = useRoute()
  const tutorialFase2Iniciado = route.params?.tutorialConcluidofase2;
  const { start, tourKey, canStart, eventEmitter, stop } = useTourGuideController();

  const handleOnStop = useCallback(() => {
    stop();
    eventEmitter.off('stop', handleOnStop);
    console.log('Tour finalizado. Navegando para próxima fase.3');
    setTimeout(() => {
      navigation.navigate('Trilha', { params: 'crase' }, {condicao:{tutorialConcluido:true}});
      console.log("Comando de navegação enviado com sucesso.");
    }, 0); 
  }, [navigation, handleOnStop]);


  useFocusEffect(
        useCallback(() => {
            let timer;
            
            if (tutorialFase2Iniciado && canStart) {
                timer = setTimeout(() => {
                    console.log("Iniciando tour no passo 13 após foco.");
                    start(13);
                    navigation.setParams({ tutorialConcluidofase2: undefined });
                }, 500);
            }

            return () => {
                clearTimeout(timer);
            };
            
        }, [tutorialFase2Iniciado, canStart, start, navigation]) 
    );
    

    useEffect(() => {
        eventEmitter.on('stop', handleOnStop);
        
        return () => {
            
        };
    }, [eventEmitter, handleOnStop])

  return (

    <ImageBackground style={Styles.imageAjust} source={require('../Imagens/Trilha1.png')}>
      <StatusBar style="auto" />

      <View style={Styles.divTela}>
        <TourGuideZone zone={13}>
          <View>

            <TouchableOpacity onPress={() => navigation.navigate('Trilha', { screen: 'Trilha', params: 'crase' })}>

              <ImageBackground source={require('../Imagens/Placa5.png')} style={Styles.buttom}>

                <Text style={Styles.textButtom}>
                  Crase
                </Text>

              </ImageBackground>

            </TouchableOpacity>

          </View>
        </TourGuideZone>

        <View>

          <TouchableOpacity onPress={() => navigation.navigate('Trilha', { screen: 'Trilha', params: 'pontuacao' })}>

            <ImageBackground source={require('../Imagens/Placa5.png')} style={Styles.buttom}>

              <Text style={Styles.textButtom}>
                Pontuação
              </Text>

            </ImageBackground>

          </TouchableOpacity>

        </View>

      </View>

      <View style={Styles.divTela}>

        <View>

          <TouchableOpacity onPress={() => navigation.navigate('Trilha', { screen: 'Trilha', params: 'regencia' })}>

            <ImageBackground source={require('../Imagens/Placa5.png')} style={Styles.buttom}>

              <Text style={Styles.textButtom}>
                Regência
              </Text>

            </ImageBackground>

          </TouchableOpacity>

        </View>

        <View>

          <TouchableOpacity onPress={() => navigation.navigate('Trilha', { screen: 'Trilha', params: 'figurasDeLinguagem' })}>

            <ImageBackground source={require('../Imagens/Placa5.png')} style={Styles.buttom}>

              <Text style={Styles.textButtom}>
                Figuras de linguagem
              </Text>

            </ImageBackground>

          </TouchableOpacity>

        </View>

      </View>

      <View style={Styles.divTela}>

        <View>

          <TouchableOpacity onPress={() => navigation.navigate('Trilha', { screen: 'Trilha', params: 'concordancia' })}>

            <ImageBackground source={require('../Imagens/Placa5.png')} style={Styles.buttom}>

              <Text style={Styles.textButtom}>
                Concordância
              </Text>

            </ImageBackground>

          </TouchableOpacity>

        </View>

        <View>

          <TouchableOpacity onPress={() => navigation.navigate('Trilha', { screen: 'Trilha', params: 'vozesVerbais' })}>

            <ImageBackground source={require('../Imagens/Placa5.png')} style={Styles.buttom}>

              <Text style={Styles.textButtom}>
                Vozes verbais
              </Text>

            </ImageBackground>

          </TouchableOpacity>

        </View>

      </View>

      <View style={Styles.divTela}>

        <View>

          <TouchableOpacity onPress={() => navigation.goBack()}>

            <ImageBackground source={require('../Imagens/Placa5.png')} style={Styles.buttom}>

              <Text style={Styles.textButtom}>
                Voltar
              </Text>

            </ImageBackground>

          </TouchableOpacity>

        </View>

      </View>


    </ImageBackground>
  );
}
