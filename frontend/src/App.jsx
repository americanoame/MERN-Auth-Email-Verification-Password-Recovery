import React from "react";
import { Routes, Route } from "react-router-dom";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import EmailVerification from "./pages/EmailVerification";

const App = () => {
  return (
    
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/email-verification" element={<EmailVerification />} />
      </Routes>
    
  );
};

export default App;