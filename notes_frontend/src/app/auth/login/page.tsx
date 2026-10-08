"use client";
import { Form, Formik } from "formik";
import Image from "next/image";
import PasswordInputLogin from "./components/PasswordInputLogin";
import LoginInputLogin from "./components/LoginInputLogin";
import loginValidationSchema from "./loginValidation.schema";
import { loginWorker } from "./loginService";
import { toast } from "sonner";

export default function AuthLogin() {
  const loginUser = async (values: { login: string; password: string }) => {
    try {
      console.log(`test:${values.login} : ${values.password}`);
      const data = await loginWorker(values);
      console.log(data);
      toast.success("Успішний вхід!");
    } catch (err: any) {
      // Показує гарне сповіщення збоку екрана
      toast.error(err?.response?.data?.message || "Невірний логін або пароль!");
    }
  };

  return (
    <>
      <div className="flex w-full h-screen justify-center items-center ">
        <div className=" border-2 border-gray-600 rounded-3xl">
          <div className="w-[80vw] h-[80vh] bg-amber-200 rounded-3xl">
            <div className="flex h-full ">
              <div className="w-1/2 h-full  flex   justify-center">
              <Formik
                initialValues={{ login: "", password: "" }}
                validationSchema={loginValidationSchema}
                onSubmit={loginUser}
              >
                {({ errors, isValid, submitCount }) => {
                  const handleFormSubmit = () => {
                    if (!isValid) {
                      const firstError = Object.values(errors)[0];
                      if (firstError) {
                        toast.error(firstError as string);
                      }
                    }
                  };

                  return (
                    <Form className="items-center justify-center flex flex-col">
                      <label className="text-5xl mb-12 font-medium text-amber-700">
                        Login
                      </label>

                      <LoginInputLogin />
                      <PasswordInputLogin />

                      <button
                        type="submit"
                        onClick={handleFormSubmit}
                        className="border border-amber-900 rounded-3xl py-2 px-5 text-lg mt-5 text-amber-900 hover:bg-amber-300 transition-colors cursor-pointer"
                      >
                        Login
                      </button>
                    </Form>
                  );
                }}
              </Formik>
              </div>

              {/* svg / right part*/}
              <div className="bg-amber-900 w-1/2 rounded-2xl">
                <div className="relative w-full h-full">
                  <Image
                    src="/assets/WritingNote.svg"
                    alt="Анімована ілюстрація"
                    fill
                    className="object-cover "
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
