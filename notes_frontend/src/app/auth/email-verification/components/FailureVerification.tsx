import RegistrationLink from "@/components/ui/components/RegistrationLink";
import { useTranslation } from "react-i18next";

export default function FailureVerification() {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex flex-col justify-center">
        <p className="text-red-600 font-semibold">
          {t("email-verification.failure")}
        </p>
        <RegistrationLink />
      </div>
    </>
  );
}
