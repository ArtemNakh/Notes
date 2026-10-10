import { Field } from "formik";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function PasswordInputLogin() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <fieldset className="mt-6 border border-amber-700 rounded-2xl pl-2 py-0.5 w-80">
        <legend className="px-1 text-lg text-amber-700 font-medium">
          Password
        </legend>
        <div className="relative">
          <Field
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            className="pl-2 pr-10 text-xl w-full bg-transparent outline-none -translate-y-1 text-amber-800"
            placeholder=""
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-1/2 -translate-y-10/12 text-amber-700 hover:text-amber-900 transition-colors cursor-pointer"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </fieldset>
    </>
  );
}
