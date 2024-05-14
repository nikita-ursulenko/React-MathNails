import { StyleSheet, TouchableOpacity, Text, Modal, View, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import DataBase from '../data/data';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../context/ThemeProvider';
import { darkThemeComponents, lightThemeComponents } from '../assets/styles/StylesComponents';


export const ButtonSpecial = ({ onPress, title, style, textStyle }) => {
  const themeContext = useTheme();
  const { theme } = themeContext;
  const styles = theme === 'dark' ? darkThemeComponents : lightThemeComponents;
  return(
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <Text style={[styles.button, textStyle, {color: theme === 'dark' ? 'white' : 'black'}]}>{title}</Text>
  </TouchableOpacity>
)};

export const AddButton = ({ onPress }) => {
  const themeContext = useTheme();
  const { theme } = themeContext;
  const styles = theme === 'dark' ? darkThemeComponents : lightThemeComponents;
  return (
    <TouchableOpacity style={styles.addButton} onPress={onPress}>
      <AntDesign name="plus" size={24} color="white" />
    </TouchableOpacity>
  );
};

export const CloseModal = ({ onPress }) => {
  const themeContext = useTheme();
  const { theme } = themeContext;
  const styles = theme === 'dark' ? darkThemeComponents : lightThemeComponents;
  return (
  <TouchableOpacity style={styles.closeButton} onPress={onPress}>
    <AntDesign name="closecircle" size={40} color="red" />
  </TouchableOpacity>
)};
// Для экрана EnrtyScreen.js прии добавления данных
export const CustomModal = ({ visible, onClose, onAdd, onEdit, appointmentData, addButton }) => {
  const [service, setService] = useState('');
  const [cost, setCost] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Bar');
  const [notes, setNotes] = useState('');
  const [clientName, setClientName] = useState('');
  const [comments, setComments] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [showSelectedPicker, setShowSelectedPicker] = useState(false);
  const [payWithBar, setPayWithBar] = useState(true);
  const [payWithCard, setPayWithCard] = useState(false);
  const [person, setPerson] = useState('');
  const themeContext = useTheme();
  const { theme } = themeContext;
  const styles = theme === 'dark' ? darkThemeComponents : lightThemeComponents;

  useEffect(() => {
    const today = new Date();
    setDate(today);
    setFormattedDate(formatDate(today));
    DataBase.Services.getAllServices()
    .then((data) => setServices(data))
    .catch((error) => console.error('Error loading services:', error));
  }, []);

  useEffect(() => {
    if (appointmentData.selectedDate && appointmentData.selectedIndex !== -1) {
      const appointment = appointmentData.workDone[appointmentData.selectedDate][appointmentData.selectedIndex];
      setService(appointment.service);
      setSelectedService(appointment.service.id)
      setCost(appointment.cost);
      handlePayMethod(appointment.paymentMethod);
      setPerson(appointment.person)
      setNotes(appointment.notes);
      setClientName(appointment.clientName);
      setComments(appointment.comments);
      setFormattedDate(formatDate(new Date(appointment.date)));
      setDate(new Date(appointment.date));
    }
  }, [appointmentData.showModal]);

  useEffect(() => {
    DataBase.Services.getAllServices()
    .then((data) => setServices(data))
    .catch((error) => console.error('Error loading services:', error));
  }, [showSelectedPicker]);

  //Вывод услуг 
  const renderServiceItems = () => {
    return services.map((service, index) => (
      <Picker.Item key={index} label={`${service.name}`} value={service.id} color={theme === 'dark' ? 'white' : 'black'}/>
    ));
  };
  //Изменение выбранной даты
  const onChange = (selectedDate) => {
    setDate(selectedDate);
    setFormattedDate(formatDate(selectedDate));
    console.log("Эффект: ", selectedDate)
  };
  //Форматирование данных
  const formatDate = (date) => {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yy = String(date.getFullYear()).slice(-2);
    return `${dd}.${mm}.${yy}`;
  };
  //Ручная очистка полей 
  const handleClearInput = () => {
      setDate(new Date());
      setFormattedDate(formatDate(new Date()));
      setSelectedService(null);
      setService('');
      setCost('');
      setPaymentMethod('Bar');
      setPerson('');
      setPayWithBar(true);
      setPayWithCard(false);
      setNotes('');
      setClientName('');
      setComments('');
      console.log("Очистка")
  };
  //Метод оплаты определение
  const handlePayMethod = (method) => {
    if (method === 'Bar') {
      setPayWithBar(true);
      setPayWithCard(false);
      setPaymentMethod('Bar');
    } else {
      setPayWithBar(false);
      setPayWithCard(true);
      setPaymentMethod('Card');
    }
  };
  //Переключатель Дата
  const togglePicker = () => {
    setShowDatePicker(!showDatePicker);
  };
  // В CustomModal
  const handleEditButtonPress = () => {
    const updatedData = {
      service,
      cost,
      paymentMethod,
      person,
      notes,
      clientName,
      comments,
      date: date.toISOString(),
      formattedDate: formatDate(date)
    };
    onEdit(updatedData); // Передаем новые данные в функцию редактирования из EntryScreen
  };
  // Передача данных для добавления
  const handleAdd = () => {
    // Ваши действия по добавлению данных
    const data = {
      service,
      cost,
      paymentMethod,
      person,
      notes,
      clientName,
      comments,
      date,
      formattedDate,
    };
    onAdd(data); // Вызываем переданную функцию onAdd с данными
    // onClose();
    console.log("Тут вот так вот добавляем")
  };

  return {
    modalContent: (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        style={{backgroundColor: "red"}}
      >
      <KeyboardAvoidingView style={{ flex: 10 }} behavior={Platform.OS === "ios" ? "padding" : null}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.modalView}>
        <CloseModal onPress={() => {onClose(); handleClearInput();}} />
        {showDatePicker && (
          <Modal>
            <View style={styles.centerStyle}>
              <DateTimePicker
                textColor={theme === 'dark' ? 'white' : 'black'}
                testID="dateTimePicker"
                value={date}
                mode="date"
                display="spinner"
                onChange={(event, selectedDate) => onChange(selectedDate)}
              />
              <ButtonSpecial 
              title="Подтвердить" 
              onPress={() => {togglePicker();}}
              style={{marginTop: "30%"}}
              />
            </View>
          </Modal>
          )}
          <TextInput
            style={[styles.text, styles.input]}
            onChangeText={setFormattedDate}
            value={formattedDate}
            onPressIn={togglePicker}
          />
          {showSelectedPicker && (
          <Modal>
            <View style={[{height: "100%", justifyContent: "center"}, styles.viewBlack]}>
              <Picker 
                  selectedValue={selectedService}
                  onValueChange={(itemValue) => {
                    console.log("Selected service:", services[itemValue -1]);
                    setSelectedService(itemValue);
                    setService(services[itemValue - 1])
                    setCost(services[itemValue - 1].cost.toString());
                  }}>
                  {renderServiceItems()}
              </Picker>
              <View style={{alignItems: "center"}}>
                <ButtonSpecial 
                title={"Подтвердить"} 
                style={{width: "40%", }}
                onPress={() => {
                  setShowSelectedPicker(false);
                  if (!selectedService) {
                    setSelectedService(services[0].id);
                    setService(services[0]);
                    setCost(services[0].cost.toString());
                  }
                }}
                />
              </View>
            </View>
          </Modal>
          )}
          <TextInput
            style={[styles.text, styles.input]}
            placeholder="Услуга"
            placeholderTextColor={theme === 'dark' ? 'gray' : 'lightgray'}
            value={selectedService ? services[selectedService -1].name : null }
            onChangeText={setService}
            onPressIn={() => setShowSelectedPicker(true)}
          />
          <TextInput
            style={[styles.text, styles.input]}
            placeholder="Стоимость"
            placeholderTextColor={theme === 'dark' ? 'gray' : 'lightgray'}
            value={cost}
            onChangeText={setCost}
            keyboardType="numeric"
          />
          <View style={styles.container}>
            <View style={styles.section}>
                <AntDesign
                name={payWithBar ? 'checkcircle' : 'checkcircleo'}
                size={40}
                color="green"
                onPress={() => handlePayMethod('Bar')}
                style={styles.icon}
              />
              <Text style={[styles.text, styles.paragraph]}>Bar</Text>
            </View>
            <View style={styles.section}>
                <AntDesign
                name={payWithCard ? 'checkcircle' : 'checkcircleo'}
                size={40}
                color="blue"
                onPress={() => handlePayMethod('Card')}
                style={styles.icon}
              />
              <Text style={[styles.text,styles.paragraph]}>Card</Text>
            </View>
          </View>
          <TextInput
            style={[styles.text, styles.input]}
            placeholder="Имя клиента"
            placeholderTextColor={theme === 'dark' ? 'gray' : 'lightgray'}
            value={clientName}
            onChangeText={setClientName}
          />
          <TextInput
            style={[styles.text, styles.input]}
            placeholder="Кто принял оплату"
            placeholderTextColor={theme === 'dark' ? 'gray' : 'lightgray'}
            value={person}
            onChangeText={setPerson}
          />
          <TextInput
            style={[styles.text, styles.input]}
            placeholder="Чаевые"
            placeholderTextColor={theme === 'dark' ? 'gray' : 'lightgray'}
            value={notes}
            onChangeText={setNotes}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.text, styles.input]}
            placeholder="Комментарии"
            placeholderTextColor={theme === 'dark' ? 'gray' : 'lightgray'}
            value={comments}
            onChangeText={setComments}
          />
          <ButtonSpecial 
          style={{marginTop: 20, marginBottom: -20}}
          textStyle={{fontSize: 24}} 
          title={addButton ? "Добавить" : "Редактировать"}
          onPress={() => {
            if (addButton) {
              handleAdd();
            } else {
              handleEditButtonPress();
            }
            onClose(); handleClearInput();
          }}/>
        </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
  ),
    data: {},
    onAdd: handleAdd,
    handleClearInput, // Функция для добавления данных
  };
};

