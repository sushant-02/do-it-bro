import { useCallback, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import BottomSheet from "@gorhom/bottom-sheet";

import CustomBottomSheet from "../components/CustomBottomSheet";

import TaskCard from "../components/TaskCard";
import AddTask from "../components/AddTask";
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
  const [selectedTask, setSelectedTask] = useState(null);
  const tabBarHeight = useBottomTabBarHeight();
  const addTaskRef = useRef<BottomSheet>(null);
  const showTaskRef = useRef<BottomSheet>(null);

  const handleAddTaskSnapPress = useCallback((index) => {
    addTaskRef.current?.snapToIndex(index);
  }, []);

  const handleShowTaskSnapPress = useCallback((index) => {
    showTaskRef.current?.snapToIndex(index);
  }, []);

  const renderTasks = ({ item }: { item: TaskItemType }) => {
    return (
      <TaskCard
        task={item}
        title={item.title}
        status={item.status}
        handleShowTaskSnapPress={handleShowTaskSnapPress}
        setSelectedTask={setSelectedTask}
      />
    );
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
        onPress={() => handleAddTaskSnapPress(0)}
      >
        <View style={styles.addButton}>
          <IconEntypo name="plus" size={30} color="white" />
        </View>
      </TouchableOpacity>
      <CustomBottomSheet bottomSheetRef={addTaskRef} title="Add Task">
        <AddTask dateDisabled={true} />
      </CustomBottomSheet>
      <CustomBottomSheet bottomSheetRef={showTaskRef} title="Title Task">
        <Text>Sushant Pandey</Text>
      </CustomBottomSheet>
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
