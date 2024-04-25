import {useState, useEffect, useRef} from 'react';
import { Image, View, Text } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfilScreen from './screens/ProfilScreen';
import SettingsScreen from './screens/SettingsScreen';
import HistoryScreen from './screens/HistoryScreen';
import GeneralScreen from './screens/GeneralScreen';
import EntryScreen from './screens/EntryScreen';
import ServicesScreen from './screens/ServicesScreen';
import StaticScreen from './screens/StaticScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

// Функция для загрузки значения из AsyncStorage
const loadMasterData = async () => {
  try {
    // Получаем значение по ключу 'masterData'
    const masterDataString = await AsyncStorage.getItem('masterData');
    return JSON.parse(masterDataString); // Возвращаем полученное значение в виде объекта
  } catch (error) {
    console.error('Ошибка при загрузке данных из AsyncStorage:', error);
    throw error; // Пробрасываем ошибку дальше
  }
};

// Компонент с иконкой профиля и описанием
const ProfileIconWithDescription = () => {
  const navigationRef = useRef();
  // Стейт для хранения загруженных данных
  const [masterData, setMasterData] = useState(null);

  // Эффект, который выполняется при монтировании компонента
  useEffect(() => {
    const unsubscribe = navigationRef.current?.addListener('focus', () => {
      fetchData();
    });
    // Функция для асинхронной загрузки данных
    const fetchData = async () => {
      try {
        // Загружаем данные из AsyncStorage
        const masterData = await loadMasterData();
        // Обновляем состояние с загруженными данными
        setMasterData(masterData);
      } catch (error) {
        console.error('Ошибка при загрузке данных из AsyncStorage:', error);
      }
    };

    // Вызываем функцию загрузки данных
    fetchData();
  }, [navigationRef]); // Пустой массив зависимостей, чтобы эффект выполнялся только один раз при монтировании компонента

  return (
  <View style={{width: "100%", height: "100%", alignItems: 'center'}}>
      {/* Изображение профиля */}
      <Image 
        source={require('./assets/profil.png')} // Путь к вашей картинке
        style={{ width: 60, height: 60}} // Размеры изображения
      />
      {/* Описание под изображением */}
      {masterData ? (
        <Text>{'\n'}{masterData.firstName} {masterData.lastName}</Text>
      ) : (
        <Text>{'\n'}Профиль</Text>
      )}
  </View>
  );
}
  

export default function App() {

    return (
        <NavigationContainer>
        <Drawer.Navigator initialRouteName="Entry" >
          <Drawer.Screen 
          name='Profil' 
          component={ProfilScreen} 
          options={{
              title: "Профиль",
              drawerLabel: "",
              drawerIcon: () => (
                  <ProfileIconWithDescription />
                ),
              drawerActiveBackgroundColor: "white",
          }}/>
            <Drawer.Screen 
             name='General' 
             component={GeneralScreen}
             options={{ title: "Главная", }}/>
            <Drawer.Screen 
            name='Entry' 
            component={EntryScreen}
            options={{ title: "Ввод данных" }} />
            <Drawer.Screen 
            name='Services' 
            component={ServicesScreen} 
            options={{title: "Услуги"}}/>
            <Drawer.Screen 
            name='History' 
            component={HistoryScreen} 
            options={{title: "История"}}/>
            <Drawer.Screen 
            name='Static' 
            component={StaticScreen} 
            options={{title: "Статистика"}}/>
            <Drawer.Screen
            name='Settings' 
            component={SettingsScreen} 
            options={{title: "Настройки"}}
            />
        </Drawer.Navigator>
      </NavigationContainer>
    );
}
