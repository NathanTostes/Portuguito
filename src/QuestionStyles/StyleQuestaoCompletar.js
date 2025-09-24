import { StyleSheet, Dimensions } from "react-native";
const {width, height} = Dimensions.get("window")

export default StyleSheet.create({
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    container: {
        marginTop: 10,
        alignItems: 'center',
        flex: 1,
    },
    questoes: {
        marginLeft: "10%",
    },
    ScrollViewContent: {
        marginLeft: "4%",
    },
    progressContainerInfo: {
        top: 55,
        width: 300,
        flexDirection: "row",
        alignSelf: "center",
    },
    infoAcertos: {
        padding: 10,
        color: '#4CAF50'
    },
    infoErros: {
        padding: 10,
        color: '#F54F59'
    },
    progressContainer: {
        width: 250,
        height: 18,
        backgroundColor: "#ddd",
        borderRadius: 98,
        overflow: "hidden",
        marginVertical: 10,
    },
    progressBar: {
        height: "100%",
        position: "absolute",
    },
    progressInfoWarning: {
        fontSize: 16,
        color: '#F54F59',
        top: 55,
        alignSelf: "center",
        fontFamily: 'Inder_400Regular',
    },
    progressInfoSuccessful: {
        fontSize: 16,
        color: '#4CAF50',
        top: 55,
        alignSelf: "center",
        fontFamily: 'Inder_400Regular',
    },
    enunciado: {
        backgroundColor: '#ff8c90',
        height: 'auto',
        width: 300,
        marginTop: 60,
        left:width*0.12,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    backgroundImagem: {
        backgroundColor: '#F54F59',
        height: 250,
        width: 250,
        marginTop: 8,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtEnunciado: {
        fontSize: 16,
        color: '#fff',
        top: 0,
        width: '90%',
        left: width*0.125,
        padding: 10,
        textAlign: 'left',
        fontFamily: 'Inder_400Regular',
    },
    resposta: {
        backgroundColor: '#ff8c90',
        marginTop: 10
    },
    imagem: {
        height: 240,
        width: 240,
        borderRadius: 10,
    },
    alternativas: {
        flexDirection: 'row-reverse',
        backgroundColor: '#ffb9bd',
        borderRadius: 40,
        width: 300,
        marginTop: 5,
        height: 'auto',

    },
    label: {
        fontFamily: 'Inder_400Regular',
        color: '#fff',
        textAlign: "auto",
        borderWidth: 0
    },
    selectLabel: {
        backgroundColor: '#F54F59'
    },
    btnContinuar: {
        backgroundColor: '#F54F59',
        width: 100,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,

    },
    containerContinuarProfessor: {
        width: '100%',
        top: 2,
        alignItems: 'flex-end',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        flex: 1,
        position: "relative",
        marginVertical: 14,
    },
    containerContinuar: {
        top: 5,
        height: 45,
        marginBottom: 35,
    },
    btnSalvar: {
        backgroundColor: '#F54F59',
        width: 100,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginLeft: 10
    },
    containerSalvar: {
        width: '100%',
        right: 15,
        top: 15,
        alignItems: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    confirmar: {
        width: 300,
        height: 45,
        alignItems: 'center',
        left: width*0.12,
        justifyContent: 'center',
        borderRadius: 20,
        marginVertical: 20
    },

    btnAtivado: {
        backgroundColor: "#F54F59",
    },

    btnDesativado: {
        backgroundColor: "#848484",
    },

    containerResposta: {
        backgroundColor: "red",
    },

    fullImage: {
        marginTop: "15%",
        height: "100%",
        resizeMode: "contain",
        top: -200,
    },
    iconStyle: {
        color: "#FFFFFF",
        fontSize: 24,
    },

    paginationButton: {
        marginTop: 5,
        width: 42,
        height: 42,
        borderRadius: 25,
        backgroundColor: "#ff8c90",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
        fontFamily: "Inder_400Regular",
        textAlign: "justify",
    },
    modalWarnContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        zIndex: 1000,
    },
    modalContainer: {
        paddingTop: 70,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    modalButton: { fontFamily: "Inder_400Regular", fontSize: 15 },
    paginationButton: {
        marginTop: 5,
        width: 42,
        height: 42,
        borderRadius: 25,
        backgroundColor: "#ff8c90",
        justifyContent: "center",
        alignItems: "center",
    },
    loader: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
