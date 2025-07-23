import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFB9BD",
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
    marginHorizontal: 20,
  },

  imagemPersonagem: {
    width: 180,
    height: 180,
  },

  caractherName: {
    marginTop: 10,
    fontSize: 20,
    fontFamily: "Inder_400Regular",
    color: "#FFFFFF",
  },

  seta: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#F5505A",
    paddingHorizontal: 10,
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
