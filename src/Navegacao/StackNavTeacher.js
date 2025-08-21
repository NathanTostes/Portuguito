import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Perfil from "../Views/Perfil";
import FormRate from "../Views/FormRate";
import FormUpdate from "../Views/FormUpdate";

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
            <Stack.Screen name="UpdateProfile" component={FormUpdate} />
        </Stack.Navigator>
    );
}
