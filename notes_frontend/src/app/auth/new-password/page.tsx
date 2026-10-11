"use client";
import { Form, Formik } from "formik";
import { NewPasswordSchema } from "./schema/NewPasswordSchema.schema";

import SubmitFormButton from "@/components/ui/components/Form/SubmitFormButton";
import PasswordField from "@/components/ui/components/Form/PasswordField";

interface INewPassword {
  password: string;
}

export default function NewPasswordPage() {
  const initNewPassword: INewPassword = { password: "" };
  const submit = async (values: INewPassword) => {
    try {
      console.log("values", values);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="h-screen w-full bg-amber-100 flex justify-center items-center">
        <div className="bg-amber-200 w-4/12 h-2/5 flex flex-col items-center rounded-3xl justify-center  ">
          <label className="text-3xl text-amber-700 mt-5 ">
            Відновлення паролю
          </label>

          <Formik
            initialValues={initNewPassword}
            onSubmit={submit}
            validateOnMount={true}
            validationSchema={NewPasswordSchema}
          >
            {() => {
              return (
                <Form className="flex flex-col items-center">
                  <PasswordField text="password" id="password" />
                  <SubmitFormButton
                    text="Оновити пароль"
                    className=" border border-amber-900 rounded-3xl py-2 px-5 text-lg mt-5 text-amber-900 active:text-amber-700 hover:bg-amber-300 bg-amber-150 active:bg-amber-400 hover:transition-colors cursor-pointer hover:duration-400 outline-none"
                  />
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </>
  );
}
