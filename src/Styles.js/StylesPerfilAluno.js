import { StyleSheet } from "react-native";

export default StyleSheet.create({
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },

    container: {
        flex: 1,
        marginTop: 50,
        alignItems: 'center',

    },

    containerSonAux: {
        height: 140,
        width: 315,
        padding: 8,
    },

    containerSonAuxFlexbox: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },

    numberDays: {
        alignItems: "center",
        height: "auto",
        borderRadius: 20,
    },

    txtnumberDays: {
        color: '#ff8c90',
        padding: 2,
        fontFamily: 'Inder_400Regular',
        fontSize: 30,

    },

    txtTitleView: {
        color: '#ff8c90',
        padding: 2,
        fontFamily: 'Inder_400Regular',
        fontSize: 18,

    },

    txtDate: {
        color: '#ff8c90',
        padding: 2,
        fontFamily: 'Inder_400Regular',
        fontSize: 20,
        marginTop: 10

    },

    titleView: {
        alignItems: "center",
        height: "auto",
        borderRadius: 20,
    },

    image: {
        width: null,
        height: 'auto',
        flex: 1,
        resizeMode: "cover"
    },

    ViewDados: {
        backgroundColor: '#EFEFFE',
        height: 120,
        width: 140,
        borderRadius: 10,
        alignItems: "center",
        padding: 8,
    },

    backgroundUser: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: 'hidden',
        backgroundColor: '#00000000',
        marginBottom: 16,
    },

    botao: {
        backgroundColor: '#ff8c90',
        width: 120,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 16,
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

    input: {
        backgroundColor: '#EFEFFE',
        padding: 4,
        marginTop: 5,
        height: 50,
        width: 300,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
    },

    viewOptions: {
        backgroundColor: '#EFEFFE',
        marginTop: 5,
        width: 300,
        borderRadius: 10,
        justifyContent: "center",
        padding: 10,
        borderRadius: 10
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

    playerIcons: {
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        minHeight: '13%',
        width: 300,
        borderColor: '#EFEFFE',
        borderWidth: 2,
        borderRadius: 10,
        justifyContent: "center",
        padding: 10
    },

    txtNoIcon: {
        fontSize: 14,
        color: '#EFEFFE',
        padding: 2,
        fontFamily: 'Inder_400Regular',
    },

    txtAchievements: {
        fontSize: 16,
        color: '#EFEFFE',
        fontFamily: 'Inder_400Regular',
        marginTop: 16,
    },

    iconContainer: {
        margin: 5,
        paddingRight: 20,
        paddingBottom: 16,
    },

    iconFormat: {
        width: 52,
        height: 80
    },

    iconQuantity: {
        backgroundColor: "#ff8c90",
        position: 'absolute',
        alignItems: 'center',
        right: 0,
        bottom: 0,
        borderRadius: 5,
        width: 22,
        height: 22
    },
    voltar: {
        alignSelf: "baseline",
        height: 50,
        width: 50,
        zIndex: 1,
        marginLeft: 20,
        marginBottom: 10,
    },
    iconStyle: {
        color: "#FFFFFF",
        fontSize: 24,
    },
    paginationButton: {
        width: 42,
        height: 42,
        borderRadius: 25,
        backgroundColor: "#ff8c90",
        justifyContent: "center",
        alignItems: "center",
    },
})