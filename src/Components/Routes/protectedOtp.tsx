import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedOtpRoute = (children: any) => {
  const otpPrivate = localStorage.getItem("email");
  return otpPrivate ? <Outlet /> : <Navigate to="/" />;
};
