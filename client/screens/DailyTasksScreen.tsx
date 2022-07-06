import { StyleSheet, Text, View } from "react-native";

export default function DailyTasksScreen() {
  return (
    <View style={styles.container}>
      <Text>DailyTasksScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
