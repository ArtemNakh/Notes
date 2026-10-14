"use client";

import { twMerge } from "tailwind-merge";
import i18n from "./i18n.provider";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { i18nConfig } from "../../../../config/i18next.config";

interface LanguageSwitcherProps {
  languageButton?: string;
  languageDropdown?: string;
  languageItem?: string;
}

export default function LanguageSwitcher({
  languageButton,
  languageDropdown,
  languageItem,
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  const languages = i18nConfig.locales.map((code) => ({
    code,
    label: code.toUpperCase(),
  }));

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  const { i18n: currentI18n } = useTranslation();

  return (
    <div className="relative inline-block text-center">
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className={twMerge(
          `border border-amber-900 rounded-3xl py-1 px-5 text-lg mt-5 text-amber-900  
        hover:transition-colors hover:bg-amber-300 
        active:outline-offset-4 active:outline-amber-700 active:outline-2`,
          languageButton,
        )}
      >
        {currentI18n.language?.toUpperCase()}
      </button>

      {isOpen && (
        <div
          className={twMerge(
            `absolute border border-amber-900 w-17 h-fit bg-amber-150 items-center justify-center rounded-3xl py-1 px-1 mt-1
            flex flex-col`,
            languageDropdown,
          )}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleLanguageChange(lang.code)}
              className={twMerge(
                `z-1 w-full h-full rounded-3xl text-lg text-amber-900
                hover:bg-amber-300
                active:bg-amber-400
                `,
                languageItem,
              )}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
