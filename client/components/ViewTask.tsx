import { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ViewDateTime from "./ViewDateTime";
import { camelCaseToTitleCase, formatDateTime } from "../utils/commonUtils";
import { statusColors } from "../constants/statusColor";

import useStore from "../store";
import { TaskItemType } from "../types";
import { Button } from "@rneui/themed";
import EditTask from "./EditTask";

interface ViewTaskProps {
  task: TaskItemType;
  dateDisabled?: boolean;
}

function TabBarIconIonicons(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={24} {...props} />;
}

const { width } = Dimensions.get("window");

const ViewTask: React.FC<ViewTaskProps> = ({ task }) => {
  const scrollViewRef = useRef<any>(null);
  const safeAreaHeight = useStore((state) => state.safeAreaHeight);

  const disabled = true;

  const startDate = new Date(`${task?.start_date}T${task?.start_time}`);
  const dueDate = new Date(`${task?.due_date}T${task?.due_time}`);

  return (
    <>
      {task && (
        <ScrollView
          ref={scrollViewRef}
          // contentContainerStyle={styles.container}
          snapToInterval={width}
          decelerationRate={"fast"}
          scrollEnabled={false}
          keyboardShouldPersistTaps={"always"}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.container}>
            <View style={styles.statusContainer}>
              <Text style={[styles.status, statusColors[task?.status]]}>
                {camelCaseToTitleCase(task?.status)}
              </Text>
            </View>
            <Text style={styles.task}>{task?.title}</Text>
            <View style={{ marginBottom: 10 }}>
              <ViewDateTime
                task={task}
                title="Start"
                curDate={startDate}
                curTime={startDate}
                disabled={disabled}
              />
            </View>
            <View style={{ marginBottom: 10 }}>
              <ViewDateTime
                task={task}
                title="Due"
                curDate={dueDate}
                curTime={dueDate}
                disabled={disabled}
              />
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Button
                title="Edit Task"
                containerStyle={styles.buttonContainer}
                buttonStyle={[styles.button, styles.edit]}
                onPress={() =>
                  scrollViewRef?.current?.scrollToEnd({ animated: true })
                }
              />
              <Button
                containerStyle={styles.buttonContainer}
                buttonStyle={[styles.button, styles.delete]}
                title="Delete Task"
              />
            </View>
          </View>
          <EditTask
            task={task}
            dateDisabled={disabled}
            scrollViewRef={scrollViewRef}
          />
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    paddingHorizontal: 20,
  },
  task: {
    fontSize: 17,
    marginBottom: 15,
    fontStyle: "italic",
  },
  font15: {
    fontSize: 15,
  },
  statusContainer: {
    alignSelf: "flex-start",
    marginBottom: 15,
  },
  status: {
    padding: 5,
    paddingHorizontal: 7,
    borderRadius: 10,
    textTransform: "capitalize",
  },
  dateTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 7,
    paddingHorizontal: 7,
    borderRadius: 5,
    flex: 1,
  },
  marginRight: {
    marginRight: 7.5,
  },
  marginLeft: {
    marginLeft: 7.5,
  },
  disabledInput: {
    backgroundColor: "#e5e5e5",
  },
  label: {
    fontSize: 17,
    fontWeight: "500",
    marginBottom: 8,
  },
  buttonContainer: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "49%",
  },
  button: {
    width: "100%",
    backgroundColor: "#5872EB",
    borderRadius: 5,
    paddingVertical: 9,
    paddingHorizontal: 30,
  },
  edit: {
    // backgroundColor: "#e6c845",
  },
  delete: {
    backgroundColor: "#eb3f3f",
  },
});

export default ViewTask;
