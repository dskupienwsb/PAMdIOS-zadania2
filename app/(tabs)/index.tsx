import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Pressable,
  StatusBar,
  Switch,
} from "react-native";

import EventCard from "../../components/EventCard";

const categories = ["Wszystkie", "Nauka", "Sport", "Muzyka", "Film"];

type EventType = {
  id: string;
  title: string;
  date: string;
  category: string;
  location: string;
  favorite: boolean;
  badge: string;
};

const initialEvents: EventType[] = [
  {
    id: "1",
    title: "Warsztaty AI dla początkujących",
    date: "12 maja 2026",
    category: "Nauka",
    location: "Warszawa",
    favorite: false,
    badge: "Nowe",
  },
  {
    id: "2",
    title: "Turniej siatkówki",
    date: "15 maja 2026",
    category: "Sport",
    location: "Kraków",
    favorite: true,
    badge: "Popularne",
  },
  {
    id: "3",
    title: "Koncert muzyki filmowej",
    date: "20 maja 2026",
    category: "Muzyka",
    location: "Gdańsk",
    favorite: false,
    badge: "Popularne",
  },
  {
    id: "4",
    title: "Maraton filmowy Marvel",
    date: "22 maja 2026",
    category: "Film",
    location: "Poznań",
    favorite: false,
    badge: "Nowe",
  },
  {
    id: "5",
    title: "Hackathon studencki",
    date: "25 maja 2026",
    category: "Nauka",
    location: "Wrocław",
    favorite: true,
    badge: "Popularne",
  },
];

export default function HomeScreen() {
  const [events, setEvents] = useState<EventType[]>(initialEvents);

  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Wszystkie");

  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const [darkMode, setDarkMode] = useState(false);

  const theme = darkMode
    ? {
        background: "#121212",
        card: "#1E1E1E",
        text: "#FFFFFF",
        secondary: "#B0B0B0",
        input: "#2A2A2A",
        active: "#4F8CFF",
      }
    : {
        background: "#F4F6F8",
        card: "#FFFFFF",
        text: "#1A1A1A",
        secondary: "#666666",
        input: "#FFFFFF",
        active: "#3B82F6"
      };

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch = event.title
        .toLowerCase()
        .includes(searchText.toLowerCase());

      const matchesCategory =
        selectedCategory === "Wszystkie" || event.category === selectedCategory;

      const matchesFavorites = !showFavoritesOnly || event.favorite;

      return matchesSearch && matchesCategory && matchesFavorites;
    });
  }, [events, searchText, selectedCategory, showFavoritesOnly]);

  const toggleFavorite = (id: string) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id
          ? {
              ...event,
              favorite: !event.favorite,
            }
          : event,
      ),
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <StatusBar barStyle={darkMode ? "light-content" : "dark-content"} />

      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>
          Katalog wydarzeń
        </Text>

        <Text style={[styles.subtitle, { color: theme.secondary }]}>
          Znajdź interesujące wydarzenia w swojej okolicy
        </Text>
      </View>

      <View style={styles.switchContainer}>
        <Text style={{ color: theme.text }}>Tryb ciemny</Text>

        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>

      <TextInput
        placeholder="Wyszukaj wydarzenie..."
        placeholderTextColor={theme.secondary}
        value={searchText}
        onChangeText={setSearchText}
        style={[
          styles.input,
          {
            backgroundColor: theme.input,
            color: theme.text,
          },
        ]}
      />

      <View style={styles.filtersContainer}>
        {categories.map((category) => {
          const isActive = selectedCategory === category;

          return (
            <Pressable
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={[
                styles.filterButton,
                {
                  backgroundColor: isActive ? theme.active : theme.card,
                },
              ]}
            >
              <Text
                style={{
                  color: isActive ? "#FFFFFF" : theme.text,
                  fontWeight: "600",
                }}
              >
                {category}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        style={[
          styles.favoriteToggle,
          {
            backgroundColor: showFavoritesOnly ? theme.active : theme.card,
          },
        ]}
        onPress={() => setShowFavoritesOnly((prev) => !prev)}
      >
        <Text
          style={{
            color: showFavoritesOnly ? "#FFFFFF" : theme.text,
            fontWeight: "600",
          }}
        >
          {showFavoritesOnly
            ? "Pokazujesz tylko ulubione"
            : "Pokaż tylko ulubione"}
        </Text>
      </Pressable>

      <Text style={[styles.results, { color: theme.secondary }]}>
        Liczba wyników: {filteredEvents.length}
      </Text>

      {filteredEvents.length === 0 ? (
        <Text style={[styles.emptyText, { color: theme.text }]}>
          Brak wyników
        </Text>
      ) : (
        <FlatList
          data={filteredEvents}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <EventCard
              title={item.title}
              date={item.date}
              category={item.category}
              location={item.location}
              favorite={item.favorite}
              badge={item.badge}
              darkMode={darkMode}
              onToggleFavorite={() => toggleFavorite(item.id)}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 22,
  },

  input: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 16,
  },

  filtersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 16,
  },

  filterButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },

  favoriteToggle: {
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },

  results: {
    marginBottom: 12,
    fontSize: 14,
    fontWeight: "500",
  },

  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 18,
    fontWeight: "600",
  },

  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
});
