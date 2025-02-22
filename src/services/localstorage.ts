export const getItems = (key: string) => {
  try {
    // Check if localStorage is available
    if (typeof window !== "undefined" && window.localStorage) {
      const response = localStorage.getItem(key);
      return response ? JSON.parse(response) : null;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const setItem = (key: string, value: any) => {
  try {
    // Check if localStorage is available
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {}
};

export const removeItem = (key: string) => {
  try {
    // Check if localStorage is available
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem(key);
    }
  } catch (error) {}
};
