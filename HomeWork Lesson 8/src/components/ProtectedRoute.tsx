import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  requiresAuth: boolean; // Указывает, требуется ли авторизация для доступа к маршруту
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiresAuth,
}) => {
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);

  // Если маршрут требует авторизации, а пользователь не авторизован
  if (requiresAuth && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Если маршрут не требует авторизации, но пользователь авторизован
  if (!requiresAuth && isAuthenticated) {
    return <Navigate to="/" />;
  }

  // Возвращаем дочерние компоненты, если проверка пройдена
  return children;
};

export default ProtectedRoute;
