import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

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

export const formatDateTime = (date: Date, formatString: string) => {
  return moment(date).format(formatString);
};

export const verifyDateTime = (
  beginDate: Date,
  endDate: Date,
  beginTime: Date,
  endTime: Date
) => {
  if (endDate < beginDate) return [false, "invalid-date"];

  if (endTime <= beginTime) return [false, "invalid-time"];

  return [true, "all-good"];
};

export const camelCaseToTitleCase = (text: string) => {
  const result = text.replace(/([A-Z])/g, " $1");
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
};
