import React from "react";
import RegisterForm from "../components/RegisterForm"; // Обновите путь в зависимости от вашей структуры папок

const RegisterPage: React.FC = (): JSX.Element => {
  const handleRegister = (username: string, password: string) => {
    console.log("Logging in with:", { username, password });
    // Здесь вы можете добавить логику для аутентификации, например, отправку запроса на сервер.
  };

  return (
    <div>
      <h1>Register</h1>
      <RegisterForm onRegister={handleRegister} />
    </div>
  );
};

export default RegisterPage;
