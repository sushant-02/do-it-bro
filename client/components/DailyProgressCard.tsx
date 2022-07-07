import { View, Text, StyleSheet } from "react-native";

import Donut from "./Donut";

interface DailyProgressCardProps {
  totalTasks: number;
  completedTasks: number;
}

const DailyProgressCard: React.FC<DailyProgressCardProps> = ({
  totalTasks,
  completedTasks,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <Text style={styles.heading}>Your daily plan almost done</Text>
        <Text style={styles.tasks}>
          {completedTasks} of {totalTasks} completed
        </Text>
      </View>
      <View style={styles.donutContainer}>
        <Donut
          completed={completedTasks}
          radius={45}
          strokeWidth={10}
          duration={500}
          color="#69CEF8"
          textColor="#fff"
          max={totalTasks}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#5872EB",
    width: "100%",
    paddingHorizontal: 18,
    paddingVertical: 18,
    borderRadius: 15,
    flexDirection: "row",
    height: 150,
  },
  details: {
    width: "50%",
    justifyContent: "space-evenly",
  },
  heading: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
    lineHeight: 30,
  },
  tasks: {
    color: "#fff",
    opacity: 0.89,
    fontSize: 16,
  },
  donutContainer: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DailyProgressCard;
