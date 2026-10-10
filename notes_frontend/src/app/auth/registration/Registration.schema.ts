import * as Yup from "yup";
const RegistrationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name must be")
    .min(4, "Name must be more 4 letter"),
  surname: Yup.string()
    .required("Surname must be")
    .min(4, "Surname must be more 4 letter"),

  email: Yup.string().required("Email must be").email("Data must be email"),

  password: Yup.string()
    .required("Password must be")
    .min(5, "Password must be more 5 letters"),
});
export default RegistrationSchema;
