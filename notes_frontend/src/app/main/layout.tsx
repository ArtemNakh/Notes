import BaseFetch, { HttpMethod } from "@/components/lib/BaseFetch";
import Header from "@/components/ui/header/Header";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function layoutMain({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  try {
    // Отримуємо куки з поточного запиту клієнта на сервері
    const cookieStore = await headers();
    const cookieHeader = cookieStore.get("cookie") || "";
    // Використовуємо вашу функцію BaseFetch
    await BaseFetch({
      endPoint: "/Auth/v1/session", // ваш ендпоінт перевірки сесії
      method: HttpMethod.GET,
      headers: {
        Cookie: cookieHeader, // Передаємо куки на бекенд
      },
    });
  } catch (error) {
    // Якщо сесія не валідна (BaseFetch викине помилку) — перенаправляємо на логін
    redirect("auth/login");
    // console.log(error)
  }

  return (
    <>
      <div className="w-full min-h-screen bg-amber-100  ">
        <Header />

        {children}
      </div>
    </>
  );
}
