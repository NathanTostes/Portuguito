import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, BackHandler } from 'react-native';
import { Image } from 'expo-image';
import styles from "../Styles.js/StyleEndAdventure.js";
import { useFocusEffect } from '@react-navigation/native';

export default function WinAdventure({ route, navigation }) {
    const { characterInfo, nextFase } = route.params;

    useFocusEffect(
        useCallback(() => {
            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                () => {
                    navigation.navigate("AdventureFases", {
                        characterInfo,
                        currentFase: nextFase,
                    });
                    return true;
                }
            );

            return () => backHandler.remove();
        }, [navigation, characterInfo, nextFase])
    );

    return (
        <LinearGradient colors={['#D5D4FB', '#9B98FC']} style={styles.gradient}>
            <View style={styles.container}>
                <Text style={styles.title}>Você avançou para a fase {nextFase}!</Text>
                <View style={styles.boxImage}>
                    <Image
                        style={styles.ImageFormat}
                        source={require("../Imagens/animations/AnimacoesMascoteAcimaDaMedia.gif")}
                    />
                </View>
                <TouchableOpacity
                    style={styles.buttom}
                    onPress={() => {
                        navigation.navigate("AdventureFases", {
                            characterInfo,
                            currentFase: nextFase,
                        });
                    }}
                >
                    <Text style={[styles.FontFormatButtom, styles.shadow]}>
                        Continuar a aventura!
                    </Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}

