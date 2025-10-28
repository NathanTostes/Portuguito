import { StyleSheet } from "react-native";

export default StyleSheet.create({
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex: 1,
    marginTop: 100,
  },
  containerFilho: {
    marginTop: 20,
  },
  containerBotao: {
    marginTop: 15,
  },
  containerSmallButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 30,
    marginTop: 15,
  },
  mascote: {
    marginLeft: 50,
    marginTop: -100,
    height: 320,
    resizeMode: "repeat",
  },
  input: {
    backgroundColor: "#EFEFFE",
    padding: 10,
    marginTop: 5,
    height: 50,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 10,
    justifyContent: "center",
    color: '#3E1E1E',
  },
  txtInput: {
    color: "#fff",
    fontFamily: "Inder_400Regular",
    padding: 7,
    alignSelf: "flex-start",
    borderRadius: 10,
    textAlign: "center",
    backgroundColor: "#FFB9BD",
  },
  txtAllert: {
    color: "#fff",
    fontFamily: "Inder_400Regular",
    padding: 6,
    marginTop: 15,
    textAlign: "center"
  },
  frase: {
    color: "#fff",
    fontFamily: "Inder_400Regular",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 18,
    fontSize: 25,
  },
  botao: {
    backgroundColor: "#FFB9BD",
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 10,
  },

  btnEsqueciSenha: {
    backgroundColor: "#ff8c90",
    borderRadius: 10,
  },

  txtEsqueciSenha: {
    color: "#ffff",
    textAlign: "right",
    paddingHorizontal: 20,
    paddingVertical: 6,
    textDecorationLine: "underline",
  },

  txtBotao: {
    color: "#fff",
    fontFamily: "Inder_400Regular",
    textAlign: "center",
    padding: 20,
    fontSize: 25,
  },
  textArea: {
    height: 120,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: 'top',
    fontFamily: "Inder_400Regular",
  },
  switch: {
    position: 'relative',
    top: '-20%',
  },
  inputContainer: {
    marginBottom: 10,
    marginLeft:10,
    marginRight:10
  },
});
