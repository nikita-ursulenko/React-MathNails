// ProfilScreenContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateMasterData } from '../data/data';

const ProfilScreenContext = createContext();

export const useProfilScreen = () => useContext(ProfilScreenContext);

export const ProfilScreenProvider = ({ children }) => {
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
    <ProfilScreenContext.Provider value={{ firstName, setFirstName, lastName, setLastName, selectedPercent, setSelectedPercent, saveProfileData }}>
      {children}
    </ProfilScreenContext.Provider>
  );
};
