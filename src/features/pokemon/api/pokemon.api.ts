import { apiClient } from "@/lib/api-client";
import { POKEMON_IMAGES } from "@/lib/pokemon-images";
import {
  PokemonDetail,
  PokemonListItem,
  PokemonListResponse,
  PokemonListResult,
} from "../types/pokemon.types";

export type GetPokemonListParams = {
  limit: number;
  offset: number;
};

const extractPokemonId = (url: string): number => {
  const match = url.match(/pokemon\/(\d+)\/?$/);
  return match ? Number(match[1]) : 0;
};

export const mapPokemonResultToItem = (
  result: PokemonListResult,
): PokemonListItem => {
  const id = extractPokemonId(result.url);

  return {
    id,
    name: result.name,
    image: POKEMON_IMAGES.ARTWORK_URL(id),
  };
};

export const getPokemonList = async ({
  limit,
  offset,
}: GetPokemonListParams) => {
  const response = await apiClient.get<PokemonListResponse>("/pokemon", {
    params: { limit, offset },
  });

  return response.data;
};

export const getPokemonDetail = async (
  idOrName: number | string,
): Promise<PokemonDetail> => {
  const response = await apiClient.get<PokemonDetail>(`/pokemon/${idOrName}`);
  return response.data;
};
