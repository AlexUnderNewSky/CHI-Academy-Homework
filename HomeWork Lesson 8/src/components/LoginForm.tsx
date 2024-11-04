import React from "react";
import { loginUser } from "../api/userActions";
import { useNavigate } from "react-router-dom";

interface LoginFormPropsI {
  onLogin: (username: string, password: string) => void;
}

export const LoginForm: React.FC<LoginFormPropsI> = ({
  onLogin,
}): JSX.Element => {
  const navigate = useNavigate();
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    onLogin(username, password);

    try {
      const data = await loginUser(username, password);
      console.log(data);
    } catch (error) {
      console.error("Ошибка входа:", error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        Username:
        <input type="text" name="username" />
      </label>
      <label>
        Password:
        <input type="password" name="password" />
      </label>
      <button type="submit">Login</button>
      <br />
      <br />
      <br />
      <div>
        Not registered yet?{" "}
        <button onClick={() => navigate("/register")}>Register</button>
      </div>
    </form>
  );
};

export default LoginForm;
