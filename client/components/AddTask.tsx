import { useState } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { Input } from "@rneui/themed";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const AddTask = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [taskDetails, setTaskDetails] = useState({
    startDate: new Date(),
    startTime: new Date(),
    dueDate: new Date(),
    dueTime: new Date(),
  });

  const fields = [
    {
      id: "1",
      mode: "date",
      fieldName: "startDate",
    },
    {
      id: "2",
      mode: "time",
      fieldName: "startTime",
    },
    {
      id: "3",
      mode: "date",
      fieldName: "dueDate",
    },
    {
      id: "4",
      mode: "time",
      fieldName: "dueTime",
    },
  ];

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    console.log(typeof date);
    console.log(date.toTimeString());
    setTaskDetails({ ...taskDetails, startDate: date });
    hideDatePicker();
  };

  const renderDateTimeFields = () => {};

  return (
    <View style={styles.container}>
      <Text>Enter task</Text>
      <Input
        containerStyle={{}}
        placeholder="What's the task"
        style={{ fontSize: 15 }}
        defaultValue={title}
        onChangeText={(newVal) => setTitle(newVal)}
      />
      <Text>Start Date</Text>
      <Text>{taskDetails.startDate.toDateString()}</Text>
      <Text>Start Time</Text>
      <Text>{taskDetails.startTime.toTimeString()}</Text>
      <Text>Due Date</Text>
      <Text>Due Time</Text>
      <Button title="Show Date Picker" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        minimumDate={new Date()}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      {/* <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        minimumDate={new Date()}
        onConfirm={(startTime) => setTaskDetails({ ...taskDetails, startTime })}
        onCancel={hideDatePicker}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    // backgroundColor: "pink",
  },
});

export default AddTask;
