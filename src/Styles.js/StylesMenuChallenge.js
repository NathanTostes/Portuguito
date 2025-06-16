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
        right:4,
        top:-4,
        flex: 1,
        transform: [{ scale: 1.2 }],
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
        right:45,
        bottom:40,
    },
    leftFaseIcon: {
        left: 10,
        bottom:35,
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
        position: 'absolute',
        right: 410,
        bottom: '55%',
        transform: [{ scale: 0.9 }],
    },
    bottomPierRight: {
        position: 'absolute',
        left: 410,
        bottom: '52%',
        transform: [{ scale: 0.9 }],
        
    },
    centerPierLeft: {
        position: 'absolute',
        right: 370,
        bottom: '75%',
        transform: [{ scale: 0.8 }],
    },
    centerPierRight: {
        position: 'absolute',
        left: 370,
        bottom: '75%',
        transform: [{ scale: 0.8 }],
    },
    topPierLeft: {
        position: 'absolute',
        right: 335,
        bottom: '90%',
        transform: [{ scale: 0.7 }],
    },
    topPierRight: {
        position: 'absolute',
        left: 335,
        bottom: '90%',
        transform: [{ scale: 0.7 }],
    },
});