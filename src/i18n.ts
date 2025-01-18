import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

i18n
  .use(HttpApi) // Carrega traduções
  .use(LanguageDetector) // Detecta idioma
  .use(initReactI18next) // Conecta com React
  .init({
    supportedLngs: ["pt", "es"], // Adicione os idiomas suportados
    fallbackLng: "es", // Português como fallback
    detection: {
      order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag"],
      caches: ["cookie", "localStorage"]
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json" // Caminho dos arquivos
    },
    react: {
      useSuspense: true
    }
  });


export default i18n;
