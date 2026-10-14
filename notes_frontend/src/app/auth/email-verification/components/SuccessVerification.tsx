import LoginLink from "@/components/ui/components/LoginLink";
import { useTranslation } from "react-i18next";

export default function SuccessVerification() {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex flex-col items-center space-y-4">
        <p className="text-green-600 font-semibold">
          {t("email-verification.success")}
        </p>
        <LoginLink />
      </div>
    </>
  );
}
