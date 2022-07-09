import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";

import TaskCard from "../components/TaskCard";
import { TaskItemType } from "../types";
import { tasks } from "../constants/tasks";

function IconEntypo(props: {
  name: React.ComponentProps<typeof Entypo>["name"];
  size: number;
  color: string;
}) {
  return <Entypo {...props} />;
}

export default function DailyTasksScreen() {
  const [addTaskOpen, setAddTaskOpen] = useState(false);
  const navigation = useNavigation();
  const tabBarHeight = useBottomTabBarHeight();

  const renderTasks = ({ item }: { item: TaskItemType }) => {
    return <TaskCard title={item.title} status={item.status} />;
  };

  return (
    <View style={[styles.container, { marginBottom: tabBarHeight }]}>
      <FlatList
        data={tasks}
        renderItem={renderTasks}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        // onPress={() => setAddTaskOpen(true)}
        onPress={() => navigation.navigate("AddTask")}
      >
        <View style={styles.addButton}>
          <IconEntypo name="plus" size={30} color="white" />
        </View>
      </TouchableOpacity>
      {/* <Modal
        visible={addTaskOpen}
        animationType="slide"
        onRequestClose={() => setAddTaskOpen(false)}
      >
        <Text>This is Add Task Form</Text>
      </Modal> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
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
