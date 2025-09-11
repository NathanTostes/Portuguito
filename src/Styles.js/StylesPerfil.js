import { StyleSheet } from "react-native";

export default StyleSheet.create({
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    container: {
        flex: 1,
        marginTop: 100,
        alignItems: 'center',

    },
    containerFilho: {
        marginTop: 10,
    },
    containerBotoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,                    
    marginTop: 20,
    },
    image: {
        width: null,
        height: 'auto',
        flex: 1,
        resizeMode: "cover"
    },
    backgroundUser: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderColor: '#ff8c90',
        borderWidth: 4,
        overflow: 'hidden',
        backgroundColor: '#00000000',
    },
    botao: {
        backgroundColor: '#ff8c90',
        width: 120,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20,
    },
    sombra: {
        shadowColor: '#000',
        elevation: 10,
    },
    txtBotao: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 15,
        fontFamily: 'Inder_400Regular',
    },
    logoContainer: {
        position: "absolute",
        backgroundColor: "#FFFFFF",
        padding: 10,
        borderRadius: 10,
        top: -60,
        left: 15,
        borderWidth: 2,
        borderColor: "#ff8c90"
    },
    logo: {
        width: 40,
        height: 55
    },
    modalLogoContainer: {
        backgroundColor: "#FFFFFF",
        padding: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#ff8c90"
    },
    modalLogo: {
        width: 70,
        height: 110
    },
    input: {
        backgroundColor: '#EFEFFE',
        marginTop: 5,
        width: 300,
        borderRadius: 10,
        justifyContent: "center",
        padding: 10
    },
    campoEmail: {
        paddingTop: 10,
        paddingBottom: 10
    },
    txtInput: {
        color: '#ff8c90',
        padding: 2,
        fontFamily: 'Inder_400Regular',

    },
    editIcon: {
        color: "#FFFFFF",
        fontSize: 25,
        padding: 7.5,
    },
    editIconFrame: {
        zIndex: 1,
        position: 'absolute',
        right: 25,
        top: -50,
        height: 40,
        width: 40,
        borderRadius: 25,
        marginTop: 10,
        backgroundColor: "#ff8c90",
    },
})