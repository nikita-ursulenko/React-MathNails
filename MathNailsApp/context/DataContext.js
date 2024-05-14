import React, { createContext, useState, useContext } from 'react';

// Создание контекста данных
const DataContext = createContext();

// Провайдер данных, который будет обертывать главный компонент или часть приложения
export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  // Функция для обновления данных
  const updateData = async (loadDataFunction) => {
    const newData = await loadDataFunction();
    setData(newData);
  };

  return (
    <DataContext.Provider value={{ data, updateData }}>
      {children}
    </DataContext.Provider>
  );
};

// Хук для использования контекста данных в компонентах
export const useData = () => useContext(DataContext);
