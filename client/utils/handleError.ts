import { showMessage } from "react-native-flash-message";

export default function (
  serverError: any,
  clientError: string | null,
  safeAreaHeight: number
) {
  const errorData = serverError?.response?.data;

  showMessage({
    message: errorData?.message || clientError || "Something went wrong!",
    type: "danger",
    position: { top: safeAreaHeight },
  });
}
