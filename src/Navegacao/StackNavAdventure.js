import { createStackNavigator } from "@react-navigation/stack";
import { useTabDisplay } from "../hooks/useTabDisplay"
import MenuAdventure from "../Views/MenuAdventure"
import AdventureRanking from "../Views/AdventureRanking";
import AdventureShop from "../Views/AdventureShop";
import AdventureFases from "../Views/AdventureFases";
import Battle from "../Views/Battle";
import ItemShop from "../Views/ItemShop";
import QuestaoMultipla from "../ListaDeListas/QuestaoMultipla";
import QuestaoVF from "../ListaDeListas/QuestaoVF";
import QuestaoCompletar from "../ListaDeListas/QuestaoCompletar";
import QuestaoNumeroDe from "../ListaDeListas/QuestaoNumeroDe";
import WinAdventure from "../Views/WinAdventure";
import WinAndEndAdventure from "../Views/WinAndEndAdventure";
import LoseAdventure from "../Views/LoseAdventure";

const Stack = createStackNavigator();

export default function StackNavAdventure({ navigation, route }) {

  useTabDisplay({ navigation, route, screens: ['MenuAdventure'] })

  return (
    <Stack.Navigator
      initialRouteName="MenuAdventure"
      screenOptions={{ headerShown: false }}
      >
      <Stack.Screen name="MenuAdventure" component={MenuAdventure} />
      <Stack.Screen name="AdventureShop" component={AdventureShop} />
      <Stack.Screen name="AdventureRanking" component={AdventureRanking} />
      <Stack.Screen name="AdventureFases" component={AdventureFases} />
      <Stack.Screen name="ItemShop" component={ItemShop} />
      <Stack.Screen name="Battle" component={Battle} />
      <Stack.Screen name="QuestaoMultipla" component={QuestaoMultipla} />
      <Stack.Screen name="QuestaoVF" component={QuestaoVF} />
      <Stack.Screen name="QuestaoCompletar" component={QuestaoCompletar} />
      <Stack.Screen name="QuestaoNumeroDe" component={QuestaoNumeroDe} />
      <Stack.Screen name="WinAdventure" component={WinAdventure} />
      <Stack.Screen name="WinAndEndAdventure" component={WinAndEndAdventure} />
      <Stack.Screen name="LoseAdventure" component={LoseAdventure} />
    </Stack.Navigator>
  );
}