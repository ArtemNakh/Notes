"use client";
import { Form, Formik } from "formik";
import loginValidationSchema from "./loginValidation.schema";
import { toast } from "sonner";
import { WritingNote } from "@/components/ui/animation/writtingNote";
import ForgetPassword from "@/components/ui/components/ForgetPasswordLink";
import RegistrationLink from "@/components/ui/components/RegistrationLink";
import SubmitFormButton from "@/components/ui/components/Form/SubmitFormButton";
import FieldForm from "@/components/ui/components/Form/FieldForm";
import PasswordField from "@/components/ui/components/Form/PasswordField";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/ui/i18next/LanguageSwitcher";
import { useAppDispatch } from "@/components/lib/redux/hooks";
import { loginUser } from "@/components/lib/redux/Auth/auth.slice";
import { useRouter } from "next/navigation";
import { ILoginValues } from "./ILoginValues.interface";

const initialValues: ILoginValues = {
  email: "",
  password: "",
};

export default function AuthLogin() {
  const router = useRouter();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const loginSubmit = async (values: ILoginValues) => {
    try {
      const data = await dispatch(loginUser(values)).unwrap();
      console.log("Успішний вхід:");
      // const data = await PostService(values, "Auth/v1/login");
      console.log("data", data);
      // dispatch(login());
      if (data) {
        toast.success("Успішний вхід!");
        router.push("/main")
      }
    } catch (err: any) {
      console.log("err", err);
      toast.error(err?.response?.data?.message || "Невірний логін або пароль!");
    }
  };

  return (
    <>
      <div className="flex w-full h-screen justify-center items-center ">
        <div className=" border-2 border-amber-500 rounded-3xl">
          <div className="w-[80vw] h-[80vh] bg-amber-150 rounded-3xl">
            <div className="flex h-full">
              <div className="w-1/2 h-full  flex  flex-col justify-center">
                <Formik
                  initialValues={initialValues}
                  validationSchema={loginValidationSchema}
                  onSubmit={loginSubmit}
                  validateOnMount={true}
                >
                  {() => {
                    return (
                      <Form className="items-center justify-center flex flex-col">
                        <label className="text-5xl mb-12 font-medium text-amber-700">
                          Login
                        </label>

                        <LanguageSwitcher languageDropdown="top-0 left-full ml-2" />

                        <FieldForm
                          text={t("text.email")}
                          id="email"
                          type="email"
                        />
                        <PasswordField
                          text={t("text.password")}
                          id={"password"}
                        />
                        <SubmitFormButton text={t("text.login")} />
                      </Form>
                    );
                  }}
                </Formik>
                <div className="mt-10 flex justify-between items-end">
                  <ForgetPassword />
                  <RegistrationLink />
                </div>
              </div>

              {/* svg / right part*/}
              <div className="bg-amber-500 w-1/2 rounded-2xl">
                <div className="relative w-full h-full">
                  <WritingNote />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
