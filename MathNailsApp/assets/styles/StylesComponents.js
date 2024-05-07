import { StyleSheet } from 'react-native';

export const components = StyleSheet.create({
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
      height: "100%",
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

export const lightThemeComponents = StyleSheet.create({
    ...components,
});

export const darkThemeComponents = StyleSheet.create({
    ...components,
    modalView: {
        ...components.modalView,
        backgroundColor: "black",
    },
    text: {
        color: "white",
    },
    input: {
        ...components.input,
        borderColor: "gray"
    },
    centerStyle: {
        ...components.centerStyle,
        backgroundColor: "black",
    },
    viewBlack: {
        backgroundColor: "black",
    }
})