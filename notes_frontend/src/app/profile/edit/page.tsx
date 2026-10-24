"use client";

import { useAppDispatch, useAppSelector } from "@/components/lib/redux/hooks";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UpdateUser } from "@/components/lib/redux/Auth/actions/UpdateUser.action";
import { Form, Formik } from "formik";
import FieldForm from "@/components/ui/components/Form/FieldForm";
import SubmitFormButton from "@/components/ui/components/Form/SubmitFormButton";

interface FormValues {
  name: string;
  surname: string;
}
export default function ProfileEditPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.authReducer.user);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-amber-800 text-sm animate-pulse">Завантаження...</p>
      </div>
    );
  }
  const handleSubmit = async (values: FormValues) => {
    // 1. Перевіряємо, чи змінилися дані порівняно з поточним юзером
    const isNameChanged = values.name.trim() !== (user.name || "");
    const isSurnameChanged = values.surname.trim() !== (user.surname || "");

    // Якщо нічого не змінилося — просто перенаправляємо назад або нічого не робимо
    if (!isNameChanged && !isSurnameChanged) {
      console.log("Дані не змінилися, запит не виконується.");
      router.push("/profile");
      return;
    }

    try {
      const response = await dispatch(
        UpdateUser({
          userId: user.id,
          name: values.name.trim(),
          surname: values.surname.trim(),
        }),
      ).unwrap();

      console.log("res123", response);
      router.push("/profile");
    } catch (error: any) {
      console.error("Помилка оновлення:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 font-sans">
      <div className="bg-amber-100 rounded-3xl shadow-sm border border-amber-500/60 p-6 md:p-8">
        {/* Шапка сторінки редагування */}
        <div className="flex items-center justify-between pb-6 border-b border-amber-200">
          <h1 className="text-2xl font-bold text-amber-700">
            Редагувати профіль
          </h1>
          <Link
            href="/profile"
            className="text-sm font-medium text-amber-800 hover:text-amber-950 transition-colors"
          >
            ← Назад
          </Link>
        </div>

        <Formik
          initialValues={{ name: "", surname: "" }}
          onSubmit={handleSubmit}
        >
          <Form>
            <FieldForm text={"Name"} id={"name"} type={"name"} />
            <FieldForm text={"Surname"} id={"surname"} type={"surname"} />
            <SubmitFormButton text="Зберігти" />
          </Form>
        </Formik>
      </div>
    </div>
  );
}
