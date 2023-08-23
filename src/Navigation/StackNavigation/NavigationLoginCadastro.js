import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../../Views/Login";
import Cadastro from "../../Views/Cadastro"
import Tab from "../TabNavigation/Tab"
import Home from "../../Views/Home";
import DescritoresProcedimentoLeitura from '../../Views/DescritoresProcedimentoLeitura'
import DescritorImplicacoesGeneroTextual from '../../Views/DescritorImplicacoesGeneroTextual'
import DescritorRelacaoEntreTextos from '../../Views/DescritorRelacaoEntreTextos'
import DescritorVariacaoLinguistica from '../../Views/DescritorVariacaoLinguistica'
import DescritorRelacoesEntreRecursosExpressivos from '../../Views/DescritorRelacoesEntreRecursosExpressivos'
import DescritorCoerenciaCoesaoTextual from '../../Views/DescritorCoerenciaCoesaoTextual'

const Stack = createStackNavigator()

export default  function PassaStack(){
    
    return (
        
        <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}} >
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Cadastro' component={Cadastro} />
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='Tab' component={Tab} />
          <Stack.Screen name='DescritoresProcedimentoLeitura' component={DescritoresProcedimentoLeitura} />
          <Stack.Screen name='DescritorImplicacoesGeneroTextual' component={DescritorImplicacoesGeneroTextual} />
          <Stack.Screen name='DescritorRelacaoEntreTextos' component={DescritorRelacaoEntreTextos}/>
          <Stack.Screen name='DescritorVariacaoLinguistica' component={DescritorVariacaoLinguistica} />
          <Stack.Screen name='DescritorRelacoesEntreRecursosExpressivos' component={DescritorRelacoesEntreRecursosExpressivos} />
          <Stack.Screen name='DescritorCoerenciaCoesaoTextual' component={DescritorCoerenciaCoesaoTextual} />
        </Stack.Navigator>
      
      

        
    )
}