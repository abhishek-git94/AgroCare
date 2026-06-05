import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./routers/Home";
import Climate from "./routers/Climate";
import Crop from "./routers/Crop";
import Mandi from "./routers/Mandi";
import Profile from "./routers/Profile";
import Schemes from "./routers/Schemes";
import SchemeDetails from "./routers/SchemeDetails";
import Soil from "./routers/Soil";
import Villages from "./routers/Villages";
import Water from "./routers/Water";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="climate" element={<Climate />} />
        <Route path="crop" element={<Crop />} />
        <Route path="mandi" element={<Mandi />} />
        <Route path="profile" element={<Profile />} />
        <Route path="schemes" element={<Schemes />} />
        <Route path="schemes/:schemeId" element={<SchemeDetails />} />
        <Route path="soil" element={<Soil />} />
        <Route path="villages" element={<Villages />} />
        <Route path="water" element={<Water />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
