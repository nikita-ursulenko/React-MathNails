import React, { useState, useEffect } from "react";
import { View, Image, TextInput } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { ButtonSpecial } from "../components/components";
import { useTheme } from "../context/ThemeProvider";
import { useProfile } from "../context/ProfileContext"; // Импортируем контекст профиля
import { darkTheme, lightTheme } from "../assets/styles/styles";

const ProfilScreen = () => {
  const { profileData, updateProfileData } = useProfile(); // Используем данные и методы из контекста
  const [firstName, setFirstName] = useState(profileData.firstName || '');
  const [lastName, setLastName] = useState(profileData.lastName || '');
  const [selectedPercent, setSelectedPercent] = useState(profileData.commissionRate || '50');
  const { theme } = useTheme(); // Тема для стилей
  const styles = theme === 'dark' ? darkTheme : lightTheme; // Применяем тему

  useEffect(() => {
    setFirstName(profileData.firstName || '');
    setLastName(profileData.lastName || '');
    setSelectedPercent(profileData.commissionRate ? profileData.commissionRate.toString() : '50');
  }, [profileData]);

  const saveProfileData = () => {
    // Обновляем данные профиля через контекст
    updateProfileData({
      firstName,
      lastName,
      commissionRate: parseInt(selectedPercent, 10)
    });
  };

  return (
    <View style={styles.Container}>
      <View style={styles.ProfilContainer}>
        <Image
          source={require('../assets/profil.png')}
          style={styles.ProfileImage}
        />
        <TextInput
          style={[styles.TextName, styles.text]}
          placeholder="Ваше имя"
          placeholderTextColor={theme === 'dark' ? 'gray' : 'lightgray'}
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={[styles.TextName, styles.text]}
          placeholder="Ваша фамилия"
          placeholderTextColor={theme === 'dark' ? 'gray' : 'lightgray'}
          value={lastName}
          onChangeText={setLastName}
        />
        <Picker
          style={{width: "80%"}}
          selectedValue={selectedPercent}
          onValueChange={(itemValue) => setSelectedPercent(itemValue)}
        >
          <Picker.Item label="Мой процент 50%" value="50" color={theme === 'dark' ? 'white' : 'black'} />
          <Picker.Item label="Мой процент 40%" value="40" color={theme === 'dark' ? 'white' : 'black'} />
        </Picker>
      </View>
      <ButtonSpecial title="Сохранить" onPress={saveProfileData} />
    </View>
  );
}

export default ProfilScreen;
