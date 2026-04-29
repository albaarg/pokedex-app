import AsyncStorage from "@react-native-async-storage/async-storage";
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { getPokemonList, mapPokemonResultToItem } from "../api/pokemon.api";
import { PokemonListItem } from "../types/pokemon.types";

const PAGE_SIZE = 20;
const LAST_LIST_KEY = "LAST_POKEMON_LIST";

type PokemonListPage = {
  items: PokemonListItem[];
  nextOffset?: number;
};

export const usePokemonList = () => {
  const [fallbackPokemons, setFallbackPokemons] = useState<PokemonListItem[]>(
    [],
  );

  useEffect(() => {
    const loadLastList = async () => {
      try {
        const raw = await AsyncStorage.getItem(LAST_LIST_KEY);
        if (raw) {
          setFallbackPokemons(JSON.parse(raw));
        }
      } catch {
        console.warn("Error:", Error);
      }
    };

    void loadLastList();
  }, []);

  const query = useInfiniteQuery<
    PokemonListPage,
    unknown,
    InfiniteData<PokemonListPage>,
    ["pokemon-list"],
    number
  >({
    queryKey: ["pokemon-list"],
    queryFn: async ({ pageParam = 0 }) => {
      const data = await getPokemonList({
        limit: PAGE_SIZE,
        offset: pageParam,
      });
      return {
        items: data.results.map(mapPokemonResultToItem),
        nextOffset: data.next ? pageParam + PAGE_SIZE : undefined,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextOffset,
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    const persistLastList = async () => {
      if (!query.data?.pages) {
        return;
      }

      const combined = query.data.pages.flatMap((page) => page.items);
      try {
        await AsyncStorage.setItem(LAST_LIST_KEY, JSON.stringify(combined));
      } catch {
        console.warn("Error:", Error);
      }
    };

    void persistLastList();
  }, [query.data]);

  const pokemons = useMemo(
    () => query.data?.pages.flatMap((page) => page.items) ?? fallbackPokemons,
    [fallbackPokemons, query.data],
  );

  return {
    ...query,
    pokemons,
    isLoading: query.isLoading && pokemons.length === 0,
  };
};
