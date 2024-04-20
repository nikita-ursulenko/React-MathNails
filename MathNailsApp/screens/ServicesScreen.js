import React, { useState, useEffect } from 'react';
import { View, Text, Button, Modal, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Импорт иконки из библиотеки Expo Icons
import { addService, getAllServices, deleteServiceById, updateServiceById } from '../data/data';
import { ButtonSpecial, AddButton, CloseModal } from '../components/components';

const ServicesScreen = () => {
  // Все переменные которые используюся по названию и логике
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [IsModalVisibleSelect, setIsModalVisibleSelect] = useState(false);
  const [IsModalVisibleSelectChange, setIsModalVisibleSelectChange] = useState(false);
  const [serviceName, setServiceName] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [services, setServices] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState(null);// ID выбранной услуги
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedService, setSelectedService] = useState('');

  useEffect(() => {
    loadServices();
    if (selectedService) {
      setServiceName(selectedService.name);
      setServicePrice(selectedService.cost ? selectedService.cost.toString() : '');
    };
}, [selectedService]);

  // Загрузка услуг
  const loadServices = async () => {
    try {
      const allServices = await getAllServices();
      setServices(allServices);
    } catch (error) {
      console.error('Ошибка загрузки услуг:', error);
    }
  };
  // Ручное добавления сервиса
  const handleAddService = async () => {
    try {
      await addService(serviceName, servicePrice);
      loadServices(); // Обновляем список услуг после добавления новой
      toggleModalAdd(); // Закрываем модальное окно
      setErrorMessage('');
    } catch (error) {
      if (error.message === 'serviceName and servicePrice should not be empty.') {
        setErrorMessage('serviceName and servicePrice')
      } else if (error.message === 'serviceName should not be empty.') {
        setErrorMessage('serviceName')
      } else if (error.message === 'servicePrice should be a valid number and should not be empty.') {
        setErrorMessage('servicePrice')
      }
    }
  };
  // Ручное удаление услуги 
  const handleDeleteService = async () => {
    try {
      // Удаление услуги из базы данных
      // Например, можно использовать функцию из вашего data.js
      // На основе переданного id
      console.log('Удаление услуги с id:', selectedServiceId);
      
      // Вызываем функцию удаления услуги
      await deleteServiceById(selectedServiceId);
  
      // После удаления обновляем список услуг
      await loadServices();
      
      // Закрываем модальное окно
      toggleModalSelect();
    } catch (error) {
      console.error('Ошибка при удалении услуги:', error);
    }
  };
  // Ручное изменение услуги
  const handleEditService = async () => {
    try {
    // Устанавливаем ID выбранной услуги и открываем модальное окно
    console.log('Изменение услуги с id:', selectedServiceId);
    await updateServiceById(selectedService.id, serviceName, servicePrice);
    loadServices();
    toggleModalChange();
    } catch (error) {
      console.error('Ошибка при изменению услуги:', error);
    }
  };
  // Рендеринг всех елементов для отображения
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity  onPress={() => toggleModalSelect(item)}>
        <View style={styles.servicesScreen}>
          <Text style={styles.nameStyle}>{item.name}</Text>
          <Text style={styles.costStyle}>{item.cost}€</Text>
        </View>
      </TouchableOpacity>
    );
  } ;
  // Функция для создания FlatList
  const renderFlatList = () => {
    return (
      <FlatList
        data={services}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  };
  // Модальное окно выбора 
  const toggleModalSelect = (item) => {
    setIsModalVisibleSelect(!IsModalVisibleSelect);
    if (item) {
    // Устанавливаем ID выбранной услуги и открываем модальное окно
    setSelectedServiceId(item.id);
    setSelectedService(item);
    return (
      <Text>{item.name}</Text>
    );
    } else {
      return null; // Возвращаем null, если item или item.name отсутствует
    }
  };
  // Модальное окно для изменения
  const toggleModalChange = () => {
    setIsModalVisibleSelectChange(!IsModalVisibleSelectChange);
  };
  // Модальное окно добавления
  const toggleModalAdd = () => {
    setIsModalVisible(!isModalVisible);
    setErrorMessage('');
    setServiceName('');
    setServicePrice('');
  };
  
  return (
    <View style={styles.container}>
      {/* Модальное окно для добавления новой услуги */}
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          {/* Крестик для закрытия модального окна */}
          <CloseModal onPress={toggleModalAdd} />
          {/* Форма ввода новой услуги */}
          <TextInput
            placeholder="Название услуги"
            value={serviceName}
            onChangeText={(text) => setServiceName(text)}
            style={[
              styles.input,
              // Условный стиль для изменения цвета обводки
              { borderColor: errorMessage === 'serviceName' || errorMessage === 'serviceName and servicePrice' ? 'red' : 'gray' },
            ]}
            />
          <TextInput
            placeholder="Цена услуги"
            value={servicePrice}
            onChangeText={(text) => setServicePrice(text)}
            keyboardType="numeric"
            style={[
              styles.input,
              // Условный стиль для изменения цвета обводки
              { borderColor: errorMessage === 'servicePrice' || errorMessage === 'serviceName and servicePrice' ? 'red' : 'gray' },
            ]}
            />
          {/* Кнопка "Добавить" */}
          <ButtonSpecial title="Добавить" onPress={handleAddService} />
        </View>
      </Modal>
      {/* Модальное окно для выбранной услуги */}
      <Modal visible={IsModalVisibleSelect} animationType="slide">
        <View>
          {/* Крестик для закрытия модального окна */}
          <CloseModal onPress={toggleModalSelect} />
          <View style={styles.modalContainer}>
          {selectedService && (
            <View style={styles.selectedServiceText}>
              {/* Другие детали выбранной услуги */}
              <View style={styles.selectedServiceTextView}>
                <Text style={styles.selectedServiceTextInner}>{selectedService.name}  <Text>{selectedService.cost}€</Text></Text>
              </View>
            </View>
          )}
            <View style={styles.selectedServiceButton}>
              <ButtonSpecial style={{width: "40%"}} 
              title="Изменить"
              onPress={() => {toggleModalSelect(); toggleModalChange()}}/>
              <Text>{"\n"}</Text>
              <ButtonSpecial style={{backgroundColor: "red", width: "40%"}} 
              title="Удалить" 
              onPress={handleDeleteService}/>
            </View>
          </View>
        </View>
      </Modal>
      {/* Модальное окно для изменения выбранной услуги */}
      <Modal visible={IsModalVisibleSelectChange} animationType="slide">
        <CloseModal onPress={toggleModalChange} />
        <View style={styles.changeView}>
          <TextInput
              placeholder="Название услуги"
              value={serviceName}
              onChangeText={(text) => setServiceName(text)}
              style={[
                styles.input,
                // Условный стиль для изменения цвета обводки
              ]}
              />
          <TextInput
            placeholder="Цена услуги"
            value={servicePrice}
            onChangeText={(text) => setServicePrice(text)}
            keyboardType="numeric"
            style={[
              styles.input,
            ]}
            />
            {/* Кнопка "Добавить" */}
            <ButtonSpecial title="Изменить" onPress={() => {
              handleEditService()}}/>
        </View>
      </Modal>
      {/* Кнопка добавления новой услуги */}
      <AddButton onPress={toggleModalAdd} />
      {/* Список услуг */}
      {/* Если есть услуги в базе данных, отображаем их */}
      <View style={styles.renderList}>
        {renderFlatList()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: "100%",
  },
  input: {
    borderWidth: 2,
    padding: 10,
    fontSize: 20,
    marginBottom: 30,
    borderRadius: 50,
    width: "80%",
  },
  renderList: {
    height: "100%",
  },
  servicesScreen: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
    padding: 10,
    borderBottomWidth: 2,
  },  
  nameStyle: {
    fontSize: 20,
  },
  costStyle: {
    fontSize: 24,
  },
  selectedServiceText: {
    flex: 1,
    justifyContent: "center",
  },
  selectedServiceTextView: {
    borderBottomWidth: 2,
    padding: 10,
  },
  selectedServiceTextInner: {
    textAlign: "center",
    fontSize: 24,
  },
  selectedServiceButton: {
    width: "100%",
    alignItems: "center",
    flex: 1,
  },
  changeView: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  },
});

export default ServicesScreen;
