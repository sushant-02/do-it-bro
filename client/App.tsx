import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5, Foundation } from "@expo/vector-icons";

import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "./types";

import HomeScreen from "./screens/HomeScreen";
import DailyTasksScreen from "./screens/DailyTasksScreen";
import ProjectsScreen from "./screens/ProjectsScreen";
import ProfileScreen from "./screens/ProfileScreen";

const BottomTab = createBottomTabNavigator<RootTabParamList>();

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

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
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
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  tabBarStyle: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: "pink",
  },
});

// shadowColor: "#00000059",
// shadowOffset: { width: 0, height: 5 },
// shadowOpacity: 1,
// shadowRadius: 15,

// function BottomTabNavigator() {
//   // const colorScheme = useColorScheme();

//   return (
//     <BottomTab.Navigator initialRouteName="Home">
//       <BottomTab.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{
//           title: "Home",
//           // tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
//         }}
//       />
//       <BottomTab.Screen
//         name="DailyTasks"
//         component={DailyTasksScreen}
//         options={{
//           title: "Daily Tasks",
//           // tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
//         }}
//       />
//       <BottomTab.Screen
//         name="Projects"
//         component={ProjectsScreen}
//         options={{
//           title: "Projects",
//           // tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
//         }}
//       />
//       <BottomTab.Screen
//         name="Profile"
//         component={ProfileScreen}
//         options={{
//           title: "Profile",
//           // tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
//         }}
//       />
//     </BottomTab.Navigator>
//   );
// }
