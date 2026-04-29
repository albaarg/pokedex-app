import { AddFavoriteButton } from "@/features/favorites/components/add-favorite";
import { Image } from "expo-image";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PokemonListItem } from "../types/pokemon.types";

type Props = {
  pokemon: PokemonListItem;
  onPress: () => void;
};

export const PokemonListItemCard = ({ pokemon, onPress }: Props) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
    <Image
      source={{ uri: pokemon.image }}
      style={styles.image}
      contentFit="contain"
      placeholder={pokemon.image}
      transition={200}
    />
    <View style={styles.info}>
      <Text style={styles.name}>{pokemon.name}</Text>
      <Text style={styles.number}>
        #{pokemon.id.toString().padStart(3, "0")}
      </Text>
    </View>
    <AddFavoriteButton pokemon={pokemon} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    marginHorizontal: 16,
    marginTop: 6,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
  },
  info: {
    marginLeft: 14,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    textTransform: "capitalize",
    color: "#111827",
  },
  number: {
    marginTop: 4,
    fontSize: 14,
    color: "#6B7280",
  },
});
