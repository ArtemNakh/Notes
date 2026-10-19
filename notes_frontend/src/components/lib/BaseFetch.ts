import { toast } from "sonner";

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
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
export default async function BaseFetch({
  endPoint,
  values,
  method,
  notification,
  headers,
}: IBaseFetch) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${apiUrl}${endPoint}`, {
      method: method,
      headers: { "Content-Type": "application/json", ...headers },
      body: values ? JSON.stringify(values) : undefined,
      credentials: "include",
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      if (typeof window !== "undefined") {
        toast.error(
          notification?.error
            ? notification.error
            : errorData.message
              ? errorData.message
              : "Request error",
        );
      }
      throw new Error(errorData?.message);
    }
    return await response.json();
  } catch (error: any) {

    if (typeof window !== "undefined") {
      toast.error(notification?.error ? notification.error : error.message);
    }
    
    throw new Error(error.message || "Помилка мережі");
  }
}
