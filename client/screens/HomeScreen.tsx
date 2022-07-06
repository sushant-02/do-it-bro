import { useEffect, useState } from "react";
import { setStatusBarBackgroundColor } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import DailyProgressCard from "../components/DailyProgressCard";
import ProjectCard from "../components/ProjectCard";
import TaskCard from "../components/TaskCard";

interface TaskItemType {
  title: string;
  status: "complete" | "due" | "inProgress" | "todo";
}

interface ProjectsItemType {
  title: string;
  totalTasks: number;
  completedTasks: number;
  addButton?: boolean;
}

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function HomeScreen() {
  const [time, setTime] = useState<any>(null);
  setStatusBarBackgroundColor("#EFF0F3", false);
  const tabBarHeight = useBottomTabBarHeight();

  useEffect(() => {
    let dateObj = new Date();
    setTime({
      day: dayNames[dateObj.getDay()],
      date: dateObj.getDate(),
      month: monthNames[dateObj.getMonth()],
      year: dateObj.getFullYear(),
    });
  }, []);

  const tasks: TaskItemType[] = [
    {
      title: "Icon Design",
      status: "complete",
    },
    {
      title: "NFT Dashboard",
      status: "todo",
    },
    {
      title: "Forex Trading",
      status: "inProgress",
    },
    {
      title: "Sleep",
      status: "due",
    },
    {
      title: "Icon Design",
      status: "complete",
    },
    {
      title: "NFT Dashboard",
      status: "todo",
    },
    {
      title: "Forex Trading",
      status: "inProgress",
    },
    {
      title: "Sleep",
      status: "due",
    },
    {
      title: "Icon Design",
      status: "complete",
    },
    {
      title: "NFT Dashboard",
      status: "todo",
    },
    {
      title: "Forex Trading",
      status: "inProgress",
    },
    {
      title: "Sleep",
      status: "due",
    },
    {
      title: "Icon Design",
      status: "complete",
    },
    {
      title: "NFT Dashboard",
      status: "todo",
    },
    {
      title: "Forex Trading",
      status: "inProgress",
    },
    {
      title: "Sleep",
      status: "due",
    },
    {
      title: "Icon Design",
      status: "complete",
    },
    {
      title: "NFT Dashboard",
      status: "todo",
    },
    {
      title: "Forex Trading",
      status: "inProgress",
    },
    {
      title: "Sleep",
      status: "due",
    },
  ];

  const projects: ProjectsItemType[] = [
    {
      title: "Document",
      totalTasks: 10,
      completedTasks: 4,
    },
    // {
    //   title: "Design App",
    //   totalTasks: 24,
    //   completedTasks: 10,
    // },
    // {
    //   title: "Document",
    //   totalTasks: 13,
    //   completedTasks: 8,
    // },
    // {
    //   title: "Design App",
    //   totalTasks: 9,
    //   completedTasks: 8,
    // },
    // {
    //   title: "Document",
    //   totalTasks: 38,
    //   completedTasks: 4,
    // },
    // {
    //   title: "Design App",
    //   totalTasks: 14,
    //   completedTasks: 7,
    // },
  ];

  const renderTasks = ({ item }: { item: TaskItemType }) => {
    return <TaskCard title={item.title} status={item.status} />;
  };

  const renderProjects = (item: ProjectsItemType, index: number) => {
    return (
      <View style={{ marginVertical: 8 }}>
        <ProjectCard
          title={item.title}
          totalTasks={item.totalTasks}
          completedTasks={item.completedTasks}
          addButton={item.addButton}
        />
      </View>
    );
  };

  return (
    <ScrollView style={[styles.container, { marginBottom: tabBarHeight }]}>
      <View style={styles.greeting}>
        {time && (
          <Text style={styles.todayDate}>
            {time.day}, {time.date} {time.month} {time.year}
          </Text>
        )}
        <Text style={styles.username}>Hey, Sushant!</Text>
      </View>

      <View style={styles.dailyProgressWrapper}>
        <DailyProgressCard totalTasks={24} completedTasks={12} />
      </View>

      <>
        <View style={styles.projectHeader}>
          <Text style={styles.heading}>In Progress</Text>
          <TouchableOpacity activeOpacity={0.7}>
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
        <FlatList data={tasks} renderItem={renderTasks} />
      </>
    </ScrollView>
  );
}

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