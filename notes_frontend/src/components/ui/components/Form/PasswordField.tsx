import { Field } from "formik";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface PasswordFieldProps {
  text: string;
  id: string;
  className?:string;
}
export default function PasswordField({
  text = "",
  id = "",
  className=""
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <fieldset className={twMerge(`mt-5 border border-amber-700 rounded-2xl pl-2 py-0.5 w-100`,className)}>
      <legend className="px-1 text-lg text-amber-700 font-medium">
        {text}
      </legend>
      <div className="relative">
        <Field
          id={id}
          name={id}
          type={showPassword ? "text" : "password"}
          className="pl-2 pr-10 text-xl w-full bg-transparent outline-none -translate-y-1 text-amber-800"
          placeholder=""
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-2 top-1/2 -translate-y-10/12 text-amber-700 hover:text-amber-900 transition-colors"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>
    </fieldset>
  );
}
