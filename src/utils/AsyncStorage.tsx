import AsyncStorage from '@react-native-async-storage/async-storage';
 
const removeKeyFromStorage = async (address: string) => {
  try {
    await AsyncStorage.removeItem(address);
    return true;
  } catch (exception) {
    return false;
  }
};

const addKeyToStorage = async (address: string, key: string) => {
  const value = typeof key === 'string' ? key : JSON.stringify(key);
  await AsyncStorage.setItem(address, value);
};

const getKeyFromStorage = async (address: string) => {
  const value = await AsyncStorage.getItem(address);
  if (!value) return null;
  
  try {
    return JSON.parse(value); 
  } catch {
    return value;  
  }
};

const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (exception) {
    return false;
  }
};
export {addKeyToStorage, getKeyFromStorage, removeKeyFromStorage, clearStorage};
