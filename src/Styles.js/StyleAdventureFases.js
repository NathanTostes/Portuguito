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

    boxImage: {
        height: '100%',
        width: '40%',
        justifyContent: "center",
        alignItems: "center",

    },

    boxImageImage: {
        height: 260,
        width: 260,
        resizeMode: "contain",
    },

    boxImageButton: {
        height: 260,
        width: 260,
        alignItems: 'center',
        justifyContent: 'center',
    },

    boxImageButtonText: {
        color: '#fff',
        fontSize: 16,
        position: 'absolute',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: "rgba(255, 140, 144, 0.5)",
        top: 180,
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
        zIndex: 999,
        width: 50,
        height: 50,
        borderRadius: 25,
        marginBottom: 10,
        backgroundColor: "rgba(255, 140, 144, 0.5)",
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalDescription: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    modalButton: {
        backgroundColor: '#3498db',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
    },

    pageIcon: {
        height: '100%',
        width: '100%',
        flex: 1,
        position: 'absolute',
        flexDirection: 'row',
    },

    closedFaseIcon: {
        tintColor: "black",
        position: "absolute",
        opacity: 0.6
    },

    closedFaseText: {
        opacity: 0.5,
        backgroundColor: "#00000077",
    },

});