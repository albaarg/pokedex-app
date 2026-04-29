import { Colors } from "@/constants/theme";
import { FavoritesScreen } from "@/features/favorites/screens/favorites-screen";
import { PokemonDetailScreen } from "@/features/pokemon/screens/PokemonDetailScreen";
import { PokemonListScreen } from "@/features/pokemon/screens/PokemonListScreen";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type RootTabParamList = {
  Explore: undefined;
  Favorites: undefined;
};

export type ExploreStackParamList = {
  ExploreMain: undefined;
  Detail: { pokemonId: number };
  NoConnection: undefined;
};

export type FavoritesStackParamList = {
  FavoritesMain: undefined;
  Detail: { pokemonId: number };
  NoConnection: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const ExploreStack = createNativeStackNavigator<ExploreStackParamList>();
const FavoritesStack = createNativeStackNavigator<FavoritesStackParamList>();

const sharedHeaderOptions = {
  headerShown: true,
  headerStyle: { backgroundColor: Colors.background },
  headerTintColor: Colors.text,
  headerTitleStyle: { fontWeight: "bold" as const },
  headerBackTitleVisible: false,
};

export const AppNavigator = () => {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: Colors.primary,
            tabBarInactiveTintColor: Colors.secondary,
            tabBarStyle: styles.tabBar,
            tabBarLabelStyle: styles.tabBarLabel,
          }}
        >
          <Tab.Screen
            name="Explore"
            options={{
              tabBarLabel: "Explorar",
              tabBarAccessibilityLabel: "Explorar Pokémon",
              tabBarIcon: ({ color, size, focused }) => (
                <Ionicons
                  name={focused ? "compass" : "compass-outline"}
                  size={size}
                  color={color}
                />
              ),
            }}
          >
            {() => (
              <ExploreStack.Navigator screenOptions={sharedHeaderOptions}>
                <ExploreStack.Screen
                  name="ExploreMain"
                  component={PokemonListScreen}
                  options={{ headerShown: false }}
                />
                <ExploreStack.Screen
                  name="Detail"
                  component={PokemonDetailScreen}
                  options={{ title: "Detalle", headerBackTitleVisible: false }}
                />
              </ExploreStack.Navigator>
            )}
          </Tab.Screen>

          <Tab.Screen
            name="Favorites"
            options={{
              tabBarLabel: "Favoritos",
              tabBarAccessibilityLabel: "Ver Pokémon favoritos",
              tabBarIcon: ({ color, size, focused }) => (
                <Ionicons
                  name={focused ? "heart" : "heart-outline"}
                  size={size}
                  color={color}
                />
              ),
            }}
          >
            {() => (
              <FavoritesStack.Navigator screenOptions={sharedHeaderOptions}>
                <FavoritesStack.Screen
                  name="FavoritesMain"
                  component={FavoritesScreen}
                  options={{ headerShown: false }}
                />
                <FavoritesStack.Screen
                  name="Detail"
                  component={PokemonDetailScreen}
                  options={{ title: "Detalle", headerBackTitleVisible: false }}
                />
              </FavoritesStack.Navigator>
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  tabBar: {
    backgroundColor: Colors.background,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
});
