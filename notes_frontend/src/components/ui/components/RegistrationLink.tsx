import Link from "next/link";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

interface RegistrationLinkProps {
  className?: string;
}
export default function RegistrationLink({
  className = "",
}: RegistrationLinkProps) {
  const { t } = useTranslation();
  return (
    <>
      <Link
        className={twMerge(
          `mr-3 text-amber-900 hover:text-amber-600 hover:transition-colors hover:duration-300 hover:bg-amber-200 rounded-3xl px-3 py-1 outline-none  active:bg-amber-400 active:duration-300 active:transition-colors active:text-amber-800  `,
          className,
        )}
        href={"/auth/registration"}
      >
        {t("text.registration")}
      </Link>
    </>
  );
}
