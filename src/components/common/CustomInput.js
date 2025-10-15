import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Colors, Spacing, Fonts } from '../../styles/globalStyles';

const CustomInput = ({ label, value, onChangeText, placeholder, keyboardType = 'default' }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.text.secondary}
        keyboardType={keyboardType}
        autoCapitalize="none"
        accessibilityLabel={label || placeholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: Fonts.small,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },
  input: {
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: Fonts.medium,
    color: Colors.text.primary,
  },
});

export default CustomInput;
