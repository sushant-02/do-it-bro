import { useRef, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_900Black,
} from "@expo-google-fonts/poppins";
// @ts-ignore
import OTPTextView from "react-native-otp-textinput";
import { Button } from "@rneui/themed";

import doItBroAPI from "../api/doItBro";
import useStore from "../store";

const OTPScreen = () => {
  const [fontLoaded, error] = useFonts({
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_900Black,
  });

  const [otpValue, setOtpValue] = useState<string>("");

  const email = useStore((state) => state.email);

  const otpRef = useRef<any>(null);

  const onSubmit = async () => {
    if (otpValue.length !== 6) return;

    const response = await doItBroAPI.post("verify-otp/", {
      email,
      otp: otpValue,
    });

    console.log(response.data);
  };

  if (!fontLoaded) return null;

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/message-sent.png")}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.otpHeading}>Enter OTP</Text>
        <Text style={styles.helpText}>
          A 6-digit code has been sent to{" "}
          <Text style={styles.email}>{email}</Text>
        </Text>
      </View>
      <View style={styles.otpContainer}>
        <OTPTextView
          ref={otpRef}
          defaultValue={otpValue}
          handleTextChange={setOtpValue}
          inputCount={6}
          containerStyle={styles.textInputContainer}
          textInputStyle={styles.roundedTextInput}
          tintColor="#4756DF"
          // caretHidden={true}
        />
        <Text style={{ textAlign: "center", marginVertical: 20 }}>
          <TouchableOpacity activeOpacity={1}>
            <Text>Didn't receive code?</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
            <Text style={{ color: "#2089dc" }}> Request again</Text>
          </TouchableOpacity>
        </Text>
        <Button
          containerStyle={styles.submitOTPButtonContainer}
          title="Submit"
          titleStyle={{ fontSize: 15, fontFamily: "Poppins_400Regular" }}
          buttonStyle={styles.submitOTPButton}
          onPress={onSubmit}
          // loading={otpLoading}
        />
      </View>
      <StatusBar backgroundColor="#4756DF" animated style="light" />
    </View>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    flex: 0.6,
    justifyContent: "center",
    width: "60%",
    resizeMode: "contain",
  },
  textContainer: {
    width: "80%",
    justifyContent: "space-between",
    textAlign: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  otpHeading: {
    fontSize: 30,
    fontWeight: "800",
    fontFamily: "Poppins_900Black",
  },
  helpText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    textAlign: "center",
  },
  email: {
    fontStyle: "italic",
    fontFamily: "Poppins_400Regular_Italic",
  },
  otpContainer: {
    flex: 0.4,
    justifyContent: "center",
  },
  textInputContainer: {
    // marginVertical: 20,
  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 4,
    width: 40,
    height: 40,
  },
  submitOTPButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  submitOTPButton: {
    width: "70%",
    backgroundColor: "#4756DF",
    borderRadius: 5,
  },
});
