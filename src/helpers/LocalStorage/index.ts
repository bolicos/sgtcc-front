const LocalStorage = {
  GET: (key: string) => {
    return localStorage.getItem(key);
  },
  SAVE: (key: string, value: string) => {
    localStorage.setItem(key, value);
  },
  REMOVE: (key: string) => {
    localStorage.removeItem(key);
  },
};

export default LocalStorage;
