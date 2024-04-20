
import AsyncStorage from '@react-native-async-storage/async-storage';

// Данные для профиля
export async function updateMasterData(firstName, lastName, commissionRate) {
  const masterData = {
    firstName: firstName,
    lastName: lastName,
    commissionRate: commissionRate,
  };
  
  try {
    await AsyncStorage.setItem('masterData', JSON.stringify(masterData));
    console.log('Master data saved successfully.');
  } catch (error) {
    console.error('Error saving master data:', error);
  }
};

// Ключ для хранения данных услуг в AsyncStorage
const SERVICES_STORAGE_KEY = 'services';

// Функция для проверки входных данных услуги
export function validateServiceInput(serviceName, servicePrice) {
    if (!serviceName && !servicePrice) {
        throw new Error('serviceName and servicePrice should not be empty.');
    } else if (!serviceName) { // Если отсутствует название услуги
        throw new Error('serviceName should not be empty.');
    } else if (!servicePrice || isNaN(servicePrice)) { // Если отсутствует цена услуги или она не является числом
        throw new Error('servicePrice should be a valid number and should not be empty.');
    }
};

// Функция для добавления новой услуги
export async function addService(serviceName, servicePrice) {
  try {
    // Проверяем входные данные перед добавлением новой услуги
    validateServiceInput(serviceName, servicePrice);

    // Получаем текущий список услуг из AsyncStorage
    const currentServices = await getAllServices();

    // Находим максимальный идентификатор из существующих записей
    const maxId = currentServices.reduce((max, service) => {
      return Math.max(max, service.id);
    }, 0);

    // Генерируем новый уникальный идентификатор
    const newId = maxId + 1;

    // Создаем объект новой услуги
    const newService = {
      id: newId,
      name: serviceName,
      cost: +servicePrice, // Преобразуем в число
    };

    // Обновляем список услуг, добавляя новую услугу
    const updatedServices = [...currentServices, newService];

    // Сохраняем обновленный список услуг в AsyncStorage
    await AsyncStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(updatedServices));

    // Возвращаем обновленный список услуг
    return updatedServices;
  } catch (error) {
    console.error('Error adding service:', error);
    throw error;
  }
};

// Функция для получения всех услуг из AsyncStorage
export async function getAllServices() {
  try {
    // Получаем данные услуг из AsyncStorage
    const servicesJson = await AsyncStorage.getItem(SERVICES_STORAGE_KEY);
    // Если данные есть, парсим их из JSON
    const services = servicesJson ? JSON.parse(servicesJson) : [];

    // Выводим полученные данные в консоль для отладки
    console.log(services);

    // Возвращаем список услуг
    return services;
  } catch (error) {
    console.error('Error getting services:', error);
    throw error;
  }
};

// Функция для удаления услуги по идентификатору
export async function deleteServiceById(id) {
    try {
      // Получаем текущий список услуг из AsyncStorage
      const currentServices = await getAllServices();
  
      // Фильтруем список, оставляя только те услуги, чей id не совпадает с переданным id
      const updatedServices = currentServices.filter(service => service.id !== id);
  
      // Сохраняем обновленный список услуг в AsyncStorage
      await AsyncStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(updatedServices));
  
      // Возвращаем обновленный список услуг после удаления
      return updatedServices;
    } catch (error) {
      console.error('Error deleting service:', error);
      throw error;
    }
  };

// Функция для изменения услуги по id
export async function updateServiceById(id, newName, newCost) {
    try {
      // Получаем текущий список услуг из AsyncStorage
      const currentServices = await getAllServices();
  
      // Находим индекс услуги в массиве по ее id
      const index = currentServices.findIndex(service => service.id === id);
  
      // Если услуга с таким id найдена, обновляем ее
      if (index !== -1) {
        // Создаем копию обновляемой услуги
        const updatedService = { ...currentServices[index] };
        
        // Обновляем значения имени и цены
        updatedService.name = newName;
        updatedService.cost = +newCost;
  
        // Обновляем список услуг, заменяя старую услугу на обновленную
        currentServices[index] = updatedService;
  
        // Сохраняем обновленный список услуг в AsyncStorage
        await AsyncStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(currentServices));
  
        // Возвращаем обновленный список услуг
        return currentServices;
      } else {
        // Если услуга с таким id не найдена, выбрасываем ошибку
        throw new Error(`Service with id ${id} not found.`);
      }
    } catch (error) {
      console.error('Error updating service:', error);
      throw error;
    }
  }
  