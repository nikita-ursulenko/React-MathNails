import {useState, useEffect, useRef} from 'react';
import { Image, View, Text, StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfilScreen from './screens/ProfilScreen';
import SettingsScreen from './screens/SettingsScreen';
import GeneralScreen from './screens/GeneralScreen';
import EntryScreen from './screens/EntryScreen';
import ServicesScreen from './screens/ServicesScreen';
import StaticScreen from './screens/StaticScreen';
import { ThemeProvider, useTheme } from './context/ThemeProvider';
import { ProfileProvider } from './context/ProfileContext'; 
import { darkTheme, lightTheme } from './assets/styles/styles';
import { ProfileIconWithDescription } from './components/ProfileIconWithDescription';
import { DataProvider } from './context/DataContext';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <ProfileProvider>
        <DataProvider>
          <MainApp />
        </DataProvider>
      </ProfileProvider>
    </ThemeProvider>
  );
}

function MainApp() {
  const { theme } = useTheme();

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar
        barStyle={theme === 'dark' ? "light-content" : "dark-content"}
      />
      <Drawer.Navigator initialRouteName="General">
        <Drawer.Screen 
          name='Profil' 
          component={ProfilScreen} 
          options={{
            title: "Профиль",
            drawerLabel: "",
            drawerIcon: () => <ProfileIconWithDescription />,
          }}
        />
        <Drawer.Screen 
          name='General' 
          component={GeneralScreen}
          options={{ title: "Главная" }}
        />
        <Drawer.Screen 
          name='Entry' 
          component={EntryScreen}
          options={{ title: "Ввод данных" }}
        />
        <Drawer.Screen 
          name='Services' 
          component={ServicesScreen} 
          options={{ title: "Услуги" }}
        />
        <Drawer.Screen 
          name='Static' 
          component={StaticScreen} 
          options={{ title: "Статистика" }}
        />
        <Drawer.Screen
          name='Settings' 
          component={SettingsScreen} 
          options={{ title: "Настройки" }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
