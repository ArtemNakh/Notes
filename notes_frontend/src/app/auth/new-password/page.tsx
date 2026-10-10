"use client";
import { Field, Form, Formik } from "formik";
import { NewPasswordSchema } from "./schema/NewPasswordSchema.schema";
import { toast } from "sonner";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface INewPassword {
  password: string;
}

export default function NewPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
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
            {({ errors, isValid }) => {
              const handleFormSubmit = () => {
                if (!isValid) {
                  const firstError = Object.values(errors)[0];
                  if (firstError) {
                    console.log("errer", errors);
                    toast.error(firstError as string);
                  }
                }
              };
              return (
                <Form className="flex flex-col items-center">
                  {" "}
                  <fieldset className="mt-5 border border-amber-700 rounded-2xl pl-2 py-0.5 w-100">
                    <legend className="px-1 text-lg text-amber-700 font-medium">
                      Password
                    </legend>
                    <div className="relative">
                      <Field
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        className="pl-2 pr-10 text-xl w-full bg-transparent outline-none -translate-y-1 text-amber-800"
                        placeholder=""
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-2 top-1/2 -translate-y-10/12 text-amber-700 hover:text-amber-900 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </fieldset>
                  <button
                    type="submit"
                    onClick={handleFormSubmit}
                    className=" border border-amber-900 rounded-3xl py-2 px-5 text-lg mt-5 text-amber-900 active:text-amber-700 hover:bg-amber-300 bg-amber-150 active:bg-amber-400 hover:transition-colors cursor-pointer hover:duration-400 outline-none"
                  >
                    Оновити пароль
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </>
  );
}
