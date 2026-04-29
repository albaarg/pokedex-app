import { FavoritePokemon } from "@/features/pokemon/types/pokemon.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const FAVORITES_KEY = "FAVORITE_POKEMON_LIST";

interface FavoritesContextType {
  favorites: FavoritePokemon[];
  loading: boolean;
  toggleFavorite: (pokemon: FavoritePokemon) => Promise<void>;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error(
      "useFavoritesContext must be used within a FavoritesProvider",
    );
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
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

  const value = {
    favorites,
    loading,
    toggleFavorite,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
