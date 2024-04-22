import { StyleSheet, TouchableOpacity, Text, Modal, View, TextInput, CheckBox } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getAllServices } from '../data/data';
import { Picker } from '@react-native-picker/picker';

export const ButtonSpecial = ({ onPress, title, style, textStyle }) => {return(
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <Text style={[styles.button, textStyle]}>{title}</Text>
  </TouchableOpacity>
)};

export const AddButton = ({ onPress }) => {return (
    <TouchableOpacity style={styles.addButton} onPress={onPress}>
      <AntDesign name="plus" size={24} color="white" />
    </TouchableOpacity>
  );
};

export const CloseModal = ({ onPress }) => {return (
  <TouchableOpacity style={styles.closeButton} onPress={onPress}>
    <AntDesign name="closecircle" size={40} color="red" />
  </TouchableOpacity>
)};
// Для экрана EnrtyScreen.js прии добавления данных
export const CustomModal = ({ visible, onClose, onAdd }) => {
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



  useEffect(() => {
    const today = new Date();
    setDate(today);
    setFormattedDate(formatDate(today));
    console.log("Effect: ",date)
    getAllServices()
    .then((data) => setServices(data))
    .catch((error) => console.error('Error loading services:', error));
  }, []);

  const renderServiceItems = () => {
    return services.map((service, index) => (
      <Picker.Item key={index} label={`${service.name}`} value={service.id} />
    ));
  };

  const onChange = (selectedDate) => {
    setDate(selectedDate);
    setFormattedDate(formatDate(selectedDate));
    console.log("Эффект: ", selectedDate)
  };

  const formatDate = (date) => {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yy = String(date.getFullYear()).slice(-2);
    return `${dd}/${mm}/${yy}`;
  };

  const handleClearInput = () => {
    setDate(new Date());
    setFormattedDate(formatDate(new Date()));
    setSelectedService(null);
    setService('');
    setCost('');
    setPaymentMethod('Bar');
    setPayWithBar(true);
    setPayWithCard(false);
    setNotes('');
    setClientName('');
    setComments('');
  };

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

  const togglePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const togglePickerServices = () => {
    setSelectedService(null); // Сбрасываем выбранную услугу при закрытии модального окна
    setShowSelectedPicker(false);
  };

  const handleAdd = () => {
    // Ваши действия по добавлению данных
    const data = {
      service,
      cost,
      paymentMethod,
      notes,
      clientName,
      comments,
      date,
      formattedDate,
    };
    onAdd(data); // Вызываем переданную функцию onAdd с данными
    // onClose(); 
  };

  return {
    modalContent: (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
      >
      <View style={styles.modalView}>
        <CloseModal onPress={() => {onClose(); handleClearInput();}} />
        {showDatePicker && (
          <Modal>
            <View style={styles.centerStyle}>
              <DateTimePicker
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
            style={styles.input}
            onChangeText={setFormattedDate}
            value={formattedDate}
            onPressIn={togglePicker}
          />
          {showSelectedPicker && (
          <Modal>
            <View style={{height: "100%", justifyContent: "center"}}>
              <CloseModal onPress={togglePickerServices}/>
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
            style={styles.input}
            placeholder="Услуга"
            value={selectedService ? services[selectedService -1].name : null }
            onChangeText={setService}
            onPressIn={() => setShowSelectedPicker(true)}
          />
          <TextInput
            style={styles.input}
            placeholder="Стоимость"
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
              <Text style={styles.paragraph}>Bar</Text>
            </View>
            <View style={styles.section}>
                <AntDesign
                name={payWithCard ? 'checkcircle' : 'checkcircleo'}
                size={40}
                color="blue"
                onPress={() => handlePayMethod('Card')}
                style={styles.icon}
              />
              <Text style={styles.paragraph}>Card</Text>
            </View>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Чаевые"
            value={notes}
            onChangeText={setNotes}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Имя клиента"
            value={clientName}
            onChangeText={setClientName}
          />
          <TextInput
            style={styles.input}
            placeholder="Комментарии"
            value={comments}
            onChangeText={setComments}
          />
          <ButtonSpecial 
          style={{marginTop: 20, marginBottom: -20}}
          textStyle={{fontSize: 24}} 
          title={"Добавить"} 
          onPress={() => {handleAdd(); onClose(); handleClearInput(); }}/>
        </View>
      </Modal>
  ),
    data: {},
    onAdd: handleAdd, // Функция для добавления данных
  };
};

export const ModalDialog = ({ visible, onClose, onEdit, onDelete }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View>
        <View>
          <ButtonSpecial
            title="Изменить"
            onPress={onEdit}
            style={{ marginBottom: 10 }}
          />
          <ButtonSpecial title="Удалить" onPress={onDelete} />
        </View>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff', // Цвет фона кнопки
    paddingVertical: 6, // Вертикальный отступ
    paddingHorizontal: 12, // Горизонтальный отступ
    borderRadius: 5, // Радиус скругления углов
    alignItems: "center",
  },
  buttonText: {
    color: '#ffffff', // Цвет текста кнопки
    fontSize: 16, // Размер текста кнопки
    textAlign: 'center', // Выравнивание текста по центру
  },
  addButton: {
    zIndex: 999,
    position: 'absolute',
    bottom: 50,
    right: 20,
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    zIndex: 1,
    top: 60,
    right: 20,
  },
  modalView: {
    backgroundColor: "white",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    height: "100%",
    justifyContent: "center",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  input: {
    height: 50,
    marginVertical: 10,
    borderWidth: 2,
    padding: 10,
    fontSize: 20,
    borderRadius: 50,
    width: "95%",
  },
  centerStyle: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },



  container: {
    marginVertical: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  section: {
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 20,
  },
  checkbox: {
    margin: 8,
  },
});


