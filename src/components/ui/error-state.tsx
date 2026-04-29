import { Colors } from "@/constants/theme";
import { getErrorMessage, isRetryableError } from "@/lib/errors";
import { Pressable, StyleSheet, View, type ViewProps } from "react-native";
import { ThemedText, type ThemedTextProps } from "../themed-text";
import { ThemedView } from "../themed-view";

type ErrorStateProps = ViewProps & {
  error?: unknown;
  onRetry?: () => void;
  message?: string;
  compact?: boolean;
};

type ErrorStateIconProps = {
  emoji?: string;
};

type ErrorStateTitleProps = ThemedTextProps;

type ErrorStateMessageProps = ThemedTextProps;

type ErrorStateRetryButtonProps = {
  onPress?: () => void;
  label?: string;
};

type CompoundErrorState = React.FC<ErrorStateProps> & {
  Icon: React.FC<ErrorStateIconProps>;
  Title: React.FC<ErrorStateTitleProps>;
  Message: React.FC<ErrorStateMessageProps>;
  RetryButton: React.FC<ErrorStateRetryButtonProps>;
};

const ErrorStateIcon = ({ emoji = "😕" }: ErrorStateIconProps) => (
  <ThemedText style={styles.icon}>{emoji}</ThemedText>
);

const ErrorStateTitle = ({
  children,
  style,
  ...rest
}: ErrorStateTitleProps) => (
  <ThemedText type="subtitle" style={[styles.title, style]} {...rest}>
    {children}
  </ThemedText>
);

const ErrorStateMessage = ({
  children,
  style,
  ...rest
}: ErrorStateMessageProps) => (
  <ThemedText type="muted" style={[styles.message, style]} {...rest}>
    {children}
  </ThemedText>
);

const ErrorStateRetryButton = ({
  onPress,
  label = "Try Again",
}: ErrorStateRetryButtonProps) => (
  <Pressable style={styles.button} onPress={onPress}>
    <ThemedText style={styles.buttonText}>{label}</ThemedText>
  </Pressable>
);

const ErrorStateComponent = ({
  error,
  onRetry,
  message,
  compact = false,
  children,
  style,
  ...rest
}: ErrorStateProps) => {
  const errorMessage =
    message ?? (error ? getErrorMessage(error) : "Something went wrong");
  const canRetry = error ? isRetryableError(error) : false;

  // Compound pattern: si hay children, usarlos
  if (children) {
    return (
      <ThemedView style={[styles.container, style]} {...rest}>
        <View style={styles.content}>{children}</View>
      </ThemedView>
    );
  }

  // Default compact mode
  if (compact) {
    return (
      <View style={[styles.compactContainer, style]} {...rest}>
        <ThemedText type="muted" style={styles.compactMessage}>
          {errorMessage}
        </ThemedText>
        {onRetry && canRetry && (
          <Pressable onPress={onRetry} style={styles.compactRetry}>
            <ThemedText style={styles.retryText}>Retry</ThemedText>
          </Pressable>
        )}
      </View>
    );
  }

  // Default full mode
  return (
    <ThemedView style={[styles.container, style]} {...rest}>
      <View style={styles.content}>
        <ErrorStateIcon />
        <ErrorStateTitle>Oops!</ErrorStateTitle>
        <ErrorStateMessage>{errorMessage}</ErrorStateMessage>
        {onRetry && canRetry && <ErrorStateRetryButton onPress={onRetry} />}
      </View>
    </ThemedView>
  );
};

const ErrorState = ErrorStateComponent as CompoundErrorState;

ErrorState.Icon = ErrorStateIcon;
ErrorState.Title = ErrorStateTitle;
ErrorState.Message = ErrorStateMessage;
ErrorState.RetryButton = ErrorStateRetryButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    alignItems: "center",
    maxWidth: 280,
  },
  icon: {
    fontSize: 48,
    lineHeight: 64,
  },
  title: {
    textAlign: "center",
  },
  message: {
    textAlign: "center",
  },
  button: {
    backgroundColor: Colors.tint,
    paddingHorizontal: 24,
    borderRadius: 8,
    paddingVertical: 12,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
  compactContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  compactMessage: {
    fontSize: 14,
  },
  compactRetry: {
    paddingHorizontal: 12,
    backgroundColor: Colors.tint,
    borderRadius: 4,
    paddingVertical: 6,
  },
  retryText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
});

export { ErrorState };
