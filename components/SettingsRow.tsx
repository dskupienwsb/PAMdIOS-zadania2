import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

type SettingsRowProps = {
  title: string;
  value?: string;
  onPress?: () => void;
};

export default function SettingsRow({
  title,
  value,
  onPress,
}: SettingsRowProps) {
  return (
    <Pressable onPress={onPress} style={styles.row}>
      <Text style={styles.title}>{title}</Text>

      {value ? <Text style={styles.value}>{value}</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: '#1E1E1E',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  value: {
    color: '#aaa',
    fontSize: 14,
  },
});