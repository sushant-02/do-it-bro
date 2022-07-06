import { setStatusBarBackgroundColor } from "expo-status-bar";
import { StyleSheet, Text, ScrollView, View, FlatList } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

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
}

export default function HomeScreen() {
  setStatusBarBackgroundColor("#EFF0F3", false);
  const tabBarHeight = useBottomTabBarHeight();

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
    {
      title: "Design App",
      totalTasks: 24,
      completedTasks: 10,
    },
    {
      title: "Document",
      totalTasks: 13,
      completedTasks: 8,
    },
    {
      title: "Design App",
      totalTasks: 9,
      completedTasks: 8,
    },
    {
      title: "Document",
      totalTasks: 38,
      completedTasks: 4,
    },
    {
      title: "Design App",
      totalTasks: 14,
      completedTasks: 7,
    },
  ];

  const renderTasks = ({ item }: { item: TaskItemType }) => {
    return <TaskCard title={item.title} status={item.status} />;
  };

  const renderProjects = ({ item }: { item: ProjectsItemType }) => {
    return (
      <ProjectCard
        title={item.title}
        totalTasks={item.totalTasks}
        completedTasks={item.completedTasks}
      />
    );
  };

  return (
    <ScrollView style={[styles.container, { marginBottom: tabBarHeight }]}>
      <Text style={styles.todayDate}>Sunday, 4 July 2022</Text>
      <Text style={styles.username}>Hey, Sushant!</Text>

      <Text style={styles.heading}>In Progress</Text>
      <FlatList horizontal={true} data={projects} renderItem={renderProjects} />

      <Text style={styles.heading}>Today's Tasks</Text>
      <FlatList data={tasks} renderItem={renderTasks} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  todayDate: {
    fontSize: 16,
    color: "#636363",
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
});
