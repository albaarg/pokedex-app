import { StyleProp, ViewStyle } from "react-native";
import {
  SafeAreaView,
  type SafeAreaViewProps,
} from "react-native-safe-area-context";
import { ThemedView } from "./themed-view";

type ScreenContainerProps = SafeAreaViewProps & {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const ScreenContainer = ({
  children,
  style,
  edges = ["top", "left", "right"],
  ...rest
}: ScreenContainerProps) => {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={edges} {...rest}>
      <ThemedView style={[{ flex: 1 }, style]}>{children}</ThemedView>
    </SafeAreaView>
  );
};
