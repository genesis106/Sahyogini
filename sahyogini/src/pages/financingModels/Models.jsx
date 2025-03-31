import React, { useState } from "react";
import DocumentVerification from "./DocumentVerification";

const financingModels = [
  {
    name: "Peer-to-Peer Lending",
    description:
      "Direct lending between individuals without traditional financial institutions.",
  },
  {
    name: "Crowdfunding",
    description:
      "Raising funds from a large number of people via online platforms.",
  },
  {
    name: "Revenue-Based Financing",
    description:
      "Investment based on a percentage of the company's ongoing revenues.",
  },
  {
    name: "Impact Investors Matching",
    description:
      "Connecting businesses with investors focused on social and environmental impact.",
  },
];

export default function FinancingModels() {
  const [selectedModel, setSelectedModel] = useState(null);

  return (
    <div className="container mx-auto p-6">
      {selectedModel ? (
        <DocumentVerification model={selectedModel} /> // ✅ Pass selected model as prop
      ) : (
        <>
          <h1 className="text-3xl font-bold text-center mb-6">
            Financing Models
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {financingModels.map((model, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg shadow-md cursor-pointer"
                onClick={() => setSelectedModel(model)} // ✅ Save clicked model info
              >
                <h2 className="text-xl font-semibold mb-2">{model.name}</h2>
                <p className="text-gray-600 mb-4">{model.description}</p>
                <button className="text-blue-600 font-medium hover:underline">
                  Get Funded &rarr;
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
