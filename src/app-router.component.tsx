import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "./app.component";
import Webadmin from "./webadmin/webadmin.component";
import Feedbacks from "./webadmin/feedbacks/feedbacks.component";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route index element={<App />} />
      <Route path="/webadmin" element={<Webadmin />}>
        <Route index element={<Feedbacks />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
