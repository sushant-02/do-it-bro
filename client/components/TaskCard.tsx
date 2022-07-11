import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextStyle,
} from "react-native";
import { CheckBox } from "@rneui/themed";

import { TaskItemType } from "../types";
import { statusColors } from "../constants/statusColor";

interface TaskCardProps {
  task: TaskItemType;
  title: string;
  status: "complete" | "due" | "inProgress" | "todo";
  handleShowTaskSnapPress?: (index: any) => void;
  setSelectedTask?: React.Dispatch<React.SetStateAction<any>>;
}

const camelCaseToTitleCase = (text: string) => {
  const result = text.replace(/([A-Z])/g, " $1");
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
};

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  title,
  status,
  handleShowTaskSnapPress,
  setSelectedTask,
}) => {
  const [checked, setChecked] = useState(false);

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
            <Text style={styles.date}>9:00 AM - 10:30 PM</Text>
          </View>
          <View>
            <Text style={[styles.status, statusColors[status]]}>
              {camelCaseToTitleCase(status)}
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
