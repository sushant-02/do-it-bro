import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextStyle,
} from "react-native";

interface TaskCardProps {
  title: string;
  status: "complete" | "due" | "inProgress" | "todo";
}

const statusColors = {
  complete: {
    backgroundColor: "#DFF5F1",
    color: "#59C2C4",
  },
  todo: {
    backgroundColor: "#E6E8FD",
    color: "#A5AEF6",
  },
  inProgress: {
    backgroundColor: "#FFF8F0",
    color: "#FCCA79",
  },
  due: {
    backgroundColor: "#FEF4F4",
    color: "#E78787",
  },
};

const TaskCard: React.FC<TaskCardProps> = ({ title, status }) => {
  const camelCaseToTitleCase = () => {
    const text = status;
    const result = text.replace(/([A-Z])/g, " $1");
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult;
  };

  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.container}>
      <View style={styles.detailContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>9:00 AM - 10:30 PM</Text>
      </View>
      <View>
        <Text style={[styles.status, statusColors[status]]}>
          {camelCaseToTitleCase()}
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
    paddingHorizontal: 18,
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
  detailContainer: {
    maxWidth: "70%",
  },
  status: {
    padding: 5,
    paddingHorizontal: 7,
    borderRadius: 10,
    textTransform: "capitalize",
  },
});

export default TaskCard;
