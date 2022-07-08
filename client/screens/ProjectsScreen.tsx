import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";

import TaskCard from "../components/TaskCard";

interface TaskItemType {
  title: string;
  status: "complete" | "due" | "inProgress" | "todo";
}

function IconEntypo(props: {
  name: React.ComponentProps<typeof Entypo>["name"];
  size: number;
  color: string;
}) {
  return <Entypo {...props} />;
}

export default function ProjectsScreen() {
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

  const renderTasks = ({ item }: { item: TaskItemType }) => {
    return <TaskCard title={item.title} status={item.status} />;
  };

  return (
    <View style={[styles.container, { marginBottom: tabBarHeight }]}>
      <Text style={styles.heading}>Projects</Text>
      <FlatList data={tasks} renderItem={renderTasks} />
      <TouchableOpacity activeOpacity={0.7}>
        <View style={styles.addButton}>
          <IconEntypo name="plus" size={30} color="white" />
        </View>
      </TouchableOpacity>
    </View>
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
  addButton: {
    backgroundColor: "#5872EB",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    position: "absolute",
    bottom: 10,
    right: 10,
    elevation: 5,
  },
});
