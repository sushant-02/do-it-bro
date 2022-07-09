import { useState, useRef } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Input, Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import { StatusBar } from "expo-status-bar";

import { validate } from "../../constants/validators";
import useStore from "../../store";

const { width } = Dimensions.get("window");

interface GetOTPButtonProps {
  fromLoginScreen?: boolean;
  showOTPInput?: () => void;
}

const GetOTPButton: React.FC<GetOTPButtonProps> = ({
  fromLoginScreen,
  showOTPInput,
}) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { email, setEmail, sendOTP, otpLoading } = useStore();

  const inputRef = useRef<any>(null);

  const navigation = useNavigation();

  const [fontLoaded] = useFonts({ Poppins_400Regular });

  const onFormSubmit = () => {
    if (!validate(email)) {
      inputRef?.current.shake();
      setErrorMessage("Please enter a valid email.");
      return;
    }
    setErrorMessage("");

    if (fromLoginScreen) {
      sendOTP(email, showOTPInput);
    } else {
      sendOTP(email, () => {
        navigation.navigate("OTP");
      });
    }
  };

  if (!fontLoaded) {
    return null;
  }

  return (
    <View style={styles.emailContainer}>
      <Input
        ref={inputRef}
        containerStyle={{
          width: "80%",
        }}
        placeholder="Enter your email"
        style={{ fontSize: 15, fontFamily: "Poppins_400Regular" }}
        leftIcon={<Entypo name="email" size={20} color="black" />}
        leftIconContainerStyle={{ marginRight: 10 }}
        defaultValue={email}
        onChangeText={(newVal) => setEmail(newVal)}
        errorMessage={errorMessage}
        errorStyle={{ fontFamily: "Poppins_400Regular" }}
        keyboardType={"email-address"}
        autoCapitalize="none"
      />
      <Button
        containerStyle={styles.getOTPButtonContainer}
        title="Get OTP"
        titleStyle={{ fontSize: 15, fontFamily: "Poppins_400Regular" }}
        buttonStyle={styles.getOTPButton}
        onPress={onFormSubmit}
        loading={otpLoading}
      />
    </View>
  );
};

export default GetOTPButton;

const styles = StyleSheet.create({
  emailContainer: {
    width: width,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  getOTPButtonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  getOTPButton: {
    width: "75%",
    backgroundColor: "#4756DF",
    borderRadius: 5,
  },
});
