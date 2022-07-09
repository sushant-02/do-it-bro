import { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import DatePicker from "react-native-date-picker";

const AddTask = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <View>
      <Text>What's the task</Text>
      <Text>Start Date</Text>
      <Button title="Open" onPress={() => setOpen(true)} />
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <Text>Due Date</Text>
      <Text>Start Time</Text>
      <Text>End Time</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default AddTask;
