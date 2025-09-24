import { StyleSheet } from "react-native";

export default StyleSheet.create({
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "justify",
        color: "#fff",
        marginTop: 40,
        marginBottom: 20,
    },
    item: {
        padding: 10,
        marginVertical: 8,
        backgroundColor: "#fff",
        borderRadius: 8,
    },

    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    itemImage: {
        width: 100,
        height: 100,
        marginRight: 10,
    },

    itemText: {
        flex: 1,
    },

    itemName: {
        fontSize: 18,
        fontWeight: 700,
    },

    itemDescription: {
        fontSize: 14,
        fontWeight: 400,
    }
});
