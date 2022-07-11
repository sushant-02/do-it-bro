import { useEffect, useState } from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";
import { Button } from "@rneui/themed";

import DateTimeInput from "./DateTimeInput";
import handleError from "../utils/handleError";
import { verifyDateTime } from "../utils/commonUtils";

import useStore from "../store";

interface ViewTaskProps {
  dateDisabled: boolean;
}

const ViewTask: React.FC<ViewTaskProps> = ({ dateDisabled }) => {
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
    <View style={styles.container}>
      <Text>Task Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 17,
    fontWeight: "500",
    marginBottom: 8,
  },
  dateTimeInputContainer: {
    marginBottom: 20,
  },
  addTaskButtonContainer: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addTaskButton: {
    backgroundColor: "#5872EB",
    width: "100%",
    borderRadius: 10,
    paddingVertical: 9,
    paddingHorizontal: 30,
  },
});

export default ViewTask;
