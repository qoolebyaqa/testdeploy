import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import uzJSON from './i18n/uz.json'
import ruJSON from './i18n/ru.json'

const resources = {
  ru: {
    translation: ruJSON
  },
  uz: {
    translation: uzJSON
  }
};

i18n
  .use(initReactI18next) 
  .init({
    resources,
    lng: localStorage.getItem("lang") || "ru", 

    interpolation: {
      escapeValue: false 
    }
  });

  export default i18n;