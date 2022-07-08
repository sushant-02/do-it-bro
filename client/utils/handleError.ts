import { showMessage } from "react-native-flash-message";

export default function (err: any, safeAreaHeight: number) {
  const errorData = err?.response?.data;

  showMessage({
    message: errorData?.message || "Something went wrong!",
    type: "danger",
    position: { top: safeAreaHeight },
  });
}
