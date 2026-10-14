import { useFormikContext } from "formik";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

interface SubmitFormButtonProps {
  text?: string;
  className?: string;
}
export default function SubmitFormButton({
  text = "",
  className = "",
}: SubmitFormButtonProps) {
  const { errors, isValid } = useFormikContext<any>();

  const handleFormSubmit = () => {
    if (!isValid) {
      const firstError = Object.values(errors)[0];
      if (firstError) {
        toast.error(firstError as string);
      }
    }
  };

  return (
    <button
      type="submit"
      onClick={handleFormSubmit}
      className={twMerge(
        "border border-amber-900 rounded-3xl py-2 px-5 text-lg mt-5 text-amber-900 hover:bg-amber-300 hover:transition-colors active:bg-amber-400",
        className,
      )}
    >
      {text}
    </button>
  );
}
