import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Image,
  Switch,
} from 'react-native';

import SettingsItem from '../../components/SettingsItem';

type Setting = {
  id: string;
  title: string;
  value: boolean;
};

export default function ProfileScreen() {
  const [darkMode, setDarkMode] = useState(false);

  const [draft, setDraft] = useState({
    name: 'Jan Kowalski',
    email: 'jan@example.com',
    city: 'Warszawa',
    bio: 'Lubię React Native',
  });

  const [profile, setProfile] = useState(draft);

  const [toast, setToast] = useState<string | null>(null);

  const [settings, setSettings] = useState<Setting[]>([
    { id: '1', title: 'Powiadomienia', value: true },
    { id: '2', title: 'Prywatność', value: false },
    { id: '3', title: 'Tryb cichy', value: false },
  ]);

  const theme = darkMode
    ? {
        bg: '#121212',
        card: '#1E1E1E',
        text: '#fff',
        input: '#2A2A2A',
        accent: "#3B82F6",
        success: '#4CAF50',
        danger: '#FF4D4D',
      }
    : {
        bg: '#F4F6F8',
        card: '#fff',
        text: '#000',
        input: '#E9EDF3',
        accent: "#3B82F6",
        success: '#2E7D32',
        danger: '#D32F2F',
      };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const saveProfile = () => {
    if (!draft.name.trim()) return showToast('Imię nie może być puste');
    if (!draft.email.includes('@')) return showToast('Niepoprawny email');
    if (draft.bio.length > 120) return showToast('Bio max 120 znaków');

    setProfile(draft);
    showToast('Zapisano profil!');
  };

  const toggleSetting = (id: string) => {
    setSettings(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, value: !item.value }
          : item
      )
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {toast && (
        <View style={styles.toast}>
          <Text style={{ color: '#fff' }}>{toast}</Text>
        </View>
      )}

      <ScrollView
        style={[styles.container, { backgroundColor: theme.bg }]}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={styles.avatarBox}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
            style={styles.avatar}
          />

          <Text style={[styles.name, { color: theme.text }]}>
            {profile.name}
          </Text>

          <Text style={{ color: theme.text }}>
            {profile.city}
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={styles.section}>Edytuj profil</Text>

          <TextInput
            value={draft.name}
            onChangeText={t => setDraft({ ...draft, name: t })}
            style={[styles.input, { backgroundColor: theme.input, color: theme.text }]}
            placeholder="Imię"
            placeholderTextColor="#888"
          />

          <TextInput
            value={draft.email}
            onChangeText={t => setDraft({ ...draft, email: t })}
            style={[styles.input, { backgroundColor: theme.input, color: theme.text }]}
            placeholder="Email"
            placeholderTextColor="#888"
          />

          <TextInput
            value={draft.city}
            onChangeText={t => setDraft({ ...draft, city: t })}
            style={[styles.input, { backgroundColor: theme.input, color: theme.text }]}
            placeholder="Miasto"
            placeholderTextColor="#888"
          />

          <TextInput
            value={draft.bio}
            onChangeText={t => setDraft({ ...draft, bio: t })}
            style={[styles.input, { backgroundColor: theme.input, color: theme.text }]}
            placeholder="Bio"
            placeholderTextColor="#888"
          />

          <Text style={{ color: theme.text, marginBottom: 10 }}>
            {draft.bio.length}/120
          </Text>

          <Pressable style={styles.button} onPress={saveProfile}>
            <Text style={{ color: '#fff' }}>Zapisz zmiany</Text>
          </Pressable>
        </View>

        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={styles.section}>Ustawienia</Text>

          {settings.map(item => (
            <SettingsItem
              key={item.id}
              title={item.title}
              type="toggle"
              value={item.value}
              onToggle={() => toggleSetting(item.id)}
              theme={theme}
            />
          ))}

          <SettingsItem
            title="Tryb ciemny"
            type="toggle"
            value={darkMode}
            onToggle={() => setDarkMode(v => !v)}
            theme={theme}
          />

          <SettingsItem
            title="O aplikacji"
            type="button"
            onPress={() => showToast('Aplikacja React Native demo')}
            theme={theme}
          />
        </View>

        <Pressable
          onPress={() => showToast('Wylogowano (demo)')}
          style={({ pressed }) => [
            styles.logout,
            { opacity: pressed ? 0.6 : 1 },
          ]}
        >
          <Text style={{ color: '#fff', fontWeight: '700' }}>
            Wyloguj
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  toast: {
    position: 'absolute',
    top: 50,
    left: 16,
    right: 16,
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 10,
    zIndex: 999,
    alignItems: 'center',
  },

  avatarBox: {
    alignItems: 'center',
    marginBottom: 20,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },

  name: {
    fontSize: 20,
    fontWeight: '700',
  },

  card: {
    padding: 14,
    borderRadius: 14,
    marginBottom: 16,
  },

  section: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
    color: '#4F8CFF',
  },

  input: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  button: {
    backgroundColor: '#4F8CFF',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  logout: {
    backgroundColor: '#FF4D4D',
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
});