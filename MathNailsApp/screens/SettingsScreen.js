import React from 'react';
import { Text, View, Switch, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { lightTheme, darkTheme } from '../assets/styles/styles';

const SettingsScreen = () => {
  const themeContext = useTheme();
  const { theme, toggleTheme } = themeContext;
  const styles = theme === 'dark' ? darkTheme : lightTheme;

  if (!themeContext) {
    console.error('ThemeContext not found');
    return null;
  }

  return (
    <View style={styles.containerSettings}>
      <Text style={styles.text}>Текущая тема: </Text><Text style={styles.text}>{theme === 'dark' ? 'Тёмная' : 'Светлая'}</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={theme === 'dark' ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleTheme}
        value={theme === 'dark'}
      />
    </View>
  );
};

export default SettingsScreen;

