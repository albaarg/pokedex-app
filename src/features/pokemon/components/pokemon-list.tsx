import { FlashList } from "@shopify/flash-list";
import { useCallback } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { PokemonListItem as PokemonListItemType } from "../types/pokemon.types";
import { PokemonListItemCard } from "./pokemon-list-item";

type Props = {
  data: PokemonListItemType[];
  loading: boolean;
  footerLoading?: boolean;
  refreshing: boolean;
  onRefresh: () => void;
  onEndReached: () => void;
  onSelect: (pokemon: PokemonListItemType) => void;
  emptyMessage: string;
};

export const PokemonList = ({
  data,
  loading,
  footerLoading = false,
  refreshing,
  onRefresh,
  onEndReached,
  onSelect,
  emptyMessage,
}: Props) => {
  const renderItem = useCallback(
    ({ item }: { item: PokemonListItemType }) => (
      <PokemonListItemCard pokemon={item} onPress={() => onSelect(item)} />
    ),
    [onSelect],
  );

  const renderEmpty = useCallback(
    () => (
      <View style={styles.emptyState}>
        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" />
        ) : (
          <Text style={styles.emptyText}>{emptyMessage}</Text>
        )}
      </View>
    ),
    [loading, emptyMessage],
  );

  const renderFooter = useCallback(() => {
    if (!footerLoading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#007AFF" />
      </View>
    );
  }, [footerLoading]);

  return (
    <FlashList
      data={data}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderItem}
      contentContainerStyle={
        data.length === 0 ? styles.emptyContainer : styles.listContainer
      }
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListEmptyComponent={renderEmpty}
      ListFooterComponent={renderFooter}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 24,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  emptyState: {
    alignItems: "center",
  },
  emptyText: {
    color: "#6B7280",
    fontSize: 16,
    textAlign: "center",
  },
  footer: {
    marginVertical: 16,
    alignItems: "center",
  },
  footerText: {
    marginTop: 8,
    color: "#6B7280",
  },
});
