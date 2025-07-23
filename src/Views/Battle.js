import React, { useEffect } from "react";
import { View, Text, ImageBackground, TouchableOpacity, Image } from "react-native";
import Styles from "../Styles.js/StyleBattle.js";

export default function Battle({ route, navigation }) {
    const { faseInfo, acertou } = route.params;

    console.log(acertou);

    useEffect(() => {
        if (route.params?.hitSuccess !== undefined) {
            if (route.params.hitSuccess) {
                console.log("Resposta correta! Aplicar dano.");
            } else {
                console.log("Resposta incorreta! Sem dano.");
            }
        }
    }, [route.params?.hitSuccess]);

    const attackEnemy = () => {
        const types = ["VF", "MULTIPLE", "COMPLETE"];
        const randomType = types[Math.floor(Math.random() * types.length)];

        switch (randomType) {
            case "VF":
                navigation.navigate("QuestaoVF", { faseInfo: faseInfo });
                break;
            case "MULTIPLE":
                navigation.navigate("QuestaoMultipla", { faseInfo: faseInfo });
                break;
            case "COMPLETE":
                navigation.navigate("QuestaoCompletar", { faseInfo: faseInfo });
                break;
        }
    };

    const Enemy = ({ txt }) => {
        return (
            <TouchableOpacity style={Styles.boxImageButton} onPress={attackEnemy}>
                <Image
                    style={Styles.boxImageImage}
                    source={require("../Imagens/adventure/Cogushu.png")}
                />
                <Text style={Styles.boxImageButtonText}>{txt}</Text>
            </TouchableOpacity>
        );
    };

    const Boss = ({ txt }) => {
        return (
            <TouchableOpacity style={Styles.boxImageButton} onPress={attackEnemy}>
                <Image
                    style={Styles.boxImageImage}
                    source={require("../Imagens/adventure/Cuca2.png")}
                    style={{height: 300, width: 300}}
                />
                <Text style={Styles.boxImageButtonText}>{txt}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <ImageBackground
            style={Styles.imageAjust}
            source={require("../Imagens/adventure/C.Luta-Área1.png")}
        >
            {faseInfo.boss && (
                <View style={Styles.box}>
                    <View style={Styles.AjustItens_high}>
                        <View style={Styles.boxImage}>
                            <Boss txt={"Boss"} />
                        </View>
                    </View>
                </View>
            )}

            {faseInfo.enemy1 && (
                <View style={Styles.box}>
                    <View style={Styles.AjustItens_high}>
                        <View style={Styles.boxImage}>
                            <Enemy txt={"Inimigo 1"} />
                        </View>
                    </View>
                </View>
            )}

            {faseInfo.enemy2 && (
                <View style={Styles.box}>
                    <View style={Styles.AjustItens_center}>
                        <View style={Styles.boxImage}>
                            <Enemy txt={"Inimigo 2"} />
                        </View>
                    </View>
                </View>
            )}

            {faseInfo.enemy3 && (
                <View style={Styles.box}>
                    <View style={Styles.AjustItens_center}>
                        <View style={Styles.boxImage}>
                            <Enemy txt={"Inimigo 3"} />
                        </View>
                    </View>
                </View>
            )}
        </ImageBackground>
    );
}
