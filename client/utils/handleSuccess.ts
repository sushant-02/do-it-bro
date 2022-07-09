import { showMessage } from "react-native-flash-message";

export default function (message: string, safeAreaHeight: number) {
  showMessage({
    message: message || "Success!",
    type: "success",
    position: { top: safeAreaHeight },
  });
}
