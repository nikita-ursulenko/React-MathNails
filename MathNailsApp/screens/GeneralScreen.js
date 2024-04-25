import React from 'react';
import { Text, View } from 'react-native';
import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

export default function App() {
  const dateString = '24.04.24';
  const dayOfWeek = moment(dateString, 'YY.MM.DD').format('dddd');

  // Преобразуем первую букву в заглавную
  const capitalizedDay = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{capitalizedDay}</Text>
    </View>
  );
}
