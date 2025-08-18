import { StyleSheet } from "react-native"



export default StyleSheet.create({
    container:{
        flex:1,
        marginTop:100,
              

    },
    containerFilho:{
        flexDirection:"column",
        marginTop: 5,

    },
    containerFilho2:{
        flexDirection:"column",
        marginTop: 5,
        marginLeft:5,

    },
    descricao:{
        color: '#fff',
        fontFamily: 'Inder_400Regular',
        padding:8,
        // width: não precisa declarar,
        alignSelf: 'flex-start',
        marginLeft:20,
        marginRight: 20,
        borderRadius:10,
        textAlign:'left',
        backgroundColor: '#FFB9BD',
    },
    descricaoGrande:{
            color: '#fff',
            fontFamily: 'Inder_400Regular',
            padding:8,
            width:180,
            alignSelf: 'flex-start',
            marginLeft:20,
            marginRight: 20,
            borderRadius:10,
            textAlign:'left',
            backgroundColor: '#FFB9BD',  
    },
    input:{
        backgroundColor: '#EFEFFE',
        padding:10,
        marginTop: 5,
        height:50,
        marginLeft:20,
        marginRight: 20,
        borderRadius:10,
       
    },
    botao:{
        backgroundColor:'#FFB9BD',
        marginLeft:20,
        marginRight: 20,
        borderRadius:10,
        
    },
    textBotao:{
        color: '#fff',
        textAlign: 'center',
        padding: 20,
        fontFamily: 'Inder_400Regular',
        
       
        
    },
    registrar:{
        color: '#fff',
        textDecorationLine:'underline',
        textAlign:'center',
        marginTop: 18,
        marginBottom: 18,

    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
        
    },
    imageNome:{
       marginLeft: -50,
       marginTop: 30,
       height:250,
       resizeMode: "repeat",
       

    },
    imageLogo:{
       marginLeft: 70,
       marginTop: -240,
       height:500,
       resizeMode: "repeat",
       

    },
    txtRadio:{
        fontFamily: 'Inder_400Regular',
        color:'#fff',
        backgroundColor: '#FFB9BD'
    },
    containerProfessor:{
        alignItems: 'center',
        flexDirection: 'row',
        left: 20
    },
    txtTituloPrincipal:{
        color: '#ff8c90',
        padding: 2,
        fontFamily: 'Inder_400Regular',
        fontSize: 25,
        paddingHorizontal:5,
        
    },
    txtProfessor:{
        fontFamily: 'Inder_400Regular',
        color: '#fff',
        fontSize: 15,
        left: 20
    }

    
})

