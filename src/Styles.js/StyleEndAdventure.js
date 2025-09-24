import { StyleSheet } from "react-native";

export default StyleSheet.create({
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    container: {
        flex: 1, justifyContent: 'center', alignItems: 'center'
    },
    ImageFormat: {
        height: 370,
        width: 370,
        margin: -6,
        top: 20,
    },
    title: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 24,
        fontFamily: 'Inder_400Regular',
    },
    buttom: {
        backgroundColor: '#F5505A',
        padding: 30,
        margin: 10,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    FontFormatButtom: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Inder_400Regular',
    },
    coinsText: {
        marginBottom: 20,
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Inder_400Regular',
    },
})