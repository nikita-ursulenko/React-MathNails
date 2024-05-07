import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import DataBase from '../data/data';
import { ButtonSpecial, AddButton, CloseModal } from '../components/components';
import { useTheme } from '../context/ThemeProvider';
import { darkTheme, lightTheme } from '../assets/styles/styles';

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

  const themeContext = useTheme();
  const { theme } = themeContext;
  const styles = theme === 'dark' ? darkTheme : lightTheme;

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
      const allServices = await DataBase.Services.getAllServices();
      setServices(allServices);
    } catch (error) {
      console.error('Ошибка загрузки услуг:', error);
    }
  };
  // Ручное добавления сервиса
  const handleAddService = async () => {
    try {
      await DataBase.Services.addService(serviceName, servicePrice);
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
      // Вызываем функцию удаления услуги
      await DataBase.Services.deleteServiceById(selectedServiceId);

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
      await DataBase.Services.updateServiceById(selectedService.id, serviceName, servicePrice);
      loadServices();
      toggleModalChange();
    } catch (error) {
      console.error('Ошибка при изменении услуги:', error);
    }
  };
  // Рендеринг всех елементов для отображения
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity  onPress={() => toggleModalSelect(item)}>
        <View style={styles.servicesScreen}>
          <Text style={[styles.text,styles.nameStyle]}>{item.name}</Text>
          <Text style={[styles.text,styles.costStyle]}>{item.cost}€</Text>
        </View>
      </TouchableOpacity>
    );
  };
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
    setSelectedServiceId(item.id);
    setSelectedService(item); 
    console.log(item.id)// Обновляем выбранную услугу
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
            placeholderTextColor={theme === 'dark' ? 'gray' : 'lightgray'}
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
            placeholderTextColor={theme === 'dark' ? 'gray' : 'lightgray'}
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
          <CloseModal onPress={() => toggleModalSelect()} />
          <View style={styles.modalContainer}>
            {selectedService && (
              <View style={styles.selectedServiceText}>
                {/* Другие детали выбранной услуги */}
                <View style={styles.selectedServiceTextView}>
                  <Text style={[styles.text, styles.selectedServiceTextInner]}>{selectedService.name}  <Text style={styles.text}>{selectedService.cost}€</Text></Text>
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
              onPress={handleDeleteService}
              textStyle={{backgroundColor: "red"}}/>
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
              placeholderTextColor={theme === 'dark' ? 'white' : 'white'}
              value={serviceName}
              onChangeText={(text) => setServiceName(text)}
              style={[
                styles.text,
                styles.input,
              ]}
              />
          <TextInput
            placeholder="Цена услуги"
            placeholderTextColor={theme === 'dark' ? 'gray' : 'lightgray'}
            value={servicePrice}
            onChangeText={(text) => setServicePrice(text)}
            keyboardType="numeric"
            style={[
              styles.text,
              styles.input,
            ]}
            />
            {/* Кнопка "Добавить" */}
            <ButtonSpecial title="Изменить" onPress={handleEditService}/>
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

export default ServicesScreen;
