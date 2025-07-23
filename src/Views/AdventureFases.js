import { View, Text, ImageBackground, TouchableOpacity, Image } from "react-native";
import Styles from "../Styles.js/StyleAdventureFases.js";
import { useNavigation } from "@react-navigation/native";

export default function AdventureFases() {

    const navigation = useNavigation();

    const FreeFased = ({ txt, faseInfo }) => {
        return (
            <TouchableOpacity
                style={Styles.boxImageButton}
                onPress={() =>
                    navigation.navigate("Battle", { faseInfo })
                }
            >
                <Image
                    style={Styles.boxImageImage}
                    source={require("../Imagens/icone_13.png")}
                />
                <Text style={Styles.boxImageButtonText}>Fase {txt}</Text>
            </TouchableOpacity>
        );
    };

    const ClosedFased = ({ txt }) => {
        return (
            <TouchableOpacity style={Styles.boxImageButton} activeOpacity={1}>
                <Image
                    style={Styles.boxImageImage}
                />
                <Text style={Styles.boxImageButtonText}>{txt}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <ImageBackground
            style={Styles.imageAjust}
            source={require("../Imagens/adventure/Fundo - Área 1.png")}
        >
            <View style={Styles.box}>
                <View style={Styles.AjustItens_high}>
                    <View style={Styles.boxImage}>
                        <FreeFased
                            txt={1}
                            faseInfo={{
                                boss: false,
                                enemy1: true,
                                enemy2: false,
                                enemy3: false,
                            }}
                        />
                    </View>
                </View>
            </View>
            <View style={Styles.box}>
                <View style={Styles.AjustItens_center}>
                    <View style={Styles.boxImage}>
                        <FreeFased
                            txt={2}
                            faseInfo={{
                                boss: false,
                                enemy1: true,
                                enemy2: true,
                                enemy3: true,
                            }}
                        />
                    </View>
                </View>
            </View>
            <View style={Styles.box}>
                <View style={Styles.AjustItens_low}>
                    <View style={Styles.boxImage}>
                        <FreeFased
                            txt={3}
                            faseInfo={{
                                boss: true,
                                enemy1: false,
                                enemy2: false,
                                enemy3: false,
                            }}
                        />
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
}
