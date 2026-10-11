import Link from "next/link";

interface ForgetPasswordLinkProps {
  className?: string;
}
export default function ForgetPasswordLink({
  className = "",
}: ForgetPasswordLinkProps) {
  return (
    <>
      <Link
        className={`${className}ml-3 text-amber-900 hover:text-amber-600 hover:transition-colors hover:duration-300 hover:bg-amber-200 rounded-3xl px-3 py-1 outline-none active:bg-amber-400 active:duration-300 active:transition-colors active:text-amber-800  `}
        href={"/auth/reset-password"}
      >
        Forget password?
      </Link>
    </>
  );
}
