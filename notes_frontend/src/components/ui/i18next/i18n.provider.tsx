"use client";

import i18n from "i18next";
import { useEffect, useState } from "react";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { i18nConfig } from "../../../../config/i18next.config";

// Ініціалізуємо i18next лише один раз
if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: i18nConfig.resources,
    lng: i18nConfig.defaultLocale,
    fallbackLng: i18nConfig.fallbackLng,
    interpolation: i18nConfig.interpolation,
    // Важливо: вимикаємо Suspense під час SSR, щоб уникнути конфліктів
    react: {
      useSuspense: false,
    },
  });
}

interface I18nProviderProps {
  children: React.ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Доки ми на сервері або перший кадр клієнта — не рендеримо дерево з перекладами,
  // щоб уникнути Hydration Mismatch. Можете повернути null або обгортку-скелетон.
  if (!isMounted) {
    return null;
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

export default i18n;
