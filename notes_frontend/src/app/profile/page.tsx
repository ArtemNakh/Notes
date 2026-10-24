"use client";
import { useAppSelector } from "@/components/lib/redux/hooks";
import Link from "next/link";

export default function ProfilePage() {
  const user = useAppSelector((state) => state.authReducer.user);
  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-amber-800 text-sm animate-pulse">
          Завантаження профілю...
        </p>
      </div>
    );
  }

  // Форматування дати створення (наприклад: 24 жовтня 2026 р.)
  const formattedDate = new Date(user.created_at).toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-2xl mx-auto p-6 font-sans">
      {/* Головна картка профілю */}
      <div className="bg-amber-100 rounded-3xl shadow-sm border border-amber-500/60 p-6 md:p-8">
        {/* Верхня частина: Аватарка, Ім'я та Статус */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-amber-100">
          <div className="text-center sm:text-left flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h1 className="text-2xl font-bold text-amber-900">
                {user.name} {user.surname}
              </h1>
              {/* Бейдж верифікації */}
              {user.isVerified ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#E2F0D9] text-[#3D5A2B] border border-[#C5E1B4] w-fit mx-auto sm:mx-0">
                  Підтверджений
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FFF9D6] text-[#5C4632] border border-[#F2E3B3] w-fit mx-auto sm:mx-0">
                  Непідтверджений
                </span>
              )}
            </div>
            <p className="text-sm text-[#8C7A6B] mt-1">{user.email}</p>
            <p className="text-xs text-[#8C7A6B]/80 mt-1">
              У системі з {formattedDate}
            </p>
          </div>
        </div>

        {/* Статистика / Додаткові дані (наприклад, кількість нотаток) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6"></div>

        {/* Кнопки керування / налаштувань */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-end">
          <Link href={"/profile/edit"}
            type="button"
            className="px-5 py-2.5 rounded-xl bg-amber-600 text-white text-sm font-medium hover:bg-amber-700 transition-colors shadow-sm cursor-pointer"
          >
            Редагувати профіль
          </Link>
        </div>
      </div>
    </div>
  );
}
