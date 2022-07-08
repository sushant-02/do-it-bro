import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";

import { bottomTabs } from "./bottomTabs";

import StartScreen from "../screens/StartScreen";
import OTPScreen from "../screens/OTPScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="Onboarding" component={StartScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} /> */}
      <Stack.Screen name="Root" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        // headerShown: false,
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
      {bottomTabs.map((tab, index) => {
        return (
          <BottomTab.Screen
            key={index}
            name={tab.name}
            component={tab.component}
            options={{
              title: tab.title,
              tabBarIcon: ({ color }) => tab.icon(color),
              headerShown: !tab.hideHeader,
            }}
          />
        );
      })}
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

// <BottomTab.Screen
// 	name='Home'
// 	component={HomeScreen}
// 	options={{
// 		title: 'Home',
// 		tabBarIcon: ({ color }) => (
// 			<TabBarIconFontAwesome5 name='home' color={color} />
// 		),
// 	}}
// />
// <BottomTab.Screen
// 	name='DailyTasks'
// 	component={DailyTasksScreen}
// 	options={{
// 		title: 'Daily Tasks',
// 		tabBarIcon: ({ color }) => (
// 			<TabBarIconFontAwesome5 name='tasks' color={color} />
// 		),
// 	}}
// />
// <BottomTab.Screen
// 	name='Projects'
// 	component={ProjectsScreen}
// 	options={{
// 		title: 'Projects',
// 		tabBarIcon: ({ color }) => (
// 			<TabBarIconFoundation name='page-multiple' color={color} />
// 		),
// 	}}
// />
// <BottomTab.Screen
// 	name='Profile'
// 	component={ProfileScreen}
// 	options={{
// 		title: 'Profile',
// 		tabBarIcon: ({ color }) => (
// 			<TabBarIconFontAwesome5 name='user-alt' color={color} />
// 		),
// 	}}
// />
