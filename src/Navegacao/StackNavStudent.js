import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PerfilAluno from "../Views/PerfilAluno";
import ProfileImage from "../Views/ProfileImage";
import FormRate from "../Views/FormRate";
import Configuracao from "../Views/Configuracao";
import EditarConfig from "../Views/EditarConfig";
import AlterarSenha from "../Views/AlterarSenha";

import { useTabDisplay } from "../hooks/useTabDisplay"


const Stack = createStackNavigator();

export default function StackNavStudent({ navigation, route }) {

    useTabDisplay({ navigation, route, screens: ['MenuTrilha', 'StackNavAluno', 'PerfilAluno', 'MenuAluno'] })

    return (
        <Stack.Navigator
            initialRouteName="PerfilAluno"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="PerfilAluno" component={PerfilAluno} />
            <Stack.Screen name="ProfileImage" component={ProfileImage} />
            <Stack.Screen name="Configuracao" component={Configuracao} />
            <Stack.Screen name="EditarConfig" component={EditarConfig} />
            <Stack.Screen name="Rate" component={FormRate} />
        </Stack.Navigator>
    );
}
