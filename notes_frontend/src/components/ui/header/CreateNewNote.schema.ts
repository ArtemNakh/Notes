import i18n from "@/components/ui/i18next/i18n.provider";
import * as Yup from "yup";
const CreateNewNoteSchema = Yup.object().shape({
  title: Yup.string()
    .required(() => i18n.t("note.schema.title.must-be"))
    .min(4, () => i18n.t("note.schema.title.min-4-let")),
});
export default CreateNewNoteSchema;
