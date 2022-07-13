import { useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_900Black,
} from "@expo-google-fonts/poppins";
// @ts-ignore
import { OTP } from "expo-otp-form-inputs";
import { Button } from "@rneui/themed";

import doItBroAPI from "../api/doItBro";
import useStore from "../store";
import handleError from "../utils/handleError";
import handleSuccess from "../utils/handleSuccess";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OTP_PIN_LENGTH = 6;

const OTPScreen = () => {
  const [fontLoaded, _error] = useFonts({
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_900Black,
  });

  const [otpValue, setOtpValue] = useState<string>("");
  const [submitButtonEnabled, setSubmitButtonEnabled] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const email = useStore((state) => state.email);
  const sendOTP = useStore((state) => state.sendOTP);
  const safeAreaHeight = useStore((state) => state.safeAreaHeight);

  const navigation = useNavigation();

  const handleChange = (otp: string) => {
    setOtpValue(otp);
    setSubmitButtonEnabled(otp.length === OTP_PIN_LENGTH);
  };

  const handleResend = () => {
    sendOTP(email, undefined, () =>
      handleSuccess("OTP Sent Successfully!", safeAreaHeight)
    );
  };

  const onSubmit = async () => {
    if (otpValue.length !== OTP_PIN_LENGTH) return;

    setLoading(true);

    try {
      const { data } = await doItBroAPI.post("verify-otp/", {
        email,
        otp: otpValue,
      });

      await AsyncStorage.multiSet([
        ["@tokens", JSON.stringify(data.tokens)],
        ["@viewedOnboarding", "false"],
      ]);

      navigation.reset({
        index: 0,
        routes: [{ name: "Root" }],
      });
    } catch (err: any) {
      handleError(err, null, safeAreaHeight);
    } finally {
      setLoading(false);
    }
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
        <OTP
          codeCount={6}
          containerStyle={styles.textInputContainer}
          otpStyles={styles.roundedTextInput}
          onTyping={handleChange}
        />
        <Text style={{ textAlign: "center", marginVertical: 20 }}>
          <TouchableOpacity activeOpacity={1}>
            <Text>Didn't receive code?</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} onPress={handleResend}>
            <Text style={{ color: "#2089dc" }}> Request again</Text>
          </TouchableOpacity>
        </Text>
        <Button
          containerStyle={styles.submitOTPButtonContainer}
          title="Submit"
          titleStyle={{ fontSize: 15, fontFamily: "Poppins_400Regular" }}
          buttonStyle={styles.submitOTPButton}
          onPress={onSubmit}
          disabled={!submitButtonEnabled}
          loading={loading}
        />
      </View>
      <StatusBar backgroundColor="#4756DF" animated style="light" />
    </View>
  );
};

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
    borderWidth: 1,
    backgroundColor: "#eee",
    width: 20,
    height: 20,
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

export default OTPScreen;
