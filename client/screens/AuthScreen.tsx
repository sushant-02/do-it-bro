import { StyleSheet, Text, View } from "react-native";

export default function AuthScreen() {
  return (
    <View style={styles.container}>
      <Text>Auth Screen it is</Text>
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
