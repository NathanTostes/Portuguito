import { useCallback, useEffect, useState } from "react";
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image,
    Alert,
    BackHandler,
    Modal,
    Pressable,
} from "react-native";
import Styles from "../Styles.js/StyleAdventureFases.js";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import areas from '../data/areas.js';

export default function AdventureFases() {
    const navigation = useNavigation();
    const route = useRoute();
    const { characterInfo, currentFase } = route.params;

    const [area, setArea] = useState(0);

    const [modalVisible, setModalVisible] = useState({
        life: false,
        damage: false,
        extraTime: false
    });

    const colors = {  
        life: { bg: "#e74c3c", border: "#b2312b" },
        damage: { bg: "rgba(255, 128, 49, 1)", border: "#d67119ff" },
        extraTime: { bg: "#3498db", border: "#2a75b0" },
    };

    useEffect(() => {
        navigation.navigate("ItemShop", {
            characterInfo,
            currentFase
        });
    }, [currentFase]);

    useFocusEffect(
        useCallback(() => {
            const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
                Alert.alert(
                    "Sair da Aventura",
                    "Tem certeza de que deseja abandonar a aventura? Você perderá todo o progresso.",
                    [
                        { text: "Cancelar", style: "cancel" },
                        {
                            text: "Abandonar Aventura",
                            style: "destructive",
                            onPress: () => navigation.goBack(),
                        },
                    ]
                );
                return true;
            });

            return () => backHandler.remove();
        }, [])
    );

    const FreeFased = ({ txt, faseInfo, characterInfo, area, enemyIndex, faseNumber }) => (
        <TouchableOpacity
            style={Styles.boxImageButton}
            onPress={() => navigation.navigate("Battle", { txt, faseInfo, characterInfo, area, enemyIndex, faseNumber })}
        >
            <Image style={Styles.boxImageImage} source={areas[area].icon || areas[0].icon} />
            <Text style={Styles.boxImageButtonText}>{txt}</Text>
        </TouchableOpacity>
    );

    const ClosedFased = ({ txt }) => (
        <TouchableOpacity style={[Styles.boxImageButton]} activeOpacity={1}>
            <Image
                source={areas[area].icon || areas[0].icon}
                style={Styles.boxImageImage}
            />
            <Image source={areas[area].icon || areas[0].icon} style={[Styles.boxImageImage, Styles.closedFaseIcon]} />
            <Text style={[Styles.boxImageButtonText, Styles.closedFaseText]}>{txt}</Text>
        </TouchableOpacity>
    ); 


    const renderModal = (type, description) => (
        <Modal
            transparent
            visible={modalVisible[type]}
            animationType="fade"
            onRequestClose={() => setModalVisible(prev => ({ ...prev, [type]: false }))}
        >
            <View style={Styles.modalOverlay}>
                <View style={Styles.modalContainer}>
                    <Text style={Styles.modalTitle}>
                        {type === 'life' ? 'Vida' : type === 'damage' ? 'Dano' : 'Tempo Extra'}
                    </Text>
                    <Text style={Styles.modalDescription}>{description}</Text>
                    <Pressable
                        style={Styles.modalButton}
                        onPress={() => setModalVisible(prev => ({ ...prev, [type]: false }))}
                    >
                        <Text style={Styles.modalButtonText}>Fechar</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );

    return (
        <ImageBackground
            style={Styles.imageAjust}
            source={areas[area].backgroundArea || areas[0].backgroundArea}
        >
            <View style={Styles.topBar}>
                <TouchableOpacity
                    style={[
                        Styles.statItem,
                        { backgroundColor: colors.life.bg, borderColor: colors.life.border },
                    ]}
                    onPress={() => setModalVisible(prev => ({ ...prev, life: true }))}
                >
                    <Text style={Styles.statText}>{characterInfo.life}</Text>
                    <Ionicons name="heart" size={30} color="#fff" style={{ marginLeft: 8 }} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        Styles.statItem,
                        { backgroundColor: colors.damage.bg, borderColor: colors.damage.border },
                    ]}
                    onPress={() => setModalVisible(prev => ({ ...prev, damage: true }))}
                >
                    <Text style={Styles.statText}>{characterInfo.damage}</Text>
                    <Ionicons name="flame" size={30} color="#fff" style={{ marginLeft: 8 }} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        Styles.statItem,
                        { backgroundColor: colors.extraTime.bg, borderColor: colors.extraTime.border },
                    ]}
                    onPress={() => setModalVisible(prev => ({ ...prev, extraTime: true }))}
                >
                    <Text style={Styles.statText}>{characterInfo.extraTime}s</Text>
                    <Ionicons name="time" size={30} color="#fff" style={{ marginLeft: 8 }} />
                </TouchableOpacity>
            </View>

            <View style={Styles.paginationContainer}>
                {area < areas.length - 1 && (
                    <TouchableOpacity
                        style={Styles.paginationButton}
                        onPress={() => {
                            setArea(area + 1);
                        }}
                    >
                        <Ionicons name="arrow-up" style={Styles.iconStyle} />
                    </TouchableOpacity>
                )}
            </View>

            {areas[area].fases.map((fase, i) => {
                const faseNumber = area * 3 + i + 1;
                const unlocked = faseNumber === currentFase;

                return (
                    <View key={faseNumber} style={Styles.box}>
                        <View style={[Styles.pageIcon, { ...areas[area].iconPositions[i] }]}>
                            <View style={Styles.boxImage}>
                                { unlocked ? (
                                    <FreeFased
                                        txt={faseNumber}
                                        faseInfo={fase}
                                        characterInfo={characterInfo}
                                        area={area}
                                        enemyIndex={i}
                                        faseNumber={faseNumber}
                                    />
                                ) : (
                                    <ClosedFased txt={faseNumber} />
                                )}
                            </View>
                        </View>
                    </View>
                );
            })}

            {area > 0 && (
                <TouchableOpacity
                    style={Styles.paginationButton}
                    onPress={() => setArea(area - 1)}
                >
                    <Ionicons name="arrow-down" style={Styles.iconStyle} />
                </TouchableOpacity>
            )}

            {renderModal('life', 'Vida representa quantos pontos de vida seu personagem possui. Se chegar a zero, ele é derrotado.')}
            {renderModal('damage', 'Dano é o quanto de dano seu personagem causa aos inimigos em cada ataque.')}
            {renderModal('extraTime', 'Tempo Extra é o tempo adicional que você tem para responder durante as batalhas.')}
        </ImageBackground>
    );
}
