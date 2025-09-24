import { StyleSheet } from "react-native"

export default StyleSheet.create({
    imageAjust: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },

    divTela: {
        height: 'auto',
        width: 'auto',
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        padding: 10,

    },

    topBar: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
        paddingVertical: 14,
        width: "100%"
    },

    statItem: {
        width: 100,
        height: 70,
        borderRadius: 12,
        borderWidth: 3,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
        paddingVertical: 8,
        paddingHorizontal: 10,
        flexDirection: "row",
        gap: 10,

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    statText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "700",
    },         

    box: {
        height: 500,
        width: 300,
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        margin: 10,

    },

    AjustItens_2Fases_high: {
        height: '100%',
        width: '100%',
        flex: 1,
        position: 'absolute',
        left: 80,
        bottom: 40,
        flexDirection: 'row',
    },

    AjustItens_2Fases_low: {
        height: '100%',
        width: '100%',
        flex: 1,
        position: 'absolute',
        left: 80,
        top: 40,
        flexDirection: 'row',
    },

    AjustItens_high: {
        height: '100%',
        width: '100%',
        flex: 1,
        position: 'absolute',
        left: 80,
        top: 20,
        flexDirection: 'row',

    },

    AjustItens_center: {
        height: '100%',
        width: '100%',
        flex: 1,
        position: "absolute",
        top: 80,
        left: 150,
        flexDirection: 'row',
    },

    AjustItens_low: {
        height: '100%',
        width: '100%',
        flex: 1,
        position: "absolute",
        left: 80,
        bottom: 20,
        flexDirection: 'row',

    },

    boxImage: {
        height: '100%',
        width: '40%',
        justifyContent: "center",
        alignItems: "center",

    },

    boxImageImage: {
        height: 300,
        width: 300,
        resizeMode: "contain",
    },
    
    boxImagePortuguita: {
        height: 230,
        width: 230,
        resizeMode: "contain",
    },

    boxImageButton: {
        height: 120,
        width: 120,
        alignItems: 'center',
        justifyContent: 'center',
    },

    boxImageButtonText: {
        color: '#fff',
        fontSize: 16,
        position: 'absolute',
        top: 94,
        fontFamily: 'Inder_400Regular',

    },

    paginationContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 10,
    },

    paginationButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#ff8c90",
        justifyContent: "center",
        alignItems: "center",
    },

    iconStyle: {
        color: "#FFFFFF",
        fontSize: 24,
    },

    topButtonContainer: {
        position: "absolute",
        top: 30,
        alignSelf: "center",
        zIndex: 1,
    },

    bottomButtonContainer: {
        position: "absolute",
        bottom: 30,
        alignSelf: "center",
        zIndex: 1,
    },

    loadingGif: {
        width: 100,
        height: 100,
    },

    lifeBarContainer: {
        width: 80,
        height: 8,
        backgroundColor: '#ccc',
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 4,
        bottom: 85,
        overflow: 'hidden',
    },

    lifeBarFill: {
        height: '100%',
        backgroundColor: '#27ae60',
    },

});