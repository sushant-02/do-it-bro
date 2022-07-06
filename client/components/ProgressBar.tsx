import { useRef, useState, useEffect } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";

interface ProgressBarProps {
  step: number;
  steps: number;
  height: number;
  barColor: string;
  progressColor: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  step,
  steps,
  height,
  barColor,
  progressColor,
}) => {
  const [width, setWidth] = useState(0);
  const animatedValue = useRef(new Animated.Value(-1000)).current;
  const reactive = useRef(new Animated.Value(-1000)).current;
  let percent = (step * 100) / steps;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    reactive.setValue(-width + (width * step) / steps);
  }, [step, width]);

  return (
    <>
      <Text style={styles.percentage}>{percent.toFixed(0)}%</Text>
      <View
        onLayout={(e) => {
          const newWidth = e.nativeEvent.layout.width;
          setWidth(newWidth);
        }}
        style={{
          height,
          backgroundColor: barColor,
          borderRadius: height,
          overflow: "hidden",
        }}
      >
        <Animated.View
          style={{
            height,
            borderRadius: height,
            backgroundColor: progressColor,
            transform: [{ translateX: animatedValue }],
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  bar: {
    width: "100%",
    position: "absolute",
    left: 0,
    top: 0,
  },
  percentage: {
    marginBottom: 5,
    alignSelf: "flex-end",
    fontWeight: "500",
  },
});

export default ProgressBar;
