import i18n from "@/components/ui/i18next/i18n.provider";
import * as Yup from "yup";

const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required(() => i18n.t("auth.schema.email.must-be"))
    .email(() => i18n.t("auth.schema.email.is-email")),

  password: Yup.string()
    .required(() => i18n.t("auth.schema.password.must-be"))
    .min(5, () => i18n.t("auth.schema.password.min-5-let")),
});
export default loginValidationSchema;
