import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer"; // Import Footer
import Home from "./pages/Home/home";
import Signup from "./pages/Auth/signup";
import Login from "./pages/Auth/login";
import InvestorDashboard from "./pages/dashboard/InvestorDashboard";
import BusinessDashboard from "./pages/dashboard/BusinessDashboard";
import FinancialLiteracy from "./pages/Literacy/FinancialLiteracy";
import Mentorship from "./pages/Mentorship/Mentorship";
import CommunityForum from "./pages/Community/CommunityForum";
import FinancingModels from "./pages/financingModels/Models";
const App = () => {
  return (
    <Router>
      <Navbar /> {/* Navbar remains at the top */}
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/investor-dashboard" element={<InvestorDashboard />} />
            <Route path="/business-dashboard" element={<BusinessDashboard />} />
            <Route path="/financing-models" element={<FinancingModels />} />
            <Route path="/financial-literacy" element={<FinancialLiteracy />} />
            <Route path="/mentorship" element={<Mentorship />} />
            <Route path="/community-forum" element={<CommunityForum />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
