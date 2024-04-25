import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePages from "./pages/HomePages";
import LoginPages from "./pages/LoginPages";
import NotFoundPages from "./pages/NotFoundPages";
import ProfilePages from "./pages/ProfilePages";
import RegistrationPages from "./pages/RegistrationPages";
import PrivateRoutes from "./routes/PrivateRoutes";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<HomePages />} path="/" exact />
          <Route element={<ProfilePages />} path="/me" />
        </Route>

        <Route element={<LoginPages />} path="/login" />
        <Route element={<RegistrationPages />} path="/register" />
        <Route element={<NotFoundPages />} path="*" />
      </Routes>
    </>
  );
};

export default App;
