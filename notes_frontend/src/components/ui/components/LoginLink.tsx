import Link from "next/link";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

interface LoginLinkProps {
  className?: string;
}
export default function LoginLink({ className = "" }: LoginLinkProps) {
  const { t } = useTranslation();
  return (
    <>
      <Link
        className={twMerge(
          `ml-3 text-amber-900 hover:text-amber-600 hover:transition-colors hover:duration-300 hover:bg-amber-200 rounded-3xl px-3 py-1 outline-none active:bg-amber-400 active:duration-300 active:transition-colors active:text-amber-800  `,
          className,
        )}
        href={"/auth/login"}
      >
        {t("text.login")}
      </Link>
    </>
  );
}
