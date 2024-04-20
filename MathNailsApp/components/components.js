import { StyleSheet, Button, TouchableOpacity, Text, Modal, View, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';

export const ButtonSpecial = ({ onPress, title, style }) => {return(
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
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

export const CustomModal = ({ visible, onClose, onAdd }) => {
  const [service, setService] = useState('');
  const [cost, setCost] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [notes, setNotes] = useState('');
  const [clientName, setClientName] = useState('');
  const [comments, setComments] = useState('');

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
    >
      <View style={styles.modalView}>
      <CloseModal onPress={onClose} />
        <TextInput
          style={styles.input}
          placeholder="Услуга"
          value={service}
          onChangeText={setService}
        />
        <TextInput
          style={styles.input}
          placeholder="Стоимость"
          value={cost}
          onChangeText={setCost}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Нал/Карта"
          value={paymentMethod}
          onChangeText={setPaymentMethod}
        />
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
        <ButtonSpecial title={"Добавить"} onPress={onAdd}/>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff', // Цвет фона кнопки
    paddingVertical: 12, // Вертикальный отступ
    paddingHorizontal: 24, // Горизонтальный отступ
    borderRadius: 5, // Радиус скругления углов
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
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    width: '100%',
    borderColor: 'gray'
  },
});


