const LocalStorage = {
    GET: (name: string) => {
      return localStorage.getItem(name);
    },
    SAVE: (name: string, value: string) => {
      localStorage.setItem(name, value);
    },
  };
  
  export default LocalStorage;