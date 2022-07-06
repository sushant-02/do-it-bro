import { StyleSheet, Text, View } from "react-native";

export default function ProjectsScreen() {
  return (
    <View style={styles.container}>
      <Text>Projects Screen</Text>
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
