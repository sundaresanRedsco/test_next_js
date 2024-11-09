export const getItems = (key: string) => {
  const response = localStorage?.getItem(key);
  const data = response ? JSON.parse(response) : null;
  return data;
};
export const setItem = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};
export const removeItem = (key: string) => {
  localStorage.removeItem(key);
};
