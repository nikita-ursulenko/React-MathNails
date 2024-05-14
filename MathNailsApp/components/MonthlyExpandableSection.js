import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { useTheme } from '../context/ThemeProvider';
import DailyDetails from './DailyDetails';
import { darkTheme, lightTheme } from '../assets/styles/styles';
import { AntDesign } from '@expo/vector-icons';

const MonthlyExpandableSection = ({ monthlyData }) => {
    const [expandedMonth, setExpandedMonth] = useState(null);
    const themeContext = useTheme();
    const { theme } = themeContext;
    const styles = theme === 'dark' ? darkTheme : lightTheme;

    return (
        <View style={styles.section}>
            {monthlyData && (
                <View key={monthlyData.label}>
                    <TouchableOpacity
                        onPress={() => setExpandedMonth(expandedMonth === monthlyData.label ? null : monthlyData.label)}
                        style={styles.header}
                    >
                        <Text style={styles.headerText}>{moment(monthlyData.label, 'MM.YYYY').format('MMMM YYYY').charAt(0).toUpperCase() + moment(monthlyData.label, 'MM.YYYY').format('MMMM YYYY').slice(1)}</Text>
                        <AntDesign name={expandedMonth === monthlyData.label ? "upcircle" : "downcircleo"} size={30} color={theme === 'dark' ? "white" : "black"}  />
                    </TouchableOpacity>
                    {expandedMonth === monthlyData.label && (
                        <View style={styles.content}>
                            {monthlyData.days.map(day => (
                                <DailyDetails key={day.date} data={day} />
                            ))}
                        </View>
                    )}
                </View>
            )}
        </View>
    );
};

export default MonthlyExpandableSection;
