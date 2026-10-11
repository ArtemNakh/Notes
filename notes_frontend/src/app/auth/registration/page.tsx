"use client";
import { Field, Form, Formik } from "formik";
import IRegistrationUser from "./IRegistrationUser";
import Image from "next/image";
import { toast } from "sonner";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import RegistrationSchema from "./Registration.schema";
import { PostService } from "../../../components/lib/PostService";
import Link from "next/link";
import SubmitFormButton from "@/components/ui/components/Form/SubmitFormButton";
import PasswordField from "@/components/ui/components/Form/PasswordField";
import FieldForm from "@/components/ui/components/Form/FieldForm";
import LoginLink from "@/components/ui/components/LoginLink";

export default function RegistrationPage() {
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
        <div className="border border-amber-500 bg-amber-150 w-[75vw] h-[80vh] rounded-3xl flex">
          {/* left */}
          <div className="w-7/12 rounded-3xl flex flex-col items-center justify-center">
            <label className="text-5xl  fint-medium text-amber-700 ">
              Registration
            </label>

            <Formik
              initialValues={initialUser}
              onSubmit={OnSubmit}
              validationSchema={RegistrationSchema}
              validateOnMount={true}
            >
              {() => {
                return (
                  <Form className="mt-15 w-full  flex flex-col items-center ">
                    <FieldForm text="Name" id="name" type="text" />
                    <FieldForm text="Surname" id="surname" type="text" />
                    <FieldForm text="Email" id="email" type="email" />

                    <PasswordField text="Password" id="password" />
                    <PasswordField text="Repeat Password" id="passwordRepeat" />

                    <SubmitFormButton text="Registration" />
                  </Form>
                );
              }}
            </Formik>
            <div className="self-center mt-5    ">
              <LoginLink />
            </div>
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
