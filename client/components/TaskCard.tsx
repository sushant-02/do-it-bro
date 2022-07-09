import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextStyle,
} from "react-native";
import { CheckBox } from "@rneui/themed";

import { statusColors } from "../constants/statusColor";

interface TaskCardProps {
  title: string;
  status: "complete" | "due" | "inProgress" | "todo";
}

const camelCaseToTitleCase = (text: string) => {
  const result = text.replace(/([A-Z])/g, " $1");
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
};

const TaskCard: React.FC<TaskCardProps> = ({ title, status }) => {
  const [checked, setChecked] = useState(false);

  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.container}>
      <View style={{ justifyContent: "center" }}>
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
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>9:00 AM - 10:30 PM</Text>
      </View>
      <View>
        <Text style={[styles.status, statusColors[status]]}>
          {camelCaseToTitleCase(status)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    // height: 50,
    marginVertical: 8,
    paddingRight: 18,
    paddingLeft: 5,
    paddingVertical: 12,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
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
    padding: 0,
    paddingRight: 2,
    margin: 0,
  },
  detailContainer: {
    maxWidth: "80%",
    flex: 1,
  },
  status: {
    padding: 5,
    paddingHorizontal: 7,
    borderRadius: 10,
    textTransform: "capitalize",
  },
});

export default TaskCard;
