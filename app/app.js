import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import Home from "./Screens/Home";
import Profile from "./Screens/Profile";
import Appointments from "./Screens/Appointments";
import BookAppointments from "./Screens/BookAppointments";
import Scheduled from "./Screens/Scheduled";
import Doctors from "./Screens/Doctors";
import Notifis from "./Screens/Notifs";
import DrawerContent from "./Components/DrawerContent";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { PRIMARY } from "./util/colors";
import temp from "./Screens/temp";
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Dashboard = () => {
  return (
    <Drawer.Navigator
      drawerStyle={{ width: 280 }}
      drawerContentOptions={{
        inactiveTintColor: "white",
        activeTintColor: PRIMARY,
      }}
      // drawerType="front"
      initialRouteName="Home"
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        options={{
          title: "Dashboard",
          drawerIcon: ({ focused, size }) => (
            <MaterialIcons
              name="dashboard"
              size={size}
              color={focused ? PRIMARY : "white"}
            />
          ),
        }}
        name="Home"
        component={Home}
      />
      <Drawer.Screen
        options={{
          title: "User Profile",
          drawerIcon: ({ focused, size }) => (
            <MaterialCommunityIcons
              name="account-outline"
              size={size}
              color={focused ? PRIMARY : "white"}
            />
          ),
        }}
        name="Profile"
        component={Profile}
      />
      <Drawer.Screen
        options={{
          title: "Appointments",
          drawerIcon: ({ focused, size }) => (
            <MaterialIcons
              name="assignment"
              size={size}
              color={focused ? PRIMARY : "white"}
            />
          ),
        }}
        name="Appointments"
        component={Appointments}
      />

      <Drawer.Screen
        options={{
          title: "Scheduled",
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="videocam"
              size={size}
              color={focused ? PRIMARY : "white"}
            />
          ),
        }}
        name="Scheduled"
        component={Scheduled}
      />
      <Drawer.Screen
        options={{
          title: "Doctors",
          drawerIcon: ({ focused, size }) => (
            <MaterialIcons
              name="person-search"
              size={size}
              color={focused ? PRIMARY : "white"}
            />
          ),
        }}
        name="Doctors"
        component={Doctors}
      />
      <Drawer.Screen
        options={{
          title: "Notifications",
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="notifications"
              size={size}
              color={focused ? PRIMARY : "white"}
            />
          ),
        }}
        name="temp"
        component={temp}
      />
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
