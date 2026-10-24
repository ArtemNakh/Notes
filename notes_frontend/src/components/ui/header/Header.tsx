"use client";

import { useState } from "react";
import LanguageSwitcher from "../i18next/LanguageSwitcher";
import CreateNewNoteForm from "./CreateNewNote";
import RotationPlus from "../animation/RotationPlus";
import { usePathname, useRouter } from "next/navigation";
import HomeIcon from "./HomeIcon";
import Link from "next/link";

export default function Header() {
  const router = useRouter();
  const handleGoHome = () => {
    router.push("/main");
  };
  const [isCreateNote, setIsCreateNote] = useState(false);
  const pathname = usePathname();
  const isMainPage = pathname === "/main";

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
          {isMainPage ? (
            <RotationPlus onToggle={() => setIsCreateNote(!isCreateNote)} />
          ) : (
            <Link href={"/main"}>
              <HomeIcon />
            </Link>
          )}
        </div>
      </div>

      {isCreateNote && <CreateNewNoteForm />}
    </>
  );
}
