import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FlashMessage from "react-native-flash-message";

import Navigation from "./navigation";
import useStore from "./store";
import { loadTokensToState } from "./utils/commonUtils";

export default function App() {
  const setTokens = useStore((state) => state.setTokens);

  useEffect(() => {
    const loadTokens = async () => {
      const [tokens, error]: any = await loadTokensToState();
      if (tokens) setTokens(tokens.refresh, tokens.access);
      else console.log(error);
    };

    loadTokens();
  }, []);

  return (
    <SafeAreaProvider>
      <Navigation />
      <FlashMessage position="top" />
    </SafeAreaProvider>
  );
}
