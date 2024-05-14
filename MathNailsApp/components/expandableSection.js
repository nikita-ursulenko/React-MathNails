import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';
import { darkTheme, lightTheme } from '../assets/styles/styles';
import { useTheme } from '../context/ThemeProvider';


const ExpandableSection = ({ data }) => {
    const [expanded, setExpanded] = useState(false);
    const [showMoreDetails, setShowMoreDetails] = useState(false);
    const themeContext = useTheme();
    const { theme } = themeContext;
    const styles = theme === 'dark' ? darkTheme : lightTheme;
    
    const toggleMoreDetails = () => {
        setShowMoreDetails(!showMoreDetails);
    };
  
    const toggleExpand = () => {
      setExpanded(!expanded);
    };
  
    const dateFormatted = moment(data.date, 'DD.MM.YY').format('dddd, DD.MM.YY');
     // Преобразуем первую букву в заглавную
    const capitalizedDay = dateFormatted.charAt(0).toUpperCase() + dateFormatted.slice(1);
    const dayOfWeek = capitalizedDay.split(',')[0];
    const date = capitalizedDay.split(',')[1];

  
    return (
      <View style={styles.section}>
        <TouchableOpacity onPress={toggleExpand} style={styles.header}>
        <Text style={styles.headerText}>
            <Text style={[{ color: dayOfWeek.includes('Суббота') ? 'rgba(218, 23, 26, 1)' : styles.headerText }]}>
                {dayOfWeek}
            </Text>
            <Text style={[styles.headerTexts]}>
                {date}
            </Text>
        </Text>
            <AntDesign name={expanded ? "upcircle" : "downcircleo"} size={30} color={theme === 'dark' ? "white" : "black"}  />
        </TouchableOpacity>
        {expanded && (
          <View style={styles.content}>
            <Text style={styles.contentText}>Выручка: <Text style={{fontWeight: 600}}>{data.cost.toFixed(2)}€</Text></Text>
            <Text style={styles.contentText}>Прибыль: <Text style={{fontWeight: 600}}>{data.earnings.toFixed(2)}€</Text></Text>
            <Text style={styles.contentText}>Наличными: <Text style={{fontWeight: 600}}>{data.myBar.toFixed(2)}€</Text></Text>
            <Text style={styles.contentText}>Картой: <Text style={{fontWeight: 600}}>{data.moneySalon.toFixed(2)}€</Text></Text>
            <Text style={styles.contentText}>{data.debtStatus}: <Text style={{fontWeight: 600}}>{Math.abs(data.debt).toFixed(2)}€</Text></Text>
            <TouchableOpacity onPress={toggleMoreDetails} style={styles.moreDetailsButton}>
                <MaterialCommunityIcons 
                  name={showMoreDetails ? "dots-horizontal-circle" : "dots-horizontal-circle-outline"} 
                  size={40} 
                  color={theme === 'dark' ? "white" : "black"} 
                />
            </TouchableOpacity>
            {showMoreDetails && (
              <View style={{borderTopWidth: 2}}>
                <Text style={styles.contentText}>Чаевые: <Text style={{fontWeight: 600}}>{data.tips.toFixed(2)}€</Text></Text>
                <Text style={styles.contentText}>Чистая прибыль: <Text style={{fontWeight: 600}}>{data.netProfit.toFixed(2)}€</Text></Text>
              </View>
            )}
          </View>
        )}
      </View>
    );
  };

export default ExpandableSection;