export const ModalDialog = ({ visible, onClose, onEdit, onDelete, appointmentData }) => {
  const themeContext = useTheme();
  const { theme } = themeContext;
  const styles = theme === 'dark' ? darkThemeComponents : lightThemeComponents;
  // Проверка на наличие appointmentData и соответствующих данных
  const appointment = appointmentData && 
  appointmentData.workDone &&
  appointmentData.workDone[appointmentData.selectedDate] &&
  appointmentData.workDone[appointmentData.selectedDate][appointmentData.selectedIndex];
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalView}>
        <CloseModal onPress={() => { onClose(); }} />
        <View>
        {appointment && (
            <Text style={[styles.text ,{fontSize: 20, lineHeight: 35}]}>
              {/* Вывод информации о выбранном приеме */}
              {appointment.formattedDate && <Text>{appointment.formattedDate} {'\n'}</Text>}
              {appointment.service?.name && <Text>{appointment.service.name} {'\n'}</Text>}
              {appointment.cost && <Text>Цена: {appointment.cost}€ {'\n'}</Text>}
              {appointment.paymentMethod && <Text>Метод оплаты: {appointment.paymentMethod} {'\n'}</Text>}
              {appointment.person && <Text>Кто принял оплату: {appointment.person} {'\n'}</Text>}
              {appointment.notes && <Text>Чаевые: {appointment.notes} {'\n'}</Text>}
              {appointment.clientName && <Text>Имя клиента: {appointment.clientName} {'\n'}</Text>}
              {appointment.comments && <Text>Комментарий: {appointment.comments} {'\n'}</Text>}
            </Text>
          )}
        </View>
        <View style={{flexDirection: "row", justifyContent: "space-between", width: "100%"}}>
          <ButtonSpecial
            title="Изменить"
            onPress={onEdit}
            textStyle={{fontSize: 20}} 
          />
          <ButtonSpecial 
            title="Удалить" 
            style={{backgroundColor: "red"}} 
            textStyle={{fontSize: 20, backgroundColor: "red"}} 
            onPress={onDelete} 
          />
        </View>
      </View>
    </Modal>
  );
};




