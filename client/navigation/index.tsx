import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const [isAppFirstTimeLoading, setIsAppFirstTimeLoading] = useState<any>(null);

  useEffect(() => {
    const getAppData = async () => {
      const appData = await AsyncStorage.getItem("@viewedOnboarding");
      if (appData === null) setIsAppFirstTimeLoading(true);
      else setIsAppFirstTimeLoading(false);
    };

    getAppData();
  }, []);

  return (
    <>
      {isAppFirstTimeLoading !== null && (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isAppFirstTimeLoading && (
            <Stack.Screen name="Onboarding" component={StartScreen} />
          )}
          <Stack.Screen name="Root" component={BottomTabNavigator} />
          <Stack.Screen name="OTP" component={OTPScreen} />
        </Stack.Navigator>
      )}
    </>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#EFF0F3",
        },
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
