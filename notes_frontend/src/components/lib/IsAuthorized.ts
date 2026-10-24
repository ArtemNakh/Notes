import { redirect } from "next/navigation";
import BaseFetch, { HttpMethod } from "./BaseFetch";
import { headers } from "next/headers";

export default async function IsAuthorized(): Promise<void> {
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
}
