"use client";
import { Form, Formik } from "formik";
import PasswordInputLogin from "./components/PasswordInputLogin";
import EmailInputLogin from "./components/LoginInputLogin";
import loginValidationSchema from "./loginValidation.schema";
import { PostService } from "../../../components/lib/PostService";
import { toast } from "sonner";
import { WritingNote } from "@/components/ui/animation/writtingNote";
import ForgetPassword from "@/components/ui/components/ForgetPasswordLink";
import RegistrationLink from "@/components/ui/components/RegistrationLink";
import SubmitFormButton from "@/components/ui/components/Form/SubmitFormButton";

const initialValues: ILoginValues = {
  email: "",
  password: "",
};

export default function AuthLogin() {
  const loginUser = async (values: ILoginValues) => {
    try {
      const data = await PostService(values, "Auth/v1/login");
      console.log("data", data);
      toast.success("Успішний вхід!");
    } catch (err: any) {
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
                  onSubmit={loginUser}
                  validateOnMount={true}
                >
                  {() => {
                    return (
                      <Form className="items-center justify-center flex flex-col">
                        <label className="text-5xl mb-12 font-medium text-amber-700">
                          Login
                        </label>

                        <EmailInputLogin />
                        <PasswordInputLogin />

                        <SubmitFormButton text="Login" />
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
