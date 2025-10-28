import { AntDesign } from "@expo/vector-icons";
import { fi } from "date-fns/locale";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#d6c4f7",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  voltar: {
    height: 50,
    width: 50,
    zIndex: 1,
    marginBottom: 10,
  },
  paginationButton: {
    width: 42,
    height: 42,
    borderRadius: 25,
    backgroundColor: "#ff8c90",
    justifyContent: "center",
    alignItems: "center",
  },
  iconStyle: {
    color: "#FFFFFF",
    fontSize: 24,
  },
  pickerItem: {
    fontSize: 13,
  },
  infoContainer: {
    position: "absolute",
    right: 20,
    top: 20,
  },
  antDesign: {
    color: "#fff",
  },
  modalContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    position: "absolute",
    top: "200",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    fontFamily: "Inder_400Regular",
    textAlign: "justify",
  },
  modalCloseButton: {
    fontFamily: "Inder_400Regular",
    fontSize: 15,
  },
});
