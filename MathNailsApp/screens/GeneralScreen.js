// GeneralScreen.js

import React, { useState, useEffect } from 'react';
import { View, FlatList, RefreshControl, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExpandableSection from '../components/expandableSection';
import moment from 'moment';
import 'moment/locale/ru';
import { useTheme } from '../context/ThemeProvider';
import { darkTheme, lightTheme } from '../assets/styles/styles';
import EntryScreen from './EntryScreen';
import { useData } from '../context/DataContext';
import MonthlyExpandableSection from '../components/MonthlyExpandableSection';


moment.locale('ru');

const loadDataFromDB = async () => {
  try {
    const dataString = await AsyncStorage.getItem('workDone');
    const data = JSON.parse(dataString) || {};
    const commissionRate = await getCommissionRate();

    const formattedData = Object.keys(data).map(date => {
      let cost = 0,
        tips = 0,
        myBar = 0,
        moneySalon = 0,
        earnings = 0;
      data[date].forEach(item => {
        const itemCost = parseFloat(item.cost);
        const itemTips = parseFloat(item.notes || '0');
        cost += itemCost;
        tips += itemTips;
        earnings += itemCost * commissionRate;

        if (item.paymentMethod === 'Bar' && item.person === '') {
          myBar += itemCost;
        } else if (item.paymentMethod === 'Card' || item.person !== '') {
          moneySalon += itemCost;
        }
      });

      const netProfit = earnings + tips;
      const debt = myBar - earnings;
      let debtStatus;
      if (debt > 0) {
        debtStatus = 'Долг мастера'; // Мы должны салону
      } else if (debt < 0) {
        debtStatus = 'Долг салона'; // Нам должен салон
      } else {
        debtStatus = 'Никто никому не должен'; // Никто никому не должен
      }

      return {
        date,
        cost,
        tips,
        earnings,
        netProfit,
        myBar,
        moneySalon,
        debt,
        debtStatus,
      };
    });

    return formattedData.sort((a, b) => moment(b.date, 'DD.MM.YY') - moment(a.date, 'DD.MM.YY'));
  } catch (e) {
    console.error('Failed to load data', e);
    return [];
  }
};

const getCommissionRate = async () => {
  try {
    const masterDataString = await AsyncStorage.getItem('masterData');
    const masterData = JSON.parse(masterDataString);
    return masterData && masterData.commissionRate ? masterData.commissionRate / 100 : 0.4;
  } catch (error) {
    console.error('Error loading commission rate:', error);
    return 0.4;
  }
};

const transformData = (data) => {
  const transformedData = {};
  data.forEach(item => {
      const month = moment(item.date, 'DD.MM.YY').format('MM.YYYY');
      if (!transformedData[month]) {
          transformedData[month] = [];
      }
      transformedData[month].push(item);
  });

  const result = Object.keys(transformedData).map(month => ({
      label: month,
      days: transformedData[month]
  }));

  return result;
};

const MainScreen = () => {
  const { data, updateData } = useData();
  const [datesData, setDatesData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const themeContext = useTheme();
  const { theme } = themeContext;
  const styles = theme === 'dark' ? darkTheme : lightTheme;

  useEffect(() => {
    updateData(loadDataFromDB);
  }, [data]);

  const onRefresh = async () => {
    setRefreshing(true);
    await updateData(loadDataFromDB);
    setRefreshing(false);
  };

const transformedData = transformData(data);

  return (
    <View>
            <EntryScreen reloadMainScreen={onRefresh} />
            {transformedData.length > 0 ? (
                <FlatList
                    style={{ height: '100%' }}
                    data={transformedData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <MonthlyExpandableSection monthlyData={item} />}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#9Bd35A', '#689F38']} />
                    }
                />
            ) : (
                <Text style={{textAlign: "center"}}>Нет данных для отображения</Text>
            )}
        </View>
  );
};

export default MainScreen;
