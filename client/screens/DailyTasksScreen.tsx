import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

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
  const [addTaskOpen, setAddTaskOpen] = useState(false);
  const navigation = useNavigation();
  const tabBarHeight = useBottomTabBarHeight();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["50%", "100%"], []);

  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);

  const handleSnapPress = useCallback((index) => {
    bottomSheetRef.current?.snapToIndex(index);
    setAddTaskOpen(true);
  }, []);

  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

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
      <TouchableOpacity activeOpacity={0.7} onPress={() => handleSnapPress(0)}>
        <View style={styles.addButton}>
          <IconEntypo name="plus" size={30} color="white" />
        </View>
      </TouchableOpacity>
      <BottomSheet
        index={-1}
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
        onClose={() => setAddTaskOpen(false)}
        enablePanDownToClose
        detached
      >
        <BottomSheetView>
          <AddTask />
        </BottomSheetView>
      </BottomSheet>
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
