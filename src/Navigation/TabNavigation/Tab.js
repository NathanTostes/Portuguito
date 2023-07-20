import React from "react";
import {createBottomTabNavigator} from'@react-navigation/bottom-tabs'
import Menu from "../../Views/Menu";
import Perfil from "../../Views/Perfil";
import Listas from "../../Views/Listas";
import { Ionicons } from '@expo/vector-icons'
import { Feather, Entypo, FontAwesome5  } from '@expo/vector-icons';

const Tab = createBottomTabNavigator()

export default props => (
    <Tab.Navigator 
    initialRouteName="Menu"
    screenOptions={{
        tabBarActiveTintColor: '#fff',
        tabBarActiveBackgroundColor: '#F54F59',
        tabBarShowLabel: false,
        tabBarStyle:{
            position: 'absolute',
            backgroundColor: '#ff8c90',
            borderTopWidth: 0,

            
            elevation: 0,
            borderRadius: 4,
            height: 80,
        }

    }}>

            <Tab.Screen name='Perfil' component={Perfil} options={{
                headerShown:false,
                tabBarIcon: ({color, focused}) => {
                    if(focused) {
                        return <Feather name="user" size={50} color={color} />
                    }
                    return <Feather name="user" size={50} color='#fff' />
                }
                }} 
                />
                
            <Tab.Screen name='Menu' component={Menu} options={{
                headerShown:false,
                tabBarIcon: ({color, focused}) => {
                    if(focused) {
                        return <Entypo name="home" size={50} color={color} />
                    }
                    return <Entypo name="home" size={50} color='#fff' />
                }
                }} 
                
                  />
            <Tab.Screen name='Listas' component={Listas} options={{
                headerShown:false,
                tabBarIcon: ({color, focused}) => {
                    if(focused) {
                        return <FontAwesome5 name="clipboard-list" size={50} color={color} />
                    }
                    return <FontAwesome5 name="clipboard-list" size={50} color='#fff' />
                }
                }} 

                 />

        </Tab.Navigator>
)