import { StyleSheet } from "react-native"

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D2D0FA",
        alignItems: "center",
        paddingTop: 80,
    },
    header: {
        backgroundColor: "#FFB8BC",
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    headerText: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "bold",
    },
    challengeShow: {
        flexDirection: "row",
        backgroundColor: "#FFB8BC",
        paddingVertical: 4,
        paddingHorizontal: 4,
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 20,
    },
    showActive: {
        paddingHorizontal: 10,
        paddingVertical: 1,
        backgroundColor: "#FF6F6F",
        borderRadius: 10,
    }, 
    showInactive: {
        paddingHorizontal: 10,
        paddingVertical: 1,
    },
    tableHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
        backgroundColor: "#FF6F6F",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingVertical: 10,
    },
    columnHeader: {
        verticalAlign: "middle",
        fontWeight: "bold",
        fontSize: 14,
        color: "#FFFFFF",
    },
    scrollContainer: {
        width: "90%",
        maxHeight: "54%",
        backgroundColor: "#FFC1C1",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#FF6F6F",
    },
    cell: {
        flex: 1,
        textAlign: "center",
        fontSize: 14,
        color: "#FFFFFF",
    },
    fasesCell: {
        width: "20%",
    },
    positionCell: {
        fontSize: 16,
        fontWeight: "bold",
    },
    nameCell: {
        minWidth: "25%",
    },
    userRow: {
        width: "90%",
        backgroundColor: "#FF6F6F",
        paddingVertical: 10,
        marginTop: -1,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
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

});
