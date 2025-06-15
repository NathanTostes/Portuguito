import { StyleSheet, TouchableOpacity } from "react-native"

export default StyleSheet.create({
    imageAjust: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rankingIcon: {
        position: "absolute",
        width: 125,
        height: 125,
        bottom: 680,
        left: 264,
    },
    rankingIconImage: {
        width: 125,
        height: 125,
    },
    boxImageBoss: {
        height: 200,
        width: 200,
        flex: 1,
    },
    boxLastDay: {
        top: -35,
        height: 200,
        width: 150,
        alignItems: 'center',
    },
    lastDayClosed: {
        opacity: 0.3,
    },
    boxImageImage: {
        height: 100,
        width: 175,
        flex: 1,
    },
    boxImageButton: {
        height: 135,
        width: 135,
        alignItems: 'center',
        justifyContent: 'center',
    },
    faseIcon: {
        position: 'relative',
        bottom: 62
    },
    faseIconImage: {
        height: 50,
        width: 50,
        position: 'absolute',
    },
    centerFaseIcon: {
        marginTop: 15,
        marginRight: 50,
    },
    rightFaseIcon: {
        left: 6,
    },
    leftFaseIcon: {
        right: 55,
    },
    activeIcon: {
        marginTop: 10,
    },
    faseIconText: {
        height: 45,
        width: 50,
        position: 'absolute',
        textAlign: 'center',
        verticalAlign: "middle",
        color: '#ffffff',
        fontSize: 12,
        fontFamily: 'Inder_400Regular',
    },
    divTela: {
        height: 'auto',
        width: 'auto',
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        padding: 200,

    },
    rotatedFase: {
        transform: [{ rotateY: '180deg' }],
    },
    bottomPierLeft: {
        right: 250,
        top: 180,
    },
    bottomPierRight: {
        left: 230,
        top: 15,
    },
    centerPierLeft: {
        right: 180,
        bottom: 250,
    },
    centerPierRight: {
        left: 190,
        bottom: 370,
    },
    topPierLeft: {
        right: 150,
        bottom: 630,
    },
    topPierRight: {
        left: 150,
        bottom: 760,
    },
});