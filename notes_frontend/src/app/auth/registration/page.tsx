"use client";
import { Form, Formik } from "formik";
import IRegistrationUser from "./IRegistrationUser";
import Image from "next/image";
import { toast } from "sonner";
import RegistrationSchema from "./Registration.schema";
import { PostService } from "../../../components/lib/PostService";
import SubmitFormButton from "@/components/ui/components/Form/SubmitFormButton";
import PasswordField from "@/components/ui/components/Form/PasswordField";
import FieldForm from "@/components/ui/components/Form/FieldForm";
import LoginLink from "@/components/ui/components/LoginLink";
import LanguageSwitcher from "@/components/ui/i18next/LanguageSwitcher";
import { useTranslation } from "react-i18next";

export default function RegistrationPage() {
  const { t } = useTranslation();
  const OnSubmit = async (values: IRegistrationUser) => {
    try {
      console.log(`values`, values);
      const data = await PostService(values, "Auth/v1/registration");
      console.log(data);
      toast.success("Успішна реєтрація!");
    } catch (err: any) {
      // Показує гарне сповіщення збоку екрана
      toast.error(err?.response?.data?.message || "Невірний логін або пароль!");
    }
  };

  const initialUser: IRegistrationUser = {
    name: "",
    surname: "",
    email: "",
    password: "",
    passwordRepeat: "",
  };
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center ">
        <div className="border border-amber-500 bg-amber-150 w-[75vw] h-[80vh] rounded-3xl flex">
          {/* left */}
          <div className="w-full lg:w-7/12 rounded-3xl flex flex-col items-center justify-center">
            <label className="text-5xl  fint-medium text-amber-700 ">
              {t("text.registration")}
            </label>
            <LanguageSwitcher languageDropdown="top-0 left-full ml-2" />

            <Formik
              initialValues={initialUser}
              onSubmit={OnSubmit}
              validationSchema={RegistrationSchema}
              validateOnMount={true}
            >
              {() => {
                return (
                  <Form className="-mt-1 w-full  flex flex-col items-center ">
                    <FieldForm text={t("text.name")} id="name" type="text" 
                      className="w-auto"/>
                    <FieldForm
                      text={t("text.surname")}
                      id="surname"
                      type="text"
                      className="w-auto"
                    />
                    <FieldForm
                      text={t("text.email")}
                      id="email"
                      type="email"
                      className="w-auto"
                    />

                    <PasswordField
                      text={t("text.password")}
                      id="password"
                      className="w-auto"
                    />
                    <PasswordField
                      text={t("text.repeat_password")}
                      id="passwordRepeat"
                      className="w-auto"
                    />

                    <SubmitFormButton text={t("text.registration")} />
                  </Form>
                );
              }}
            </Formik>
            <div className="self-center mt-5 ">
              <LoginLink />
            </div>
          </div>

          {/* right */}
          <div className="hidden lg:block w-5/12 relative bg-amber-500 rounded-3xl">
            <Image
              src={"/assets/decoratedNote.jpeg"}
              alt="illustrated photo"
              priority
              width={848}
              height={1264}
              className="h-full"
            />
          </div>
        </div>
      </div>
    </>
  );
}
