import router from "next/router";

export default function SuccessVerification() {
  return (
    <>
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
    </>
  );
}
