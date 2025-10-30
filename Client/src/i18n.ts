import i18n from "i18next";
import arJson from "./locale/ar.json";
import { initReactI18next } from "react-i18next";
i18n.use(initReactI18next).init({
  resources: {
    ar: { ...arJson },
  },
  lng: "en",
});
