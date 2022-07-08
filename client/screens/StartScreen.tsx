import { useState, useRef, useEffect } from "react";
import { View, StyleSheet, FlatList, Animated } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Components
import Slide from "../components/Onboarding/Slide";
import Paginator from "../components/Onboarding/Paginator";
import NextButton from "../components/Onboarding/NextButton";

// State
import useStore from "../store";

import { slides } from "../constants/onboardingSlides";

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showEmailForm, setShowEmailForm] = useState<boolean>(false);
  const setSafeAreaHeight = useStore((state) => state.setSafeAreaHeight);

  const slidesRef = useRef<any>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: any }) => {
      setCurrentIndex(viewableItems[0].index);
    }
  ).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  // Set safe area height to a global state
  const insets = useSafeAreaInsets();
  useEffect(() => {
    setSafeAreaHeight(insets.top);
  }, []);

  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      setShowEmailForm(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 8 }}>
        <FlatList
          ref={slidesRef}
          data={slides}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          bounces={false}
          keyExtractor={(item) => String(item.id)}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          scrollEventThrottle={32}
          renderItem={({ item }) => <Slide item={item} />}
        />
      </View>
      <Paginator data={slides} scrollX={scrollX} />
      <View style={{ flex: 3 }}>
        <NextButton
          percentage={(currentIndex + 1) * (100 / slides.length)}
          scrollTo={scrollTo}
          showEmailForm={showEmailForm}
        />
      </View>
      <StatusBar backgroundColor="#faf7f0" animated />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#faf7f0",
  },
});

export default Onboarding;
