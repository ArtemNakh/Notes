import * as Yup from "yup";
// import i18n from "i18next";
// Схема валідації

// Схема валідації
export const NewPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(5, () => "new-password.validation_min_length")
    .max(100, () => "password.validation_max_length")
    .required(() => "new-password.validation_required"),
});
