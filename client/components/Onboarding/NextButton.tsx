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
import GetOTPButton from "./GetOTPButton";

const { width } = Dimensions.get("window");
const size = 100;
const strokeWidth = 2;
const center = size / 2;
const radius = size / 2 - strokeWidth / 2;
const circumference = 2 * Math.PI * radius;

interface NextButtonProps {
  percentage: number;
  scrollTo: () => void;
  showEmailForm: boolean;
}

const NextButton: React.FC<NextButtonProps> = ({
  percentage,
  scrollTo,
  showEmailForm,
}) => {
  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef<any>(null);
  const scrollViewRef = useRef<any>(null);

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

  return (
    <ScrollView
      ref={scrollViewRef}
      contentContainerStyle={styles.container}
      snapToInterval={width}
      decelerationRate={"fast"}
      scrollEnabled={false}
      keyboardShouldPersistTaps={"always"}
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
      <GetOTPButton />
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
});

export default NextButton;
