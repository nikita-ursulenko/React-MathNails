import React from 'react';
import { Image, Text, View } from 'react-native';
import { useProfile } from '../context/ProfileContext'; // Убедитесь, что путь к контексту правильный
import { useTheme } from '../context/ThemeProvider'; // Подключение темы
import { darkTheme, lightTheme } from '../assets/styles/styles'; // Стили

export const ProfileIconWithDescription = () => {
    const { profileData } = useProfile(); // Использование данных профиля из контекста
    const { theme } = useTheme(); // Использование темы
    const styles = theme === 'dark' ? darkTheme : lightTheme; // Выбор стилей в зависимости от темы

    return (
        <View style={{width: "100%", height: "100%", alignItems: 'center'}}>
            {/* Изображение профиля */}
            <Image
              source={require('../assets/profil.png')} // Убедитесь, что путь к изображению правильный
              style={{ width: 60, height: 60 }} // Размеры изображения
            />
            {/* Описание под изображением */}
            {profileData ? (
              <Text style={styles.text}>{'\n'}{profileData.firstName} {profileData.lastName}</Text>
            ) : (
              <Text style={styles.text}>{'\n'}Профиль</Text>
            )}
        </View>
    );
}
