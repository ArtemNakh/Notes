"use client";

import { Form, Formik } from "formik";
import { toast } from "sonner";
import * as Yup from "yup";
import { PostService } from "../../../components/lib/PostService";
import SubmitFormButton from "@/components/ui/components/Form/SubmitFormButton";
import FieldForm from "@/components/ui/components/Form/FieldForm";
import LoginLink from "@/components/ui/components/LoginLink";
import LanguageSwitcher from "@/components/ui/i18next/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import i18n from "@/components/ui/i18next/i18n.provider";

interface IResetPassword {
  email: string;
}

const ResetPasswordValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required(() => i18n.t("auth.schema.email.must-be"))
    .email(() => i18n.t("auth.schema.email.is-email")),
});

export default function ResetPasswordPage() {
  const { t } = useTranslation();
  const resetPasswordService = async (values: IResetPassword) => {
    try {
      console.log(`values`, values);
      const data = await PostService(
        values,
        "password-recovery/v1/reset-password",
      );
      console.log(data);
      toast.success("Запит надіслан!");
    } catch (err: any) {
      // Показує гарне сповіщення збоку екрана
      console.log(err);
      toast.error(err?.response?.data?.message || "Невірний логін або пароль!");
    }
  };
  const initialResetPassword: IResetPassword = {
    email: "",
  };

  return (
    <>
      <div className="h-screen w-full bg-amber-100 flex items-center justify-center">
        <div className="bg-amber-200 rounded-3xl w-xl h-80 flex flex-col items-center ">
          <h1 className="text-2xl mt-5 text-amber-800">
            {t("text.reset-password")}
          </h1>
          <LanguageSwitcher languageDropdown="top-0 left-full ml-2" />

          <Formik
            initialValues={initialResetPassword}
            onSubmit={resetPasswordService}
            validationSchema={ResetPasswordValidationSchema}
            validateOnMount={true}
          >
            {() => {
              return (
                <Form className="flex flex-col justify-center">
                  <FieldForm
                    text={t("text.email")}
                    id="email"
                    type="email"
                    className="-mt-0.5"
                  />
                  <SubmitFormButton
                    text={t("text.send-request")}
                    className=""
                  />
                </Form>
              );
            }}
          </Formik>
          <LoginLink className="mt-3" />
        </div>
      </div>
    </>
  );
}
