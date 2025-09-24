import { StyleSheet } from "react-native"

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D2D0FA",
        paddingTop: 60,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    headerText: {
        color: "#FFFFFF",
        fontSize: 26,
        fontWeight: "bold",
    },
    coinsContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
    },
    coinsText: {
        color: "#FF6F6F",
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 5,
    },
    section: {
        marginHorizontal: 5,
        marginVertical: 20,
    },
    sectionTitle: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 20,
        marginBottom: 10,
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 10,
        alignItems: "center",
        marginHorizontal: 10,
        width: 150,
    },
    cardTitle: {
        color: "#FF6F6F",
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 5,
    },
    cardImage: {
        width: 100,
        height: 105,
        marginBottom: 5,
    },
    cardDescription: {
        color: "#FF6F6F",
        fontSize: 12,
        textAlign: "center",
        marginBottom: 5,
    },
    cardPriceContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    cardPrice: {
        color: "#FF6F6F",
        fontSize: 14,
        fontWeight: "bold",
    },
    button: {
        backgroundColor: "#FF6F6F",
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginTop: 20,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    buyButton: {
        backgroundColor: "#FF6F6F",
        marginTop: 7,
        padding: 7,
        borderRadius: 7,
    },
    buyButtonText: {
        color: "#FFFFFF",
    },
    unlockButton: {
        backgroundColor: "#4CAF50", 
        marginTop: 7,
        padding: 7,
        borderRadius: 7,
    },
    unlockButtonText: {
        color: "#FFFFFF",
    },
});
