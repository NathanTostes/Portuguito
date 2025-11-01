import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window")

export const Styles = StyleSheet.create({
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    container: {
        flex: 1,
        backgroundColor: "#D2D0FA",
        alignItems: 'center',
        minHeight: height < 700 ? height + 200 : null,
        paddingTop: '10%',

    },

    header: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        paddingTop: 10
    },
    titleHelpPage: {
        color: "black",
        borderBottomWidth: 1,
        borderBottomColor: "#F5505A",
        fontSize: 22,
        fontWeight: 'bold',
        margin: 0,
        padding: "5px",

    },
    buttonPerfil: {
        backgroundColor: "#F5505A",
        width: 150
    },
    content: {
        margin: 10
    },
    sectionTitle: {
        width: "100%",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 40
    },
    guiaTitle: { 
        fontSize: 32,
        color: "#F5505A"
    },
    topicos:  { 
        fontSize: 24,
        borderBottomWidth: 1,
        borderBottomColor: "#F5505A",
        color: "#F5505A",
        alignSelf: "flex-start",
        marginBottom: 20
    },
    desafioSemanal:  {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    desafioSemanalTopicos:  { 
        fontSize: 24,
        borderBottomWidth: 1,
        borderBottomColor: "#F5505A",
        color: "#F5505A",
        
    },
    bordaFinal: { 
        marginVertical: 5
    },
    centralizar:  {
        width: "100%",
        alignItems: "center",
    }

})

export const StylesRogueLike = StyleSheet.create({

    section: {
        width: "100%",
        display: "flex",
        alignItems: "start",
        justifyContent: "center",
        gap: 15,
        marginBottom: 20

    },
    sectionTitle: {
        fontSize: 24,
        color: "#F5505A",
        borderBottomWidth: 1,
        borderBottomColor: "#F5505A",
        paddingBottom: 6,
        alignSelf: 'flex-start'
    },
    sectionDescription: {
        color: "white",
        fontSize: 16
    },
    gridCharacter: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        padding: 5,
        gap: 20,
        marginBottom: 30
    },
    gridItem: {
        width: '48%',
        aspectRatio: 1
    },
    gridItemTitle: {
        color: "#F5505A",
        borderBottomWidth: 1,
        borderBottomColor: "#F5505A",
        paddingBottom: 6,
        alignSelf: 'flex-start',
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 20
    },
    character: {
        width: 120,
        height: 120
    },
    titleIcon: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "end",
        height: 50
    }
})


export const StylesPerfil = StyleSheet.create({ 
    paragrafo:  { 
        fontSize: 17,
        color: "white",
        marginVertical: 15,
        paddingBottom: 5,
        borderBottomColor: "#F5505A",
        borderBottomWidth: 1,
        alignSelf: "flex-start"
    },
    listaBox: {
        
    },
    listaItem: {
        flexDirection: "row",
        alignItems: "baseline",
        gap: 5
    },
    listaImg: { 
        
    },
    listaItemTexto:  {
        marginVertical: 10, 
        paddingHorizontal: 5,
        color: "white",
        fontSize: 17,
        flexShrink: 1,

    },
    bola: { 
        color: "#F5505A",
        
    }
})

export const StylesTrilha = StyleSheet.create({ 
    paragrafo: { 
        fontSize: 17,
        color: "white",
        marginVertical: 15,
        paddingBottom: 5,
    },
    ultimoParagrafo: { 
        fontSize: 17,
        color: "white",
        marginVertical: 15,
        paddingBottom: 5,
        borderBottomColor: "#F5505A",
        borderBottomWidth: 1,
        alignSelf: "flex-start"
    }

})