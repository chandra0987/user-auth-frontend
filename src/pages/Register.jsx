import { useFormik } from "formik";
import { useContext } from "react";
import UserContext from "../context/UserContext";

export default function Register() {
    const { handleRegister , serverErrors} = useContext(UserContext);
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: (values, { resetForm }) => {
      console.log("Form data:", values);
      handleRegister(values, resetForm)
      resetForm();
    },
  });

  return (
    <div>
      <h2>Register Component</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}
