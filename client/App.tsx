import { useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import FlashMessage from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Navigation from "./navigation";
import useStore from "./store";

export default function App() {
  const setTokens = useStore((state) => state.setTokens);

  useEffect(() => {
    const loadTokensToState = async () => {
      const tokens = await AsyncStorage.getItem("@tokens");
      if (tokens !== null) {
        const tokensParsed = JSON.parse(tokens);
        setTokens(tokensParsed.refresh, tokensParsed.access);
      } else {
        // Handle Logout
        await AsyncStorage.clear();
      }
    };

    loadTokensToState();
  }, []);

  return (
    <SafeAreaProvider>
      {/* <SafeAreaView style={{ flex: 1 }}> */}
      <Navigation />
      <FlashMessage position="top" />
      {/* </SafeAreaView> */}
    </SafeAreaProvider>
  );
}
