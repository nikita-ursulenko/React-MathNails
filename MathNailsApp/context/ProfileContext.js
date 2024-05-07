import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileContext = createContext({
  profileData: {},
  updateProfileData: () => {}
});

export const ProfileProvider = ({ children }) => {
    const [profileData, setProfileData] = useState({ firstName: '', lastName: '', commissionRate: 50 });

    useEffect(() => {
        const loadProfileData = async () => {
            const data = await AsyncStorage.getItem('masterData');
            if (data) {
                setProfileData(JSON.parse(data));
            }
        };
        loadProfileData();
    }, []);

    const updateProfileData = async (data) => {
        await AsyncStorage.setItem('masterData', JSON.stringify(data));
        setProfileData(data);
    };

    return (
        <ProfileContext.Provider value={{ profileData, updateProfileData }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => useContext(ProfileContext);
