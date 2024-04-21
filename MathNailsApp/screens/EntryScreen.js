import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { AddButton, CustomModal, } from '../components/components';

// Enable LayoutAnimation on Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ExpandableSection = ({ title, children }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleExpand} style={styles.sectionHeader}>
        <Text style={styles.headerText}>{title}</Text>
        <Text style={styles.headerIcon}>{expanded ? '↑' : '↓'}</Text>
      </TouchableOpacity>
      {expanded && <View style={styles.content}>{children}</View>}
    </View>
  );
};

const YourComponent = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  return (
    <View style={styles.container}>
      <ExpandableSection title="день.месяц.год">
        {/* Render your list of services here */}
        <Text style={styles.serviceItem}>Маникюр - 80€ - Card/Bar</Text>
        {/* Add more services as needed */}
      </ExpandableSection>
        <CustomModal visible={isModalVisible}  onClose={toggleModal} onAdd={toggleModal}/>
      <AddButton onPress={toggleModal}/>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  headerText: {
    fontSize: 16,
  },
  headerIcon: {
    fontSize: 16,
  },
  content: {
    padding: 20,
    backgroundColor: '#f9c2ff',
  },
  serviceItem: {
    fontSize: 14,
    paddingVertical: 5,
  },
});

export default YourComponent;
