import { ThemedText } from "@/components/themed-text";
import { ErrorState } from "@/components/ui/error-state";
import { PokemonCard } from "@/features/pokemon/components/pokemon-card";
import { usePokemonDetail } from "@/features/pokemon/hooks/use-pokemon-detail";
import { ExploreStackParamList } from "@/navigation/AppNavigator";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";

type DetailRouteProp = RouteProp<ExploreStackParamList, "Detail">;

export const PokemonDetailScreen = () => {
  const { params } = useRoute<DetailRouteProp>();
  const { data, isLoading, isError } = usePokemonDetail(params.pokemonId);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (isError || !data) {
    return (
      <ErrorState
        error={new Error("No se pudo cargar el detalle")}
        message="No se pudo cargar el detalle. Intenta nuevamente."
      />
    );
  }

  const image =
    data.sprites.other?.["official-artwork"]?.front_default ??
    data.sprites.front_default ??
    "";

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <PokemonCard name={data.name} id={data.id} image={image}>
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Tipos
          </ThemedText>
          <PokemonCard.Types types={data.types} />
        </View>
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Habilidades
          </ThemedText>
          <View style={styles.badgeRow}>
            {data.abilities.map((ability) => (
              <View key={ability.slot} style={styles.abilityBadge}>
                <ThemedText style={styles.badgeText}>
                  {ability.ability.name}
                </ThemedText>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Stats
          </ThemedText>
          <PokemonCard.Stats stats={data.stats} />
        </View>
        <View style={styles.statsInfo}>
          <ThemedText style={styles.metaText}>
            Altura: {data.height / 10} m
          </ThemedText>
          <ThemedText style={styles.metaText}>
            Peso: {data.weight / 10} kg
          </ThemedText>
        </View>
      </PokemonCard>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  contentContainer: {
    paddingBottom: 24,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    marginBottom: 10,
  },
  badgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  abilityBadge: {
    backgroundColor: "#E0F2FE",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
    marginRight: 8,
  },
  badgeText: {
    color: "#0369A1",
    fontWeight: "600",
    textTransform: "capitalize",
  },
  statsInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  metaText: {
    color: "#4B5563",
    fontSize: 14,
  },
});
