import AsyncStorage from "@react-native-async-storage/async-storage";

export const capitalize = (name: string) => {
  if (name) return name[0].toUpperCase() + name.slice(1);
};

export const splitName = (name: string) => {
  return (
    capitalize(name?.split(" ")[0]) + " " + capitalize(name?.split(" ")[1])
  );
};

export const loadTokensToState = async () => {
  const tokens = await AsyncStorage.getItem("@tokens");
  if (tokens !== null) {
    const tokensParsed = JSON.parse(tokens);
    return new Promise((resolve, _reject) => resolve([tokensParsed, null]));
  } else {
    // To take user to Onboarding screen
    await AsyncStorage.clear();
    return new Promise((resolve, _reject) =>
      resolve([null, "No token found! Taking to onboarding screen"])
    );
  }
};
