import { useQuery } from "@tanstack/react-query";
import { getPokemonDetail } from "../api/pokemon.api";
import { PokemonDetail } from "../types/pokemon.types";

export const usePokemonDetail = (id: number | string) => {
  return useQuery<PokemonDetail, unknown>({
    queryKey: ["pokemon-detail", id],
    queryFn: () => getPokemonDetail(id),
    staleTime: 1000 * 60 * 5,
  });
};
