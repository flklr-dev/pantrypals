// BottomTabNavigator.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";

const SearchScreen: React.FC = () => (
  <View style={styles.placeholder}>
    <Text>Search Screen</Text>
  </View>
);

const CalendarScreen: React.FC = () => (
  <View style={styles.placeholder}>
    <Text>Calendar Screen</Text>
  </View>
);

const RecipesScreen: React.FC = () => (
  <View style={styles.placeholder}>
    <Text>Recipes Screen</Text>
  </View>
);

const Tab = createBottomTabNavigator();

const BottomTabNavigator: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        headerShown: false,
        tabBarIcon: ({ focused, color }) => {
          let iconName: string;

          switch (route.name) {
            case "Home":
              iconName = "home";
              break;
            case "Search":
              iconName = "search";
              break;
            case "Calendar":
              iconName = "calendar";
              break;
            case "Recipes":
              iconName = "cutlery";
              break;
            default:
              iconName = "circle";
          }

          return (
            <Icon
              name={iconName}
              size={24}
              color={focused ? "#fff" : "#e0d4c2"} // Active color white, inactive a light beige
              style={styles.icon}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen
        name="Add"
        component={() => null} // Empty component as we're handling navigation ourselves
        options={{
          tabBarIcon: ({ color }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("AddRecipe")}
              style={styles.addIconContainer}
            >
              <Icon name="plus" size={24} color="#f79c57" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Recipes" component={RecipesScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    width: "100%",
    backgroundColor: "#f79c57",
    paddingHorizontal: 10,
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
  },
  addIconContainer: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    top: 15,
  },
  icon: {
    alignSelf: "center",
    justifyContent: "center",
    top: 15,
  },
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BottomTabNavigator;
