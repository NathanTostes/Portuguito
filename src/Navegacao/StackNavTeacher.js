import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Perfil from "../Views/Perfil";
import FormRate from "../Views/FormRate";
import Configuracao from "../Views/Configuracao";
import EditarConfig from "../Views/EditarConfig";
import { useTabDisplay } from "../hooks/useTabDisplay"


const Stack = createStackNavigator();

export default function StackNavTeacher({ navigation, route }) {

    useTabDisplay({
        navigation,
        route,
        screens: ["Menu", "StackNav", "Perfil", "Listas"],
    });

    return (
        <Stack.Navigator
            initialRouteName="Perfil"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Perfil" component={Perfil} />
            <Stack.Screen name="Rate" component={FormRate} />
            <Stack.Screen name="Configuracao" component={Configuracao} />
            <Stack.Screen name="EditarConfig" component={EditarConfig} />

        </Stack.Navigator>
    );
}
