import { StyleSheet, Dimensions } from "react-native"
const { width, height } = Dimensions.get("window");

export default StyleSheet.create({

    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        //minHeight: height<700 ? height+200:null,
        paddingTop: '10%',
    },
    containerOpcao:{
        alignItems: 'flex-start',
    },
    containerBorder:{
        borderTopWidth: 2,
        borderLeftWidth: 0,
        borderRightWidth: 0, 
        borderColor: '#FFFFFF',
        borderRadius: 10,
        padding: 25,
        margin: 0,
        
    },
    containerLabel:{
        justifyContent: 'space-between', 
        flexDirection: 'row',
    },
    txtTituloPrincipal:{
        color: '#ff8c90',
        padding: 2,
        fontFamily: 'Inder_400Regular',
        fontSize: 25,
        paddingHorizontal:5,
    },
    txtTitulo:{
        color: '#ff8c90',
        padding: 2,
        fontFamily: 'Inder_400Regular',
        fontSize: 25,
        paddingHorizontal:5,
    },
    txtLabel:{
        color: '#FFFFFF',
        padding: 2,
        fontFamily: 'Inder_400Regular',
        fontSize: 21,
        paddingHorizontal:10,
    },
    botao: {
        backgroundColor: '#ff8c90',
        width: 120,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 16,
    },
    txtBotao: {
    color: '#ffffff',
    fontFamily: "Inder_400Regular",
    textAlign: "center",
    
    fontSize: 21,
    },
    centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalOpcao:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,                    
    marginTop: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#ff8c90',
  },
  textStyle: {
    fontFamily: 'Inder_400Regular',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    color: '#ff8c90',
    fontFamily: 'Inder_400Regular',
    marginBottom: 15,
    textAlign: 'center',
  },

})