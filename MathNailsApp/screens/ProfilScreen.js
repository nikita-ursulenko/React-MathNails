import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, TextInput, Button } from "react-native";
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateMasterData } from '../data/data';
import { ButtonSpecial } from "../components/components";

const ProfilScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedPercent, setSelectedPercent] = useState('50');

  useEffect(() => {
    const fetchMasterData = async () => {
      console.log('Loading profile data...');
      try {
        const masterDataString = await AsyncStorage.getItem('masterData');
        if (masterDataString !== null) {
          console.log('Profile data loaded:', masterDataString);
          const masterData = JSON.parse(masterDataString);
          setFirstName(masterData.firstName || '');
          setLastName(masterData.lastName || '');
          setSelectedPercent(masterData.commissionRate ? masterData.commissionRate.toString() : '50');
        }
      } catch (error) {
        console.error('Error loading master data:', error);
      }
    };

    fetchMasterData();
  }, []);

  const saveProfileData = async () => {
    try {
      console.log('Saving profile data...');
      await updateMasterData(firstName, lastName, parseInt(selectedPercent));
      console.log('Profile data saved successfully.');
    } catch (error) {
      console.error('Error saving profile data:', error);
    }
  };
    return (
      <View style={styles.FlexUp}>
        <View style={styles.ProfilContainer}>
          <View>
            <Image source={require('../assets/profil.png')} // Путь к вашей картинке
            style={styles.ProfileImage} // Размеры изображения
            />
          </View>
          <TextInput 
          style={styles.TextName}
          placeholder="Ваше имя"
          value={firstName}
          onChangeText={setFirstName}
          />
          <TextInput 
          style={styles.TextName}
          placeholder="Ваша фамилия"
          value={lastName}
          onChangeText={setLastName}
          />
          
          <View style={styles.Container}>
          <Picker
            style={{width: "80%"}}
            selectedValue={selectedPercent}
            onValueChange={(itemValue, itemIndex) => setSelectedPercent(itemValue)}
            >
            <Picker.Item label="Мой процент 50%" value="50" />
            <Picker.Item label="Мой процент 40%" value="40" />
          </Picker>
          </View>
        </View>
        <View style={styles.ButtonSpecial}>
          <ButtonSpecial title="Сохранить"  
          onPress={() => {
            saveProfileData()
          }}/>
        </View>
      </View>
    );
}
  
export default ProfilScreen;

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    alignItems: "center",
  },
  ProfilContainer: {
    width: "100%",
    alignItems: "center",
  },
  ProfileImage: {
    width: 150,
    height: 150,
    marginTop: 20,
  },
  TextName: {
    marginTop: 20,
    height: 50,
    padding: 10,
    width: "70%", 
    borderWidth: 2,
    borderColor: 'gray', 
    borderRadius: 50,
    marginBottom: 10, 
    paddingLeft: 10
  },
  FlexUp: {
    height: "90%",
    justifyContent: "space-between",
    flexDirection: "column",
    alignItems: "center"
  },
  ButtonSpecial: {
    width: "50%",
  },
})