import { IconSymbol, type IconSymbolName } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import {
  type StyleProp,
  StyleSheet,
  TextInput,
  type TextInputProps,
  TouchableOpacity,
  View,
  type ViewStyle,
} from "react-native";

type InputProps = TextInputProps & {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  clearIconName?: IconSymbolName;
  containerStyle?: StyleProp<ViewStyle>;
};

export const Input = ({
  value,
  onClear,
  clearIconName = "xmark",
  style,
  containerStyle,
  ...rest
}: InputProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        value={value}
        style={[styles.textInput, style]}
        placeholderTextColor={Colors.icon}
        {...rest}
      />
      {!!onClear && value !== "" && (
        <TouchableOpacity onPress={onClear} style={styles.clearButton}>
          <IconSymbol name={clearIconName} size={24} color={Colors.icon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  textInput: {
    flex: 1,
    color: "#111827",
    padding: 16,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
  },
  clearButton: {
    position: "absolute",
    right: 16,
    top: 16,
  },
});
