import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { CheckBox } from "@rneui/themed";

import { TaskItemType } from "../types";
import { statusColors } from "../constants/statusColor";
import { camelCaseToTitleCase, formatDateTime } from "../utils/commonUtils";

interface TaskCardProps {
  task: TaskItemType;
  handleShowTaskSnapPress?: (index: any) => void;
  setSelectedTask?: React.Dispatch<React.SetStateAction<any>>;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  handleShowTaskSnapPress,
  setSelectedTask,
}) => {
  const [checked, setChecked] = useState(false);

  const startTimeDateObject = new Date(
    `${task?.start_date}T${task?.start_time}`
  );
  const dueTimeDateObject = new Date(`${task?.due_date}T${task?.due_time}`);

  return (
    <>
      {task && (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.container}
          onPress={() => {
            if (handleShowTaskSnapPress) handleShowTaskSnapPress(0);
            if (setSelectedTask) setSelectedTask(task);
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <CheckBox
              iconType="material-community"
              checkedIcon="checkbox-marked-circle"
              uncheckedIcon="checkbox-blank-circle-outline"
              checkedColor="#59C2C4"
              checked={checked}
              onPress={() => {
                setChecked(!checked);
              }}
              size={24}
              containerStyle={styles.checkBoxStyle}
            />
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.title}>{task?.title}</Text>
            <Text style={styles.date}>
              {formatDateTime(startTimeDateObject, "hh:mm A")} -{" "}
              {formatDateTime(dueTimeDateObject, "hh:mm A")}
            </Text>
          </View>
          <View>
            <Text style={[styles.status, statusColors[task?.status]]}>
              {camelCaseToTitleCase(task?.status)}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginVertical: 8,
    paddingRight: 18,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
  },
  title: {
    fontSize: 18,
    fontWeight: "400",
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: "#636363",
  },
  checkBoxStyle: {
    width: "100%",
    flex: 1,
    padding: 0,
    paddingLeft: 5,
    paddingRight: 5,
    margin: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  detailContainer: {
    maxWidth: "80%",
    flex: 1,
    marginVertical: 8,
  },
  status: {
    padding: 5,
    paddingHorizontal: 7,
    borderRadius: 10,
    textTransform: "capitalize",
  },
});

export default TaskCard;
