import { StyleSheet, Text, View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_900Black,
} from "@expo-google-fonts/poppins";

const OTPScreen = () => {
  const [fontLoaded, error] = useFonts({
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_900Black,
  });

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
          A 6 digit code has been sent to{" "}
          <Text style={styles.email}>ajinkya.deshpande0000@gmail.com</Text>
        </Text>
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
    flex: 0.5,
    justifyContent: "center",
    width: "60%",
    resizeMode: "contain",
  },
  textContainer: {
    width: "80%",
    justifyContent: "space-between",
    textAlign: "center",
  },
  otpHeading: {
    fontSize: 30,
    fontWeight: "800",
    fontFamily: "Poppins_900Black",
  },
  helpText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
  },
  email: {
    fontStyle: "italic",
    fontFamily: "Poppins_400Regular_Italic",
  },
});
