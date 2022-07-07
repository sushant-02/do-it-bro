import { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  Animated,
  Dimensions,
} from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import { AntDesign } from "@expo/vector-icons";
import { Input, Button } from "@rneui/themed";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { validate } from "../../constants/validators";

const { width } = Dimensions.get("window");

interface NextButtonProps {
  percentage: number;
  scrollTo: () => void;
  showEmailForm: boolean;
}

const size = 100;
const strokeWidth = 2;
const center = size / 2;
const radius = size / 2 - strokeWidth / 2;
const circumference = 2 * Math.PI * radius;

const NextButton: React.FC<NextButtonProps> = ({
  percentage,
  scrollTo,
  showEmailForm,
}) => {
  const [email, setEmail] = useState<any>("");
  const [errorMessage, setErrorMessage] = useState<any>("");

  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef<any>(null);
  const scrollViewRef = useRef<any>(null);
  const inputRef = useRef<any>(null);

  const navigation = useNavigation();

  const animation = (toValue: number) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    animation(percentage);
  }, [percentage]);

  useEffect(() => {
    progressAnimation.addListener((value) => {
      const strokeDashoffset =
        circumference - (circumference * value.value) / 100;

      if (progressRef?.current) {
        progressRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
    });

    return () => {
      progressAnimation.removeAllListeners();
    };
  }, [percentage]);

  if (showEmailForm) {
    scrollViewRef?.current?.scrollToEnd({ animated: true });
  }

  const onFormSubmit = () => {
    // if (!validate(email)) {
    //   if (inputRef.current) {
    //     inputRef.current.shake();
    //     setErrorMessage("Please enter a valid email.");
    //   } else {
    //     alert("Please enter a valid email.");
    //   }
    //   return;
    // }
    // setErrorMessage("");

    navigation.reset({
      index: 0,
      routes: [{ name: "Root" }],
    });
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      contentContainerStyle={styles.container}
      snapToInterval={width}
      decelerationRate={"fast"}
      scrollEnabled={false}
      horizontal
    >
      <View style={styles.nextButtoncontainer}>
        <Svg width={size} height={size}>
          <G rotation="-90" origin={center}>
            <Circle
              stroke="#E6E7E8"
              cx={center}
              cy={center}
              r={radius}
              strokeWidth={strokeWidth}
            />
            <Circle
              ref={progressRef}
              stroke="#F4338F"
              cx={center}
              cy={center}
              r={radius}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
            />
          </G>
        </Svg>
        <TouchableOpacity
          onPress={scrollTo}
          style={styles.nextButton}
          activeOpacity={0.6}
        >
          <AntDesign name="arrowright" size={32} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.emailContainer}>
        <Input
          ref={inputRef}
          containerStyle={{
            width: "80%",
          }}
          placeholder="Enter your email"
          style={{ fontSize: 15 }}
          leftIcon={<Entypo name="email" size={20} color="black" />}
          leftIconContainerStyle={{ marginRight: 10 }}
          defaultValue={email}
          onChangeText={(newVal) => setEmail(newVal)}
          errorMessage={errorMessage}
          keyboardType={"email-address"}
        />
        <Button
          containerStyle={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
          title="Get OTP"
          titleStyle={{ fontSize: 15 }}
          buttonStyle={{
            width: "75%",
            backgroundColor: "#4756DF",
            borderRadius: 5,
          }}
          onPress={onFormSubmit}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  nextButtoncontainer: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  nextButton: {
    position: "absolute",
    backgroundColor: "#f4338f",
    borderRadius: 100,
    padding: 15,
  },
  emailContainer: {
    width: width,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});

export default NextButton;
