import { useEffect, useRef } from "react";
import {
  View,
  Text,
  Easing,
  Animated,
  StyleSheet,
  TextInput,
} from "react-native";

import Svg, { G, Circle } from "react-native-svg";

interface DonutProps {
  completed: number;
  radius: number;
  strokeWidth: number;
  duration: number;
  color: string;
  textColor: string;
  max: number;
  fontWeight: any;
}

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const Donut: React.FC<DonutProps> = ({
  completed = 3,
  radius = 45,
  strokeWidth = 10,
  duration = 500,
  color = "#69CEF8",
  textColor = "#fff",
  max = 18,
  fontWeight = "500",
}) => {
  const animated = useRef(new Animated.Value(0)).current;
  const circleRef = useRef<any>();
  const inputRef = useRef<any>();
  const circumference = 2 * Math.PI * radius;
  const halfCircle = radius + strokeWidth;

  const animation = (toValue: number) => {
    return Animated.timing(animated, {
      toValue,
      duration,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  useEffect(() => {
    animation(completed);
    animated.addListener((v) => {
      if (inputRef?.current) {
        inputRef.current.setNativeProps({
          text: `${Math.round((100 * v.value) / max)}%`,
        });
      }
      if (circleRef?.current) {
        const maxPerc = (100 * v.value) / max;
        const strokeDashoffset =
          circumference - (circumference * maxPerc) / 100;
        circleRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
    });

    return () => {
      animated.removeAllListeners();
    };
  }, [max, completed]);

  return (
    <View style={{ width: radius * 2, height: radius * 2 }}>
      <Svg
        height={radius * 2}
        width={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
      >
        <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            ref={circleRef}
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDashoffset={circumference}
            strokeDasharray={circumference}
          />
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
            strokeOpacity=".1"
          />
        </G>
      </Svg>
      <AnimatedTextInput
        ref={inputRef}
        underlineColorAndroid="transparent"
        editable={false}
        defaultValue="0"
        style={[
          StyleSheet.absoluteFillObject,
          {
            fontSize: radius / 2,
            color: textColor ?? color,
            fontWeight: fontWeight,
            textAlign: "center",
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Donut;
