export const saveToStorage = (key: string, value: any) =>
    localStorage.setItem(key, JSON.stringify(value));
  
  export const getFromStorage = (key: string, fallback: any = []) =>
    JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  