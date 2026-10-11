import { Field } from "formik";

interface FieldFormProps {
  text: string;
  id: string;
  type: string;
}
export default function FieldForm({
  text = "",
  id = "",
  type = "",
}: FieldFormProps) {
  return (
    <fieldset className="mt-5 border border-amber-700 rounded-2xl pl-2 py-0.5 w-100">
      <legend className="px-1 text-lg text-amber-700 font-medium">
        {text}
      </legend>
      <Field
        id={id}
        name={id}
        type={type}
        className="pl-2 pr-10 text-xl w-full bg-transparent outline-none -translate-y-1 text-amber-800"
        placeholder=""
      />
    </fieldset>
  );
}
