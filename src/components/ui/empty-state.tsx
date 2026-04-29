import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { ThemedText } from "@/components/themed-text";

export type EmptyStateProps = ViewProps & {
  icon?: string;
  title: string;
  message: string;
};

export const EmptyState = ({
  icon = "😕",
  title,
  message,
  style,
  ...rest
}: EmptyStateProps) => {
  return (
    <View style={[styles.container, style]} {...rest}>
      <View style={styles.content}>
        <ThemedText style={styles.icon}>{icon}</ThemedText>
        <ThemedText type="title" style={styles.title}>
          {title}
        </ThemedText>
        <ThemedText style={styles.message}>{message}</ThemedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  content: {
    alignItems: "center",
    maxWidth: 300,
    gap: 12,
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
});
