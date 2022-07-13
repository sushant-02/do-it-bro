import { useEffect, useState } from "react";
import {
  setStatusBarBackgroundColor,
  setStatusBarStyle,
} from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import DailyProgressCard from "../components/DailyProgressCard";
import ProjectCardOne from "../components/ProjectCardOne";
import TaskCard from "../components/TaskCard";

import { ProjectsItemType, TaskItemType } from "../types";
import { projects } from "../constants/projects";
import { dayNames } from "../constants/dateTime";
import { monthNames } from "../constants/dateTime";

import useStore from "../store";
import PlusCircleDotted from "../utils/svgs/PlusCircleDotted";
import { splitName } from "../utils/commonUtils";
import handleLogout from "../utils/handleLogout";

const { width: windowWidth } = Dimensions.get("window");

SplashScreen.preventAutoHideAsync();

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [time, setTime] = useState<any>(null);
  const [renderContent, setRenderContent] = useState<boolean>(false);

  const setSafeAreaHeight = useStore((state) => state.setSafeAreaHeight);
  const safeAreaHeight = useStore((state) => state.safeAreaHeight);
  const user = useStore((state) => state.user);
  const getUser = useStore((state) => state.getUser);
  const dailyTasks = useStore((state) => state.dailyTasks);
  const getDailyTasks = useStore((state) => state.getDailyTasks);

  const tabBarHeight = useBottomTabBarHeight();

  setStatusBarBackgroundColor("#EFF0F3", false);
  setStatusBarStyle("dark");

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await getUser();
        await getDailyTasks();

        setRenderContent(true);
        await SplashScreen.hideAsync();
      } catch (err) {
        await SplashScreen.hideAsync();
        handleLogout(() => {
          navigation.navigate("LogIn");
        });
      }
    }

    prepare();
  }, []);

  // Set safe area height to a global state
  const insets = useSafeAreaInsets();
  useEffect(() => {
    setSafeAreaHeight(insets.top);
  }, []);

  useEffect(() => {
    let dateObj = new Date();
    setTime({
      day: dayNames[dateObj.getDay()],
      date: dateObj.getDate(),
      month: monthNames[dateObj.getMonth()],
      year: dateObj.getFullYear(),
    });
  }, []);

  const renderTasks = dailyTasks?.map((item: TaskItemType) => {
    return <TaskCard task={item} key={item?.id} />;
  });

  const renderProjects = (item: ProjectsItemType, index: number) => {
    return (
      <View style={{ marginVertical: 8 }} key={index}>
        <ProjectCardOne
          title={item.title}
          totalTasks={item.totalTasks}
          completedTasks={item.completedTasks}
          addButton={item.addButton}
          width={(windowWidth - 2 * 20 - 15) / 2}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {renderContent && (
        <ScrollView style={[styles.container, { marginBottom: tabBarHeight }]}>
          <View style={styles.greeting}>
            {time && (
              <Text style={styles.todayDate}>
                {time.day}, {time.date} {time.month} {time.year}
              </Text>
            )}
            <Text style={styles.username}>
              Hey, {splitName(user?.first_name)}!
            </Text>
          </View>

          <View style={styles.dailyProgressWrapper}>
            <DailyProgressCard totalTasks={24} completedTasks={12} />
          </View>

          <>
            <View style={styles.projectHeader}>
              <Text style={styles.heading}>In Progress</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  navigation.jumpTo("Projects");
                }}
              >
                <Text style={styles.viewAll}>View All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal={true}
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              data={[
                ...projects.slice(0, 2),
                {
                  title: "__ADD_BUTTON__",
                  totalTasks: 0,
                  completedTasks: 0,
                  addButton: true,
                },
              ]}
              renderItem={({ item, index }) => renderProjects(item, index)}
            />
          </>

          <>
            <Text style={styles.heading}>Today's Tasks</Text>
            {dailyTasks?.length > 0 ? (
              renderTasks
            ) : (
              <View
                style={{
                  height: 200,
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <PlusCircleDotted navigation={navigation} />
              </View>
            )}
          </>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  greeting: {
    marginTop: 12,
  },
  todayDate: {
    fontSize: 16,
    color: "#636363",
    marginBottom: 5,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
  },
  dailyProgressWrapper: {
    marginTop: 20,
    marginBottom: 15,
  },
  projectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  viewAll: {
    color: "#636363",
    fontWeight: "500",
  },
});

export default HomeScreen;
