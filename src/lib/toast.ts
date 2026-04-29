import Toast from "react-native-toast-message";
import { getErrorMessage } from "./errors";

type ToastOptions = {
  duration?: number;
  onPress?: () => void;
};

export const showErrorToast = (
  messageOrError: string | unknown,
  options?: ToastOptions,
) => {
  const message =
    typeof messageOrError === "string"
      ? messageOrError
      : getErrorMessage(messageOrError);

  Toast.show({
    type: "error",
    text1: "Error",
    text2: message,
    visibilityTime: options?.duration ?? 4000,
    onPress: options?.onPress,
    topOffset: 60,
  });
};

export const showSuccessToast = (message: string, options?: ToastOptions) => {
  Toast.show({
    type: "success",
    text1: "Success",
    text2: message,
    visibilityTime: options?.duration ?? 3000,
    onPress: options?.onPress,
    topOffset: 60,
  });
};

export const showInfoToast = (message: string, options?: ToastOptions) => {
  Toast.show({
    type: "info",
    text1: "Info",
    text2: message,
    visibilityTime: options?.duration ?? 3000,
    onPress: options?.onPress,
    topOffset: 60,
  });
};

export const hideToast = () => {
  Toast.hide();
};
