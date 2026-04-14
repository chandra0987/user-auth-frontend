import { useFormik } from "formik";
import { useContext } from "react";
import UserContext from "../context/UserContext";

export default function Login(props) {
    const { handleLogin, serverErrors } = useContext(UserContext);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values, { resetForm }) => {
      console.log("Form data:", values);
      handleLogin(values, resetForm)
      resetForm();
    },
  });

  return (
    <div>
      <h2>Login Component</h2>
      { serverErrors && <p style={{ colour: 'red'}}>{serverErrors}</p>}
      <form onSubmit={formik.handleSubmit}>
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
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}
