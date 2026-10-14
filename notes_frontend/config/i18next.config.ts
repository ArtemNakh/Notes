import en from "../public/locales/en/common.json";
import uk from "../public/locales/uk/common.json";

export const i18nConfig = {
  locales: ["uk", "en"],
  defaultLocale: "uk", //мова за замовчуванням (тут англійська)
  resources: { en: { translation: en }, uk: { translation: uk } },
  fallbackLng: "en", //якщо переклад для вибраної мови не знайдено, використовується англійська.
  interpolation: {
    // Наприклад, якщо переклад містить <b>Іван</b>, воно буде відображено як жирний текст, а не як &lt;b&gt;Іван&lt;/b&gt;.
    escapeValue: false, //єкранування
  },
};

export type Locale = (typeof i18nConfig.locales)[number];
