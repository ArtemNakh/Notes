"use client";

import { Field, Form, Formik } from "formik";
import { toast } from "sonner";
import * as Yup from "yup";
import { PostService } from "../../../components/lib/PostService";
import Link from "next/link";
import SubmitFormButton from "@/components/ui/components/Form/SubmitFormButton";
import FieldForm from "@/components/ui/components/Form/FieldForm";
import LoginLink from "@/components/ui/components/LoginLink";

interface IResetPassword {
  email: string;
}

const ResetPasswordValidationSchema = Yup.object().shape({
  email: Yup.string().required("email must be").email("data must be email"),
});

export default function ResetPasswordPage() {
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
        <div className="bg-amber-200 rounded-3xl w-xl h-70 flex flex-col items-center ">
          <h1 className="text-2xl mt-5 text-amber-800">Відновлення паролю</h1>

          <Formik
            initialValues={initialResetPassword}
            onSubmit={resetPasswordService}
            validationSchema={ResetPasswordValidationSchema}
            validateOnMount={true}
          >
            {() => {
              return (
                <Form className="flex flex-col justify-center">
                  <FieldForm text="Email" id="email" type="email" />
                  <SubmitFormButton text="Відправити запит" />
                </Form>
              );
            }}
          </Formik>
          <LoginLink/>
          {/* <Link
            className="mt-5 border border-amber-700 rounded-3xl px-3 py-1 text-amber-800 hover:bg-amber-300 active:outline-2 active:outline-amber-600 active:outline-offset-2"
            href={"/auth/login"}
          >
            Login
          </Link> */}
        </div>
      </div>
    </>
  );
}
