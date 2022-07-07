import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5, Foundation } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";

import HomeScreen from "../screens/HomeScreen";
import DailyTasksScreen from "../screens/DailyTasksScreen";
import ProjectsScreen from "../screens/ProjectsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import StartScreen from "../screens/StartScreen";

function TabBarIconFontAwesome5(props: {
  name: React.ComponentProps<typeof FontAwesome5>["name"];
  color: string;
}) {
  return <FontAwesome5 size={24} style={{ marginBottom: -3 }} {...props} />;
}

function TabBarIconFoundation(props: {
  name: React.ComponentProps<typeof Foundation>["name"];
  color: string;
}) {
  return <Foundation size={24} style={{ marginBottom: -3 }} {...props} />;
}

const Stack = createNativeStackNavigator<RootStackParamList>();
function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Onboarding"
        component={StartScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();
function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          height: 65,
          paddingHorizontal: 5,
          paddingTop: 10,
          paddingBottom: 10,
          borderRadius: 30,
          elevation: 10,
          backgroundColor: "#fff",
        },
      }}
      sceneContainerStyle={{
        backgroundColor: "#EFF0F3",
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <TabBarIconFontAwesome5 name="home" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="DailyTasks"
        component={DailyTasksScreen}
        options={{
          title: "Daily Tasks",
          tabBarIcon: ({ color }) => (
            <TabBarIconFontAwesome5 name="tasks" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Projects"
        component={ProjectsScreen}
        options={{
          title: "Projects",
          tabBarIcon: ({ color }) => (
            <TabBarIconFoundation name="page-multiple" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <TabBarIconFontAwesome5 name="user-alt" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
