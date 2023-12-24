import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "./app.component";
import Webadmin from "./webadmin/webadmin.component";
import Feedbacks from "./webadmin/feedbacks/feedbacks.component";
import Feedback from "./feedback.component";
import Download from "./download.component";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route index element={<App />} />
      <Route path="/webadmin" element={<Webadmin />}>
        <Route index element={<Feedbacks />} />
      </Route>
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/download" element={<Download />} />
    </Routes>
  );
};

export default AppRouter;
