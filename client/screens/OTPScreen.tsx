import { useState } from "react";
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
import { OTP } from "react-native-otp-form";
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

  const navigation = useNavigation();

  const onSubmit = async () => {
    if (otpValue.length !== 6) return;

    try {
      const response = await doItBroAPI.post("verify-otp/", {
        email,
        otp: otpValue,
      });
      console.log(response.data);
      navigation.reset({
        index: 0,
        routes: [{ name: "Root" }],
      });
    } catch (error: any) {
      alert("Login Failed!");
      console.log(error.response);
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
          onTyping={(otp: string) => setOtpValue(otp)}
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
