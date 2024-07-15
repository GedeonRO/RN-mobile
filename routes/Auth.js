import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserStack from "./user";
import Profile from "../screens/Profile";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { View, StyleSheet,StatusBar } from "react-native";

const Tab = createBottomTabNavigator();

export default function AuthStack() {
  return (
    
    <Tab.Navigator
      initialRouteName="Acceuil"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Acceuil") {
            iconName = focused ? (
              <View style={styles.focusedIcon}>
                <Entypo name="home" size={size} color={color} />
              </View>
            ) : (
              <Entypo name="home" size={size} color={color} />
            );
          } else if (route.name === "Profile") {
            iconName = focused ? (
              <View style={styles.focusedIcon}>
                <AntDesign name="profile" size={size} color={color} />
              </View>
            ) : (
              <AntDesign name="profile" size={size} color={color} />
            );
          }

          return iconName;
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "black",
      })}
    >
      
      <Tab.Screen
        name="Acceuil"
        component={UserStack}
        options={{
          tabBarLabel: "Acceuil",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  focusedIcon: {
    display: "flex",
    flexDirection: "row",
    borderWidth: 2,
    borderRadius: 30,
    backgroundColor: "aqua",
    width: 70,
    alignItems: "center",
    justifyContent: "center",
  },
});
