export const POKEMON_IMAGES = {
  /** Sprite pequeño (96x96) */
  SPRITE_URL: (id: number) =>
    `${process.env.EXPO_PUBLIC_POKEMON_SPRITE_URL ?? "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon"}/${id}.png`,
  /** Artwork oficial HD (475x475) */
  ARTWORK_URL: (id: number) =>
    `${process.env.EXPO_PUBLIC_POKEMON_ARTWORK_URL ?? "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork"}/${id}.png`,
} as const;
