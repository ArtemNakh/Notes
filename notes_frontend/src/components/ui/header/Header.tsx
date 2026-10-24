"use client";

import { useState } from "react";
import LanguageSwitcher from "../i18next/LanguageSwitcher";
import CreateNewNoteForm from "./CreateNewNote";
import RotationPlus from "../animation/RotationPlus";
import { usePathname } from "next/navigation";
import HomeIcon from "../animation/HomeIcon";
import Link from "next/link";

export default function Header() {
  const [isCreateNote, setIsCreateNote] = useState(false);
  const pathname = usePathname();
  const isMainPage = pathname === "/main";

  return (
    <>
      <div className="relative w-full h-15 2xl:h-20 flex border-b border-amber-400">
        <div className="h-full w-2/3 lg:text-xl 2xl:text-4xl flex items-center pl-5 text-amber-700">
          Name surname
        </div>
        <div className="h-full w-1/3  flex items-center justify-end overflow-hidden">
          <LanguageSwitcher
            languageButton={`px-2 2xl:w-15 2xl:h-13 2xl:text-2xl 2xl:mr-2 
              py-1 mt-0 text-amber-700 border-amber-700`}
            languageDropdown={`z-1 fixed bg-amber-100 2xl:w-25 2xl:h-25 2xl:mt-3 `}
            languageItem={`2xl:text-2xl 2xl:text-amber-700`}
          />
          {isMainPage ? (
            <RotationPlus onToggle={() => setIsCreateNote(!isCreateNote)} className={`2xl:w-18 2xl:h-18`}/>
          ) : (
            <Link href={"/main"}>
              <HomeIcon  className={`2xl:w-18 2xl:h-18 2xl:mr-2`}/>
            </Link>
          )}
        </div>
      </div>

      {isCreateNote && <CreateNewNoteForm />}
    </>
  );
}
