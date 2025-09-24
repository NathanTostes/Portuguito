import { StyleSheet } from "react-native";

export default StyleSheet.create({
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },

  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },

  topo: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 30,
    marginBottom: 10,
  },

  buttonTop: {
    marginTop: 5,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ff8c90",
    justifyContent: "center",
    alignItems: "center",
  },

  iconStyle: {
    color: "#FFFFFF",
    fontSize: 26,
  },

  personagemArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  personagem: {
    alignItems: "center",
    marginHorizontal: 1,
  },

  imagemPersonagem: {
    width: 240,
    height: 240,
    resizeMode: "contain",
  },

  caractherName: {
    marginTop: 10,
    fontSize: 20,
    fontFamily: "Inder_400Regular",
    color: "#FFFFFF",

    textShadowColor: "#999999",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },  

  seta: {
    backgroundColor: "#F5505A",
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFFFF",
    paddingHorizontal: 14,
    paddingBottom: 4,
    borderRadius: 30,
  },

  botaoIniciar: {
    backgroundColor: "#F5505A",
    padding: 15,
    borderRadius: 10,
    width: "90%",
    elevation: 10,
    alignItems: "center",
    marginBottom: 100,
  },

  textoIniciar: {
    color: "#fff",
    fontSize: 22,
    fontFamily: "Inder_400Regular",
  },
});
