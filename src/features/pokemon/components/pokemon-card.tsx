import { Image } from "expo-image";
import { ReactNode } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    type ViewStyle,
} from "react-native";
import { PokemonStat, PokemonType } from "../types/pokemon.types";

type PokemonCardProps = {
  name: string;
  id: number;
  image: string;
  onPress?: () => void;
  children?: ReactNode;
};

type ImageProps = {
  image: string;
};

type TypesProps = {
  types: PokemonType[];
};

type StatsProps = {
  stats: PokemonStat[];
};

type CompoundComponent = React.FC<PokemonCardProps> & {
  Image: React.FC<ImageProps>;
  Types: React.FC<TypesProps>;
  Stats: React.FC<StatsProps>;
};

const PokemonCard = (({
  name,
  id,
  image,
  onPress,
  children,
}: PokemonCardProps) => (
  <TouchableOpacity
    style={styles.container}
    onPress={onPress}
    activeOpacity={onPress ? 0.85 : 1}
  >
    <View style={styles.header}>
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.number}>#{id.toString().padStart(3, "0")}</Text>
      </View>
    </View>
    <Image
      source={{ uri: image }}
      style={styles.image}
      placeholder={image}
      contentFit="contain"
      transition={300}
    />
    <View style={styles.content}>{children}</View>
  </TouchableOpacity>
)) as CompoundComponent;

const PokemonCardImage = ({ image }: ImageProps) => (
  <Image
    source={{ uri: image }}
    style={styles.image}
    placeholder={image}
    contentFit="contain"
    transition={300}
  />
);

const PokemonCardTypes = ({ types }: TypesProps) => (
  <View style={styles.typeContainer}>
    {types.map((item) => (
      <View key={item.slot} style={styles.typeBadge}>
        <Text style={styles.typeText}>{item.type.name}</Text>
      </View>
    ))}
  </View>
);

const PokemonCardStats = ({ stats }: StatsProps) => (
  <View style={styles.statsWrapper}>
    {stats.map((stat) => {
      const width = `${Math.min(stat.base_stat, 100)}%`;
      const barStyle = { width } as ViewStyle;
      return (
        <View key={stat.stat.name} style={styles.statRow}>
          <View style={styles.statHeader}>
            <Text style={styles.statLabel}>{stat.stat.name}</Text>
            <Text style={styles.statValue}>{stat.base_stat}</Text>
          </View>
          <View style={styles.statBarBackground}>
            <View style={[styles.statBar, barStyle]} />
          </View>
        </View>
      );
    })}
  </View>
);

PokemonCard.Image = PokemonCardImage;
PokemonCard.Types = PokemonCardTypes;
PokemonCard.Stats = PokemonCardStats;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    margin: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  header: {
    marginBottom: 18,
  },
  name: {
    fontSize: 28,
    fontWeight: "800",
    textTransform: "capitalize",
    color: "#111827",
  },
  number: {
    marginTop: 6,
    color: "#6B7280",
    fontSize: 14,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 18,
    backgroundColor: "#F3F4F6",
  },
  content: {
    marginTop: 18,
  },
  typeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  typeBadge: {
    backgroundColor: "#EEF2FF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    marginBottom: 8,
    marginRight: 8,
  },
  typeText: {
    fontSize: 14,
    color: "#3730A3",
    textTransform: "capitalize",
    fontWeight: "600",
  },
  statsWrapper: {
    marginTop: 16,
  },
  statRow: {
    marginBottom: 12,
  },
  statHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  statLabel: {
    textTransform: "capitalize",
    color: "#374151",
    fontWeight: "600",
  },
  statValue: {
    color: "#111827",
    fontWeight: "700",
  },
  statBarBackground: {
    backgroundColor: "#E5E7EB",
    height: 8,
    borderRadius: 999,
    overflow: "hidden",
  },
  statBar: {
    height: 8,
    backgroundColor: "#2563EB",
    borderRadius: 999,
  },
});

export { PokemonCard };
