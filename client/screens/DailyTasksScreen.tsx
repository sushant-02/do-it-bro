import { useCallback, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import BottomSheet from "@gorhom/bottom-sheet";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";

import CustomBottomSheet from "../components/CustomBottomSheet";
import TaskCard from "../components/TaskCard";
import AddTask from "../components/AddTask";
import ViewTask from "../components/ViewTask";

import { TaskItemType } from "../types";
import useStore from "../store";

function IconEntypo(props: {
  name: React.ComponentProps<typeof Entypo>["name"];
  size: number;
  color: string;
}) {
  return <Entypo {...props} />;
}

export default function DailyTasksScreen() {
  const [fontLoaded, error] = useFonts({
    Poppins_400Regular,
  });

  const [selectedTask, setSelectedTask] = useState<TaskItemType>(null);

  const dailyTasks = useStore((state) => state.dailyTasks);

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
        handleShowTaskSnapPress={handleShowTaskSnapPress}
        setSelectedTask={setSelectedTask}
      />
    );
  };

  return (
    <View style={[styles.container, { marginBottom: tabBarHeight }]}>
      {dailyTasks?.length > 0 ? (
        <>
          <FlatList
            data={dailyTasks}
            renderItem={renderTasks}
            showsVerticalScrollIndicator={false}
          />
        </>
      ) : (
        <View style={styles.zeroStateContainer}>
          <Image
            source={require("../assets/daily-tasks-zero-state.png")}
            style={styles.zeroStateImage}
          />
          {fontLoaded && (
            <Text
              style={[
                styles.zeroStateText,
                { fontFamily: "Poppins_400Regular" },
              ]}
            >
              Start your day by adding a task
            </Text>
          )}
        </View>
      )}

      <CustomBottomSheet bottomSheetRef={addTaskRef} title="Add Task">
        <AddTask dateDisabled={true} />
      </CustomBottomSheet>

      <CustomBottomSheet bottomSheetRef={showTaskRef} title="Task">
        <ViewTask task={selectedTask} />
      </CustomBottomSheet>

      <TouchableOpacity
        style={styles.addButton}
        activeOpacity={0.7}
        onPress={() => handleAddTaskSnapPress(0)}
      >
        <IconEntypo name="plus" size={30} color="white" />
      </TouchableOpacity>
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
    position: "absolute",
    width: 50,
    height: 50,
    bottom: 15,
    right: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    elevation: 5,
  },
  zeroStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  zeroStateImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  zeroStateText: {
    marginTop: 20,
    fontSize: 15,
    textAlign: "center",
  },
});
