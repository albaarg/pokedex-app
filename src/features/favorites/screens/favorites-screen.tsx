import { ThemedText } from "@/components/themed-text";
import { EmptyState } from "@/components/ui/empty-state";
import { useFavoritesContext } from "@/features/favorites/context/favorites-context";
import { PokemonListItemCard } from "@/features/pokemon/components/pokemon-list-item";
import { FavoritesStackParamList } from "@/navigation/AppNavigator";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FlashList } from "@shopify/flash-list";
import { useCallback } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

type NavigationProp = NativeStackNavigationProp<
  FavoritesStackParamList,
  "FavoritesMain"
>;

export const FavoritesScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { favorites, loading } = useFavoritesContext();

  const handleSelect = useCallback(
    (pokemon: { id: number }) => {
      navigation.navigate("Detail", { pokemonId: pokemon.id });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: (typeof favorites)[0] }) => (
      <PokemonListItemCard pokemon={item} onPress={() => handleSelect(item)} />
    ),
    [handleSelect],
  );

  const renderFooter = useCallback(() => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#007AFF" />
      </View>
    );
  }, [loading]);

  if (favorites.length === 0) {
    return (
      <View style={styles.container}>
        <EmptyState
          icon="😕"
          title="Oops"
          message="No tienes Pokémon favoritos aún. Marca algunos desde la lista."
          style={{ backgroundColor: "transparent" }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.header}>
        Favoritos
      </ThemedText>
      <FlashList
        data={favorites}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 16,
    paddingTop: 18,
  },
  header: {
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 24,
    backgroundColor: "#F8FAFC",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    alignItems: "center",
    paddingVertical: 20,
  },
});
