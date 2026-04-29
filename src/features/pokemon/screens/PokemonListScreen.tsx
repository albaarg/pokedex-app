import { ThemedText } from "@/components/themed-text";
import { ErrorState } from "@/components/ui/error-state";
import { Input } from "@/components/ui/input";
import { PokemonList } from "@/features/pokemon/components/pokemon-list";
import { usePokemonList } from "@/features/pokemon/hooks/use-pokemon-list";
import { useDebounce } from "@/hooks/use-debounce";
import { ExploreStackParamList } from "@/navigation/AppNavigator";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

type NavigationProp = NativeStackNavigationProp<
  ExploreStackParamList,
  "ExploreMain"
>;

export const PokemonListScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 250);
  const {
    pokemons,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isRefetching,
    refetch,
    isError,
  } = usePokemonList();

  const filteredPokemons = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();
    if (!query) return pokemons;
    return pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query),
    );
  }, [debouncedSearch, pokemons]);

  const handleSelect = (pokemon: { id: number }) => {
    navigation.navigate("Detail", { pokemonId: pokemon.id });
  };

  const handleLoadMore = () => {
    console.log("LOAD MORE");
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (isError && pokemons.length === 0) {
    return (
      <View style={styles.container}>
        <ErrorState
          style={{ backgroundColor: "transparent" }}
          error={new Error("No se pudo cargar la lista de Pokémon")}
          onRetry={refetch}
          message="No se pudo cargar la lista. Intenta de nuevo."
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Pokedex
      </ThemedText>
      <View style={{ marginBottom: 12 }}>
        <Input
          value={search}
          onChangeText={setSearch}
          placeholder="Buscar Pokémon"
          onClear={() => setSearch("")}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <PokemonList
        data={filteredPokemons}
        loading={isLoading}
        footerLoading={isFetchingNextPage}
        refreshing={isRefetching}
        onRefresh={refetch}
        onEndReached={handleLoadMore}
        onSelect={handleSelect}
        emptyMessage="No se encontraron Pokémones."
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
  title: {
    marginBottom: 14,
  },
});
