import router from "next/router";

export default function FailureVerification() {
  return (
    <>
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
    </>
  );
}
