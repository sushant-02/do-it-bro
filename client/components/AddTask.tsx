import { useEffect, useState } from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";
import { Button } from "@rneui/themed";

import DateTimeInput from "./DateTimeInput";
import handleError from "../utils/handleError";
import { formatDateTime, verifyDateTime } from "../utils/commonUtils";

import useStore from "../store";
import handleSuccess from "../utils/handleSuccess";

interface AddTaskProps {
  dateDisabled: boolean;
  handleClosePress?: () => void;
}

const initialTaskDetails = {
  title: "",
  startDate: new Date(),
  startTime: new Date(),
  dueDate: new Date(),
  dueTime: new Date(),
};

const AddTask: React.FC<AddTaskProps> = ({
  dateDisabled,
  handleClosePress,
}) => {
  const [taskDetails, setTaskDetails] = useState(initialTaskDetails);

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [addingTask, setAddingTask] = useState<boolean>(false);

  const safeAreaHeight = useStore((state) => state.safeAreaHeight);
  const addDailyTask = useStore((state) => state.addDailyTask);

  const checkErrors = () => {
    if (!taskDetails.title.trim().length) {
      setErrorMessage("Task can't be empty");
      setTaskDetails({ ...taskDetails, title: "" });
      return false;
    }

    setErrorMessage("");
    const [isValid, error] = verifyDateTime(
      taskDetails.startDate,
      taskDetails.dueDate,
      taskDetails.startTime,
      taskDetails.dueTime
    );

    if (!isValid) {
      let errorMsg =
        error === "invalid-date"
          ? "Start date can't be greater than due date."
          : error === "invalid-time"
          ? "Due time must be greater than start time."
          : "";
      handleError(null, errorMsg, safeAreaHeight);
      return false;
    }

    return true;
  };

  const onTaskAdd = async () => {
    if (checkErrors()) {
      const requestData = {
        title: taskDetails.title,
        start_time: formatDateTime(taskDetails.startTime, "hh:mm:ss"),
        due_time: formatDateTime(taskDetails.dueTime, "hh:mm:ss"),
      };

      setAddingTask(true);

      try {
        await addDailyTask(requestData);
        if (handleClosePress) handleClosePress();
        setTaskDetails({ ...initialTaskDetails });
        handleSuccess("Daily Task Added!", safeAreaHeight);
      } catch (err) {
        handleError(null, null, safeAreaHeight);
      } finally {
        setAddingTask(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter task</Text>
      <TextInput
        style={{
          backgroundColor: "#f5f5f5",
          borderRadius: 5,
          paddingVertical: 7,
          paddingHorizontal: 12,
          marginBottom: 5,
          fontSize: 16,
        }}
        placeholder="What's the task"
        defaultValue={taskDetails.title}
        onChangeText={(newVal) =>
          setTaskDetails({ ...taskDetails, title: newVal })
        }
      />
      <Text style={{ color: "#f44336", marginBottom: 10 }}>{errorMessage}</Text>
      <View style={styles.dateTimeInputContainer}>
        <DateTimeInput
          title="Start Date/Time"
          curDate={taskDetails.startDate}
          setCurDate={(startDate: Date) =>
            setTaskDetails({ ...taskDetails, startDate })
          }
          curTime={taskDetails.startTime}
          setCurTime={(startTime: Date) =>
            setTaskDetails({ ...taskDetails, startTime })
          }
          disabled={dateDisabled}
        />
      </View>
      <View style={styles.dateTimeInputContainer}>
        <DateTimeInput
          title="Due Date/Time"
          curDate={taskDetails.dueDate}
          setCurDate={(dueDate: Date) =>
            setTaskDetails({ ...taskDetails, dueDate })
          }
          curTime={taskDetails.dueTime}
          setCurTime={(dueTime: Date) =>
            setTaskDetails({ ...taskDetails, dueTime })
          }
          disabled={dateDisabled}
        />
      </View>

      <Button
        containerStyle={styles.addTaskButtonContainer}
        buttonStyle={styles.addTaskButton}
        title="Add Task"
        onPress={onTaskAdd}
        loading={addingTask}
      />
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

export default AddTask;
