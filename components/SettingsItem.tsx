import React from 'react';
import { View, Text, StyleSheet, Pressable, Switch } from 'react-native';

type Props = {
  title: string;
  type: 'toggle' | 'button';
  value?: boolean;
  onToggle?: () => void;
  onPress?: () => void;
  theme: any;
};

export default function SettingsItem({
  title,
  type,
  value,
  onToggle,
  onPress,
  theme,
}: Props) {
  return (
    <Pressable
      onPress={type === 'button' ? onPress : undefined}
      style={[styles.row, { backgroundColor: theme.card }]}
    >
      <Text style={[styles.text, { color: theme.text }]}>
        {title}
      </Text>

      {type === 'toggle' ? (
        <Switch value={!!value} onValueChange={onToggle} />
      ) : (
        <Text style={{ color: "#3B82F6", fontSize: 18 }}>›</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
  },
});