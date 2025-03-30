import React from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import PeerToPeerLending from "./PeerToPeerLending";
// import Crowdfunding from "./Crowdfunding";
// import RevenueBasedFinancialModel from "./RevenueBased";
// import ImpactInvestors from "./ImpactInvestors";
// import Crowdfunding from "./Crowdfunding";
import DocumentVerification from "./DocumentVerification";
import TestComponent from "./test";
const financingModels = [
  {
    name: "Peer-to-Peer Lending",
    description:
      "Direct lending between individuals without traditional financial institutions.",
    link: "/financing-models/p2p-lending",
  },
  {
    name: "Crowdfunding",
    description:
      "Raising funds from a large number of people via online platforms.",
    link: "/financing-models/crowdfunding",
  },
  {
    name: "Revenue-Based Financing",
    description:
      "Investment based on a percentage of the company's ongoing revenues.",
    link: "/financing-models/revenue-financing",
  },
  {
    name: "Impact Investors Matching",
    description:
      "Connecting businesses with investors focused on social and environmental impact.",
    link: "/financing-models/impact-investors",
  },
];

function FinancingModelsList() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Financing Models</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {financingModels.map((model) => (
          <div key={model.name} className="border p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{model.name}</h2>
            <p className="text-gray-600 mb-4">{model.description}</p>
            <Link to={model.link} className="text-blue-600 font-medium hover:underline">
              Get Funded &rarr;
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FinancingModels() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<FinancingModelsList />} />
    //     <Route path="/financing-models/p2p-lending" element={<PeerToPeer />} />
    //     <Route path="/financing-models/crowdfunding" element={<Crowdfunding />} />
    //     <Route path="/financing-models/revenue-financing" element={<RevenueBasedFinancialModel />} />
    //     <Route path="/financing-models/impact-investors" element={<ImpactInvestors />} />
    //   </Routes>
    // </Router>
    <h1>hello<TestComponent/></h1>
  );
}