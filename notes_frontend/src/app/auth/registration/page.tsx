"use client";
import { Field, Form, Formik } from "formik";
import IRegistrationUser from "./RegistrationUser.schema";
import Image from "next/image";
import { toast } from "sonner";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import RegistrationSchema from "./Registration.schema";
import { PostService } from "../login/loginService";

export default function RegistrationPage() {
  const OnSubmit = async (values: IRegistrationUser) => {
    try {
      console.log(`values`,values);
      const data = await PostService(values, "Auth/v1/registration");
      console.log(data);
      toast.success("Успішна реєтрація!");
    } catch (err: any) {
      // Показує гарне сповіщення збоку екрана
      toast.error(err?.response?.data?.message || "Невірний логін або пароль!");
    }
  };

  const [showPassword, setShowPassword] = useState(false);
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
        <div className="bg-amber-200 w-[75vw] h-[80vh] rounded-3xl flex">
          {/* left */}
          <div className="w-7/12 rounded-3xl flex flex-col items-center justify-center">
            <label className="text-5xl fint-medium text-amber-700 mt-20">
              Registration
            </label>

            <Formik
              initialValues={initialUser}
              onSubmit={OnSubmit}
              validationSchema={RegistrationSchema}
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
                  <Form className="mt-15 w-full h-full flex flex-col items-center ">
                    <fieldset className="border border-amber-700 rounded-2xl pl-2 py-0.5 w-100">
                      <legend className="px-1 text-lg text-amber-700 font-medium">
                        Name
                      </legend>
                      <Field
                        id="name"
                        name="name"
                        type="text"
                        className="pl-2 -translate-y-1 text-xl w-full bg-transparent outline-none  text-amber-800"
                        placeholder=""
                      />
                    </fieldset>

                    <fieldset className="mt-5 border border-amber-700 rounded-2xl pl-2 py-0.5 w-100">
                      <legend className="px-1 text-lg text-amber-700 font-medium">
                        Surname
                      </legend>
                      <Field
                        id="surname"
                        name="surname"
                        type="text"
                        className="pl-2 -translate-y-1 text-xl w-full bg-transparent outline-none  text-amber-800"
                        placeholder=""
                      />
                    </fieldset>

                    <fieldset className="mt-5 border border-amber-700 rounded-2xl pl-2 py-0.5 w-100">
                      <legend className="px-1 text-lg text-amber-700 font-medium">
                        Email
                      </legend>
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        className="pl-2 -translate-y-1 text-xl w-full bg-transparent outline-none  text-amber-800"
                        placeholder=""
                      />
                    </fieldset>

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

                    <fieldset className="mt-5 border border-amber-700 rounded-2xl pl-2 py-0.5 w-100">
                      <legend className="px-1 text-lg text-amber-700 font-medium">
                        Repeat password
                      </legend>
                      <div className="relative">
                        <Field
                          id="passwordRepeat"
                          name="passwordRepeat"
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
                      className="border border-amber-900 rounded-3xl py-2 px-5 text-lg mt-5 text-amber-900 hover:bg-amber-300 transition-colors cursor-pointer"
                    >
                      Registration
                    </button>
                  </Form>
                );
              }}
            </Formik>
          </div>

          {/* right */}
          <div className="w-5/12 relative bg-amber-500 rounded-3xl">
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
