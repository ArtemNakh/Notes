"use client";
import { Form, Formik } from "formik";
import Image from "next/image";
import PasswordInputLogin from "./components/PasswordInputLogin";
import EmailInputLogin from "./components/LoginInputLogin";
import loginValidationSchema from "./loginValidation.schema";
import { PostService } from "./loginService";
import { toast } from "sonner";
import Link from "next/link";

interface LoginValues {
  email: string;
  password: string;
}
const initialValues: LoginValues = {
  email: "",
  password: "",
};

export default function AuthLogin() {
  const loginUser = async (values: { email: string; password: string }) => {
    try {
      console.log(`test:${values.email} : ${values.password}`);
      const data = await PostService(values, "Auth/v1/login");
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
        <div className=" border-2 border-amber-500 rounded-3xl">
          <div className="w-[80vw] h-[80vh] bg-amber-150 rounded-3xl">
            <div className="flex h-full ">
              <div className="w-1/2 h-full  flex  flex-col justify-center">
                <Formik
                  initialValues={initialValues}
                  validationSchema={loginValidationSchema}
                  onSubmit={loginUser}
                  validateOnMount={true}
                >
                  {({ errors, isValid }) => {
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

                        <EmailInputLogin />
                        <PasswordInputLogin />

                        <button
                          type="submit"
                          onClick={handleFormSubmit}
                          className="border border-amber-900 rounded-3xl py-2 px-5 text-lg mt-5 text-amber-900 hover:bg-amber-300 hover:transition-colors  active:bg-amber-400 active:text-amber-0"
                        >
                          Login
                        </button>
                      </Form>
                    );
                  }}
                </Formik>
                <div className="mt-10 flex justify-between items-end">
                  <Link
                    className="ml-3 text-amber-900 hover:text-amber-600 hover:transition-colors hover:duration-300 hover:bg-amber-200 rounded-3xl px-3 py-1 outline-none active:bg-amber-400 active:duration-300 active:transition-colors active:text-amber-800 "
                    href={"/auth/reset-password"}
                  >
                    Forget password?
                  </Link>
                  <Link
                    className="mr-3 text-amber-900 hover:text-amber-600 hover:transition-colors hover:duration-300 hover:bg-amber-200 rounded-3xl px-3 py-1 outline-none  active:bg-amber-400 active:duration-300 active:transition-colors active:text-amber-800  "
                    href={"/auth/registration"}
                  >
                    Registration
                  </Link>
                </div>
              </div>

              {/* svg / right part*/}
              <div className="bg-amber-500 w-1/2 rounded-2xl">
                <div className="relative w-full h-full">
                 
                  <Image
                    src="/assets/WritingNote.svg"
                    alt="Анімована ілюстрація"
                    fill
                    className="object-cover  stroke-amber-200 fill-amber-100"
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
