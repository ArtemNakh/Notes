import { Field } from "formik";

export default function EmailInputLogin() {
  return (
    <>
      <fieldset className="border border-amber-700 rounded-2xl pl-2 py-0.5 w-80">
        <legend className="px-1 text-lg text-amber-700 font-medium">
          Email
        </legend>
        <Field
          id="email"
          name="email"
          type="email"
          className="pl-2 -translate-y-1 text-xl w-full bg-transparent outline-none  text-amber-800"
          placeholder=""
        />
      </fieldset>
    </>
  );
}
