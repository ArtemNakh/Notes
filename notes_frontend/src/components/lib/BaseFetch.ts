import { toast } from "sonner";

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

interface INotification {
  success?: string;
  error?: string;
}

interface IBaseFetch {
  endPoint: string;
  method: HttpMethod;
  values?: any;
  notification?: INotification;
  headers?: Record<string, string>;
}
function sanitizeBody(body: any) {
  if (!body) return body;
  const sanitized = { ...body };
  const sensitiveKeys = ["password", "token", "confirmPassword", "secret"];

  for (const key of sensitiveKeys) {
    if (key in sanitized) {
      sanitized[key] = "***REDACTED***";
    }
  }
  return sanitized;
}

export default async function BaseFetch({
  endPoint,
  values,
  method,
  notification,
  headers,
}: IBaseFetch) {
  const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}${endPoint}`;
  const isDev = process.env.NODE_ENV === "development";

  const startTime = performance.now();

  // Формуємо опції для fetch
  const fetchOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: values ? JSON.stringify(values) : undefined,
    credentials: "include",
  };

  // 1. Логування перед відправкою (тільки в Development)
  if (isDev) {
    console.groupCollapsed(`🚀 [API Request] ${method} ${fullUrl}`);
    console.log("Headers:", fetchOptions.headers);
    if (values) {
      console.log("Payload:", sanitizeBody(values));
    }
    console.groupEnd();
  }
  
  try {
    const response = await fetch(fullUrl, fetchOptions);
    const duration = Math.round(performance.now() - startTime);

    // 2. Логування результату запиту (тільки в Development)
    if (isDev) {
      const isSuccess = response.ok;
      console.log(
        `%c [API Response] ${method} ${fullUrl} — Status: ${response.status} (${duration}ms)`,
        isSuccess
          ? "color: #2e7d32; font-weight: bold;"
          : "color: #d32f2f; font-weight: bold;",
      );
    }

    // 3. Обробка помилок відповіді сервера (4xx, 5xx)
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage =
        notification?.error || errorData?.message || "Помилка запиту";

      // Показуємо тост один раз
      if (typeof window !== "undefined") {
        toast.error(errorMessage);
      }

      // Створюємо помилку для передачі в catch або далі по коду
      throw new Error(errorMessage);
    }

    if (notification?.success && typeof window !== "undefined") {
      toast.success(notification.success);
    }

    // Перевіряємо, чи є тіло відповіді перед тим, як викликати .json()
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }

    return null;
  } catch (error: any) {
    if (isDev) {
      console.error(`❌ [API Error] ${method} ${fullUrl}`, error);
    }
    if (
      typeof window !== "undefined" &&
      !notification?.error &&
      error.message === "Failed to fetch"
    ) {
      toast.error("Помилка мережі або сервер недоступний");
    }

    throw error;
  }
}

// import { toast } from "sonner";

// export enum HttpMethod {
//   GET = "GET",
//   POST = "POST",
//   DELETE = "DELETE",
//   PATCH = "PATCH",
// }

// interface INotification {
//   success?: string;
//   error?: string;
// }

// interface IBaseFetch {
//   endPoint: string;
//   method: HttpMethod;
//   values?: any;
//   notification?: INotification;
//   headers?: Record<string, string>;
// }
// export default async function BaseFetch({
//   endPoint,
//   values,
//   method,
//   notification,
//   headers,
// }: IBaseFetch) {
//   try {
//    const fullUrl=`${process.env.NEXT_PUBLIC_API_URL}${endPoint}`
//     if (process.env.NODE_ENV === 'development') {
//     console.groupCollapsed(`[API Request] ${method} ${fullUrl}`);
//     console.log('Options:', options);
//     console.groupEnd();
//   }

//     const response = await fetch(fullUrl, {
//       method: method,
//       headers: { "Content-Type": "application/json", ...headers },
//       body: values ? JSON.stringify(values) : undefined,
//       credentials: "include",
//     });
//     if (!response.ok) {
//       const errorData = await response.json().catch(() => null);
//       if (typeof window !== "undefined") {
//         toast.error(
//           notification?.error
//             ? notification.error
//             : errorData.message
//               ? errorData.message
//               : "Request error",
//         );
//       }
//       console.error("errorInner", errorData);
//       throw new Error(errorData?.message);
//     }

//     notification?.success && toast.success(notification.success);
//     return await response.json();
//   } catch (error: any) {
//     if (typeof window !== "undefined") {
//       toast.error(notification?.error ? notification.error : error.message);
//     }
//     console.error("error", error);
//     throw new Error(error.message || "Помилка мережі");
//   }
// }
