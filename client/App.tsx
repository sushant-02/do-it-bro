import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import FlashMessage from "react-native-flash-message";

import Navigation from "./navigation";

export default function App() {
  return (
    <SafeAreaProvider>
      {/* <SafeAreaView style={{ flex: 1 }}> */}
      <Navigation />
      <FlashMessage position="top" />
      {/* </SafeAreaView> */}
    </SafeAreaProvider>
  );
}
