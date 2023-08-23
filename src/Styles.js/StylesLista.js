import { StyleSheet } from "react-native";

export default StyleSheet.create({
    gradient: {
        ...StyleSheet.absoluteFillObject,        
    },
    container:{
        flex:1,
        marginTop:50,
        alignItems: 'center',        
        
    },
    containerFilho:{
        flexDirection:'row',
        marginTop: 30,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    containerBusca:{
        marginTop: 10,
        width: '100%',
        alignItems: 'flex-end'
    },
    textInput:{
        backgroundColor:'#F54F59',
        width: 150,
        marginRight: 27,
        borderRadius: 4,
        shadowColor:'#000',
        elevation:10,
        
    },
    addLista:{
        backgroundColor:'transparent',
        width: 120,
        height: 120,
        alignItems: 'center',
        justifyContent:'center',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#F54F59',
        borderRadius: 7,    
    },
    txtAdd:{
        color: '#F54F59',
        fontSize: 70,
        
        
    },
    containerList:{
        flexDirection:'row',
        marginTop: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    lista:{
        backgroundColor:'#ff8c90',
        width: 120,
        height: 120,
        borderRadius: 5,
        elevation: 10,

    },
    txtLista:{
        color: '#fff',
        position: 'absolute',
        bottom: 0,
        left: 40,
        fontFamily: 'Inder_400Regular',
        
    },
    containerBotao:{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',

    },
    
})