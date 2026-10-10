import * as Yup from "yup";
const loginValidationSchema = Yup.object().shape({
  email: Yup.string().required("email must be").email("data must be email"),

  password: Yup.string().required("Password must be").min(5, "Password must be more 5 letters"),
});
export default loginValidationSchema