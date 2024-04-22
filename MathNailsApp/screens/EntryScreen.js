import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, Platform, UIManager, ScrollView } from 'react-native';
import { AddButton, ButtonSpecial, CustomModal } from '../components/components';
import { clearDataFromDB, deleteItemFromDB, getDataFromDB, saveDataToDB } from '../data/data';
import { AntDesign } from '@expo/vector-icons';

// Компонент развернутого раздела
const ExpandableSection = ({ title, children, handleDeleteItem }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleExpand} style={styles.sectionHeader}>
        <Text style={styles.headerText}>{title}</Text>
        {expanded ? (
          <AntDesign name="upcircle" size={30} color="black" />
        ) : (
          <AntDesign name="downcircleo" size={30} color="black" />
        )}
      </TouchableOpacity>
      {expanded && (
        <View style={styles.content}>
          {React.Children.map(children, (child, index) => {
            // Разделяем содержимое child на отдельные элементы
            const parts = child.props.children;
            return (
              <TouchableOpacity style={styles.contentItem} key={index} onPress={() => handleDeleteItem(title, index)}>
                <Text style={styles.contentItemText}>{parts[0]} </Text>
                <Text style={styles.contentItemText}>{parts[2]}€ {parts[4]}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

const YourComponent = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [workDone, setWorkDone] = useState({});

  
  useEffect(() => {
    const loadWorkDone = async () => {
      try {
        const workDoneData = await getDataFromDB();
        if (workDoneData) {
          const sortedWorkDone = Object.keys(workDoneData)
          .sort((a, b) => new Date(b) - new Date(a))
          .reduce((acc, key) => {
            acc[key] = workDoneData[key];
            return acc;
          }, {});
          setWorkDone(sortedWorkDone);
        } else {
          console.log('No data found in the database.');
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    
    loadWorkDone();
  }, []);
  
  // Состояние модального окна
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const toggleModalEdit =() => {

  };
  //Ручное удаление данных
  const handleDeleteItem = async (date, index) => {
    // Удаление элемента из базы данных по индексу
    // Обновление данных на экране
    console.log('Deleted item:', date, index);
    await deleteItemFromDB(date, index);
    loadWorkDone();
  };
  // Ручное добавление данных
  const handleAdd = async (data) => {
    // Здесь вы можете использовать полученные данные
    console.log('Received data:', data);
    await saveDataToDB(data);
    loadWorkDone();
  };
  // Получение данных, из компонент
  const { modalContent } = CustomModal({
    visible: isModalVisible,
    onClose: toggleModal,
    onAdd: handleAdd,
  });
  // Загрузка данных из ДБ
  const loadWorkDone = async () => {
    const workDoneList = await getDataFromDB();
    if (workDoneList) {
      console.log('Work done:', workDoneList);
      setWorkDone(workDoneList);
    } else {
      console.log('No data found in the database.');
    }
  };

  return (
    <View style={styles.container} animationType="slide">
      <ScrollView>
        <View style={styles.container}>
          {Object.keys(workDone).map((date) => (
            <ExpandableSection key={date} title={date} handleDeleteItem={handleDeleteItem}>
              {workDone[date].map((appointment, index) => {
                return (
                  <Text key={index} style={styles.serviceItem}>
                    {appointment.service.name} - {appointment.cost} - {appointment.paymentMethod}
                  </Text>
                );
              })}
            </ExpandableSection>
          ))}
        </View>
      </ScrollView>
      {modalContent}
      <AddButton onPress={toggleModal} />
      <ButtonSpecial title={'удалить'} onPress={clearDataFromDB} />
      <ButtonSpecial title={'показать'} onPress={loadWorkDone} style={{marginVertical: 20}}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
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
    fontSize: 20,
  },
  content: {
    padding: 10,
    backgroundColor: '#f9c2ff',
  },
  contentItem: {
    backgroundColor: "#33B5FF",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    justifyContent: "space-between", 
    flexDirection: "row"
  },
  contentItemText: {
    fontSize: 20,
  },
  serviceItem: {
    fontSize: 14,
    paddingVertical: 5,
  },
});

export default YourComponent;
