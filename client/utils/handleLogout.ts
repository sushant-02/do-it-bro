import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function handleLogout(navigate: any) {
  await AsyncStorage.clear();
  navigate();
}
