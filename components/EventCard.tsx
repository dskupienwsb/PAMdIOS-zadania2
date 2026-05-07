import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type EventCardProps = {
  title: string;
  date: string;
  category: string;
  location: string;
  favorite: boolean;
  badge: string;
  darkMode: boolean;
  onToggleFavorite: () => void;
};

export default function EventCard({
  title,
  date,
  category,
  location,
  favorite,
  badge,
  darkMode,
  onToggleFavorite,
}: EventCardProps) {
  const theme = darkMode
    ? {
        card: "#1E1E1E",
        text: "#FFFFFF",
        secondary: "#B0B0B0",
        button: "#4F8CFF",
      }
    : {
        card: "#FFFFFF",
        text: "#1A1A1A",
        secondary: "#666666",
        button: "#3B82F6",
      };

  return (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      <View style={styles.topRow}>
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <Ionicons name="calendar-outline" size={16} color={theme.secondary} />
        <Text style={[styles.info, { color: theme.secondary }]}>{date}</Text>
      </View>

      <View style={styles.row}>
        <Ionicons name="location-outline" size={16} color={theme.secondary} />
        <Text style={[styles.info, { color: theme.secondary }]}>
          {location}
        </Text>
      </View>
      <Text style={[styles.category, { color: theme.text }]}>{category}</Text>

      <Pressable
        onPress={onToggleFavorite}
        style={[
          styles.button,
          {
            backgroundColor: favorite ? "#FFB703" : theme.button,
          },
        ]}
      >
        <Text style={styles.buttonText}>
          {favorite ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 18,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 3,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    flex: 1,
    marginRight: 10,
  },
  info: {
    fontSize: 14,
    marginBottom: 6,
  },
  category: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 4,
    marginBottom: 16,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  badge: {
    backgroundColor: "#FF4D6D",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
});
