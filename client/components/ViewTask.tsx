import { useEffect, useState } from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";
import { Input, Button } from "@rneui/themed";

import DateTimeInput from "./DateTimeInput";
import handleError from "../utils/handleError";
import { verifyDateTime, camelCaseToTitleCase } from "../utils/commonUtils";
import { statusColors } from "../constants/statusColor";

import useStore from "../store";
import { TaskItemType } from "../types";

interface ViewTaskProps {
  task: TaskItemType;
}

const ViewTask: React.FC<ViewTaskProps> = ({ task }) => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [dueTime, setDueTime] = useState(new Date());
  const [errorMessage, setErrorMessage] = useState<string>("");

  const safeAreaHeight = useStore((state) => state.safeAreaHeight);

  const onTaskEdit = () => {
    if (!title.trim().length) {
      setErrorMessage("Task can't be empty");
      setTitle("");
      return;
    }
    setErrorMessage("");
    const [isValid, error] = verifyDateTime(
      startDate,
      dueDate,
      startTime,
      dueTime
    );
    if (!isValid) {
      let errorMsg =
        error === "invalid-date"
          ? "Start date can't be greater than due date."
          : error === "invalid-time"
          ? "Due time must be greater than start time."
          : "";
      handleError(null, errorMsg, safeAreaHeight);
      return;
    }
  };

  return (
    <>
      {task && (
        <View style={styles.container}>
          <View style={styles.statusContainer}>
            <Text style={[styles.status, statusColors[task?.status]]}>
              {camelCaseToTitleCase(task?.status)}
            </Text>
          </View>
          <Text style={styles.task}>{task?.title}</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  task: {
    fontSize: 17,
  },
  statusContainer: {
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  status: {
    padding: 5,
    paddingHorizontal: 7,
    borderRadius: 10,
    textTransform: "capitalize",
  },
});

export default ViewTask;
