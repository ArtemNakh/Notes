import * as Yup from "yup";
const loginValidationSchema = Yup.object().shape({
  login: Yup.string().required("Login must be"),

  password: Yup.string().required("Password must be").min(5, "Password must be more 5 letters"),
});
export default loginValidationSchema