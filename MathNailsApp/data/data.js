
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

const SERVICES_STORAGE_KEY = '@services';

export default class DataBase {
  // Класс для работы с услугами
  static Services = class {
    // Функция для проверки входных данных услуги
    static validateServiceInput(serviceName, servicePrice) {
      if (!serviceName && !servicePrice) {
        throw new Error('serviceName and servicePrice should not be empty.');
      } else if (!serviceName) { // Если отсутствует название услуги
        throw new Error('serviceName should not be empty.');
      } else if (!servicePrice || isNaN(servicePrice)) { // Если отсутствует цена услуги или она не является числом
        throw new Error('servicePrice should be a valid number and should not be empty.');
      }
    }

    // Функция для добавления новой услуги
    static async addService(serviceName, servicePrice) {
      try {
        // Проверяем входные данные перед добавлением новой услуги
        this.validateServiceInput(serviceName, servicePrice);

        // Получаем текущий список услуг из AsyncStorage
        const currentServices = await this.getAllServices();

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
    }

    // Функция для получения всех услуг из AsyncStorage
    static async getAllServices() {
      try {
        // Получаем данные услуг из AsyncStorage
        const servicesJson = await AsyncStorage.getItem(SERVICES_STORAGE_KEY);
        // Если данные есть, парсим их из JSON
        const services = servicesJson ? JSON.parse(servicesJson) : [];

        // Возвращаем список услуг
        return services;
      } catch (error) {
        console.error('Error getting services:', error);
        throw error;
      }
    }

    // Функция для удаления услуги по идентификатору
    static async deleteServiceById(id) {
      try {
        // Получаем текущий список услуг из AsyncStorage
        const currentServices = await this.getAllServices();

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
    }

    // Функция для обновления услуги по идентификатору
    static async updateServiceById(id, serviceName, servicePrice) {
      try {
        // Проверяем входные данные перед обновлением услуги
        this.validateServiceInput(serviceName, servicePrice);

        // Получаем текущий список услуг из AsyncStorage
        const currentServices = await this.getAllServices();

        // Находим индекс услуги в списке по ее id
        const serviceIndex = currentServices.findIndex(service => service.id === id);

        if (serviceIndex !== -1) {
          // Создаем обновленную версию услуги
          const updatedService = {
            id: id,
            name: serviceName,
            cost: +servicePrice,
          };

          // Обновляем услугу в списке
          currentServices[serviceIndex] = updatedService;

          // Сохраняем обновленный список услуг в AsyncStorage
          await AsyncStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(currentServices));

          // Возвращаем обновленный список услуг после обновления
          return currentServices;
        } else {
          throw new Error(`Service with id ${id} not found.`);
        }
      } catch (error) {
        console.error('Error updating service:', error);
        throw error;
      }
    }
  };

  // Класс для работы с данными
  static WorkDone = class {
    // Сохранение данных в базу данных
    static async saveDataToDB(data) {
      try {
        const formattedDate = data.formattedDate;
        const workDoneString = await AsyncStorage.getItem('workDone');
        let workDone = workDoneString ? JSON.parse(workDoneString) : {};

        if (!workDone[formattedDate]) {
          workDone[formattedDate] = [];
        }
        workDone[formattedDate].push(data);

        await AsyncStorage.setItem('workDone', JSON.stringify(workDone));
        console.log('Data saved successfully!');
      } catch (error) {
        console.error('Error saving data:', error);
      }
    }

    // Получение данных из базы данных
    static async getDataFromDB() {
      try {
        const workDoneString = await AsyncStorage.getItem('workDone');
        let workDone = workDoneString ? JSON.parse(workDoneString) : {};

        // Преобразование даты для корректной сортировки
        const sortedWorkDone = {};
        Object.keys(workDone)
          .sort((a, b) => {
            const dateA = new Date(
              parseInt(a.slice(-2)),
              parseInt(a.slice(3, 5)) - 1,
              parseInt(a.slice(0, 2))
            );
            const dateB = new Date(
              parseInt(b.slice(-2)),
              parseInt(b.slice(3, 5)) - 1,
              parseInt(b.slice(0, 2))
            );
            return dateB - dateA;
          })
          .forEach((key) => {
            sortedWorkDone[key] = workDone[key];
          });

        return sortedWorkDone;
      } catch (error) {
        console.error('Error getting data:', error);
        throw error;
      }
    }

    // Удаление элемента из базы данных
    static async deleteItemFromDB(date, index) {
      try {
        const workDoneString = await AsyncStorage.getItem('workDone');
        let workDone = workDoneString ? JSON.parse(workDoneString) : {};

        if (workDone[date] && workDone[date].length > index) {
          workDone[date].splice(index, 1);

          await AsyncStorage.setItem('workDone', JSON.stringify(workDone));
          console.log('Item deleted successfully!');
        } else {
          console.log('Item not found in the database.');
        }
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }

    // Очистка данных из базы данных
    static async clearDataFromDB() {
      try {
        await AsyncStorage.removeItem('workDone');
        console.log('Data cleared successfully.');
        return true;
      } catch (error) {
        console.error('Error clearing data:', error);
        return false;
      }
    }
  };
}
