import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, Platform, UIManager, ScrollView } from 'react-native';
import { AddButton, ButtonSpecial, CustomModal, ModalDialog } from '../components/components';
import { clearDataFromDB, deleteItemFromDB, getDataFromDB, saveDataToDB } from '../data/data';
import { AntDesign, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

// Компонент развернутого раздела
const ExpandableSection = ({ title, children, setSelectedDate, setSelectedIndex, setShowModal }) => {
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
            const icon = parts[4] === 'Bar' ? (
              <MaterialCommunityIcons name="cash-plus" size={40} color="green" />
            ) : (
              <FontAwesome name="credit-card-alt" size={24} color="blue" />
            );
            return (
              <TouchableOpacity style={styles.contentItem} key={index}  onPress={() => {
                setSelectedDate(title);
                setSelectedIndex(index);
                setShowModal(true);
              }}>
                <View style={{maxWidth: "60%"}}>
                  <Text style={styles.contentItemText}>{parts[8]}</Text>
                  <Text style={styles.contentItemText}>{parts[0]}</Text>
                  <Text style={styles.contentItemText}></Text>
                </View>
                <View style={{justifyContent: "flex-end"}}>
                  <Text style={{fontWeight: 700, fontSize: 24}}>{parts[2]}€  {icon}</Text>
                </View>
                {parts[6] ? 
                <View style={{ backgroundColor: "orange", padding: 5, borderRadius: 50,  alignContent: "center", justifyContent: "center", width: 70, height: 70, alignItems: "center"}}>
                  <Text style={{ fontSize: 20 }}>{parts[6]}</Text>
                </View> : ''}
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
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);

  
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
  //Ручное удаление данных
  const handleDeleteItem = async (date, index) => {
    // Удаление элемента из базы данных по индексу
    // Обновление данных на экране
    console.log('Deleted item:', date, index);
    await deleteItemFromDB(date, index);
    setShowModal(false);
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
            <ExpandableSection 
            key={date} title={date} 
            setSelectedDate={setSelectedDate}
            setSelectedIndex={setSelectedIndex}
            setShowModal={setShowModal}>
              {workDone[date].map((appointment, index) => {
                return (
                  <Text key={index} style={styles.serviceItem}>
                    {appointment.service.name} - {appointment.cost} - {appointment.paymentMethod} - {appointment.person} - {appointment.clientName}
                  </Text>
                );
              })}
            </ExpandableSection>
          ))}
        </View>
      </ScrollView>
      {modalContent}
      <AddButton onPress={toggleModal} />
      <ModalDialog
        visible={showModal}
        onClose={() => setShowModal(false)}
        onEdit={() => handleEditItem(selectedDate, selectedIndex)}
        onDelete={() => handleDeleteItem(selectedDate, selectedIndex)}
      />
      <ButtonSpecial onPress={clearDataFromDB}/>
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
    alignContent: "center",
    
  },
  contentItem: {
    backgroundColor: "#33B5FF",
    paddingHorizontal: 5,
    marginVertical: 5,
    borderRadius: 10,
    justifyContent: "space-between", 
    flexDirection: "row",
    alignItems: "center"
  },
  contentItemText: {
    fontSize: 24,
    
    padding: 0,
  },
  serviceItem: {
    fontSize: 14,
    paddingVertical: 5,
  },
});

export default YourComponent;
