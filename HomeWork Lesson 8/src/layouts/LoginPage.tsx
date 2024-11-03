import React from "react";
import LoginForm from "../components/LoginForm"; // Обновите путь в зависимости от вашей структуры папок

const LoginPage: React.FC = (): JSX.Element => {
  const handleLogin = (username: string, password: string) => {
    console.log("Logging in with:", { username, password });
    // Здесь вы можете добавить логику для аутентификации, например, отправку запроса на сервер.
  };

  return (
    <div>
      <h1>Login</h1>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
