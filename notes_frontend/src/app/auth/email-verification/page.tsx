"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MailVerificationService } from "./services/mail-verification.services";

export default function MailVerificationPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  useEffect(() => {
    const runVerification = async () => {
      const result = await MailVerificationService(token);

      if (result.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    };
    runVerification();
  }, [token, router]);

  return (
    <>
      <div>
        <div className=" w-full h-screen flex items-center justify-center  ">
          {status === "loading" && (
            <div className="w-6 h-6 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
          )}
          <div className="w-2/5 h-2/5 bg-amber-150 flex items-center justify-center  border border-amber-600 rounded-3xl">
            {status === "success" && (
              <div className="flex flex-col items-center space-y-4">
                <p className="text-green-600 font-semibold">
                  ✅ Верифікація успішна, можете зачинити це вікно
                </p>
                <button
                  onClick={() => router.push("/auth/login")}
                  className="px-4 py-2 bg-amber-200 text-amber-700 rounded-3xl hover:bg-amber-400 active:outline-2 active:outline-amber-600 active:outline-offset-4 transition border-amber-700"
                >
                  Перейти до логіну
                </button>
              </div>
            )}
            {status === "error" && (
              <div className="flex flex-col justify-center">
                <p className="text-red-600 font-semibold">
                  Проїзошла помилка під час підтвердження пошти
                </p>
                <button
                  onClick={() => router.push("/auth/registration")}
                  className="px-4 py-2 mt-5 bg-amber-200 text-amber-700 rounded-3xl hover:bg-amber-400 active:outline-2 active:outline-amber-600 active:outline-offset-4 transition border border-amber-700"
                >
                  Перейти до сторінки реєстрації
                </button>
              </div>
            )}
          </div>{" "}
        </div>
      </div>
    </>
  );
}
