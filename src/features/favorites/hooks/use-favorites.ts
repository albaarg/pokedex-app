import { FavoritePokemon } from "@/features/pokemon/types/pokemon.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useMemo, useState } from "react";

const FAVORITES_KEY = "FAVORITE_POKEMON_LIST";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoritePokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const raw = await AsyncStorage.getItem(FAVORITES_KEY);
        if (raw) {
          setFavorites(JSON.parse(raw));
        }
      } catch {
        console.warn("Error:", Error);
      } finally {
        setLoading(false);
      }
    };

    void loadFavorites();
  }, []);

  const favoritesMap = useMemo(
    () => new Map(favorites.map((pokemon) => [pokemon.id, pokemon])),
    [favorites],
  );

  const persistFavorites = async (nextFavorites: FavoritePokemon[]) => {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(nextFavorites));
    } catch {
      console.warn("Error:", Error);
    }
  };

  const toggleFavorite = async (pokemon: FavoritePokemon) => {
    const nextFavorites = favoritesMap.has(pokemon.id)
      ? favorites.filter((item) => item.id !== pokemon.id)
      : [pokemon, ...favorites];

    setFavorites(nextFavorites);
    await persistFavorites(nextFavorites);
  };

  const isFavorite = (id: number) => favoritesMap.has(id);

  return {
    favorites,
    loading,
    toggleFavorite,
    isFavorite,
  };
};
