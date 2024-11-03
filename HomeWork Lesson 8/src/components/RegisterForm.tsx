import React from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/userActions";

interface RegisterFormProps {
  onRegister: (username: string, password: string) => void;
}
const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister }) => {
  const navigate = useNavigate();

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    onRegister(username, password);

    try {
      const data = await registerUser(username, password);
      console.log("Регистрация прошла успешно:", data);
      navigate("/login"); // Перенаправление на страницу логина
    } catch (error) {
      console.error("Ошибка регистрации:", error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <label>
        Username:
        <input type="text" name="username" />
      </label>
      <label>
        Password:
        <input type="password" name="password" />
      </label>
      <button type="submit">Register</button>
      <br />
      <br />
      <br />
      <div>
        Already have account?{" "}
        <button onClick={() => navigate("/login")}>Login</button>
      </div>
    </form>
  );
};

export default RegisterForm;
