import React from "react";
import { Outlet } from "react-router-dom";
import AppShell from "../components/app/AppShell";

const MainLayout = () => {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
};

export default MainLayout;
