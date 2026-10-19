"use client";

import { useState } from "react";
import LanguageSwitcher from "../i18next/LanguageSwitcher";
import CreateNewNoteForm from "./CreateNewNote";
import RotationPlus from "../animation/RotationPlus";

export default function Header() {
  const [isCreateNote, setIsCreateNote] = useState(false);

  return (
    <>
      <div className="relative w-full h-15 flex border-b border-amber-400">
        <div className="h-full w-2/3 flex items-center pl-5 text-amber-700">
          Name surname
        </div>
        <div className="h-full w-1/3  flex items-center justify-end overflow-hidden">
          <LanguageSwitcher
            languageButton="px-2 py-1 mt-0 text-amber-700 border-amber-700"
            languageDropdown="z-1 fixed bg-amber-100"
          />
          <RotationPlus onToggle={() => setIsCreateNote(!isCreateNote)} />
        </div>
      </div>

      {isCreateNote && <CreateNewNoteForm />}
    </>
  );
}
