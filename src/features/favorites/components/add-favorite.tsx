import { FavoritePokemon } from "@/features/pokemon/types/pokemon.types";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";
import { useFavoritesContext } from "../context/favorites-context";

interface FavoriteButtonProps {
  pokemon: FavoritePokemon;
}

export const AddFavoriteButton = ({ pokemon }: FavoriteButtonProps) => {
  const { toggleFavorite, isFavorite } = useFavoritesContext();

  const handlePress = (event: any) => {
    event.stopPropagation();
    toggleFavorite(pokemon);
  };

  return (
    <Pressable onPress={handlePress} style={styles.button}>
      <Ionicons
        name={isFavorite(pokemon.id) ? "heart" : "heart-outline"}
        size={28}
        color={isFavorite(pokemon.id) ? "#EF4444" : "#6B7280"}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
  },
});
