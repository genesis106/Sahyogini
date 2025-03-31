import React, { useState } from "react";
import DocumentVerification from "./DocumentVerification";
import { useLanguage } from "../../context/LanguageContext";

const financingModels = [
  {
    name: { en: "Peer-to-Peer Lending", hi: "पीयर-टू-पीयर लेंडिंग" },
    description: {
      en: "Direct lending between individuals without traditional financial institutions.",
      hi: "पारंपरिक वित्तीय संस्थानों के बिना व्यक्तियों के बीच सीधा उधार।",
    },
  },
  {
    name: { en: "Crowdfunding", hi: "क्राउडफंडिंग" },
    description: {
      en: "Raising funds from a large number of people via online platforms.",
      hi: "ऑनलाइन प्लेटफार्मों के माध्यम से बड़ी संख्या में लोगों से धन जुटाना।",
    },
  },
  {
    name: { en: "Revenue-Based Financing", hi: "राजस्व-आधारित वित्तपोषण" },
    description: {
      en: "Investment based on a percentage of the company's ongoing revenues.",
      hi: "कंपनी के चल रहे राजस्व के एक प्रतिशत के आधार पर निवेश।",
    },
  },
  {
    name: { en: "Impact Investors Matching", hi: "इम्पैक्ट इन्वेस्टर्स मैचिंग" },
    description: {
      en: "Connecting businesses with investors focused on social and environmental impact.",
      hi: "सामाजिक और पर्यावरणीय प्रभाव पर केंद्रित निवेशकों के साथ व्यवसायों को जोड़ना।",
    },
  },
];

export default function FinancingModels() {
  const { language } = useLanguage();
  const [selectedModel, setSelectedModel] = useState(null);

  return (
    <div className="container mx-auto p-6">
      {selectedModel ? (
        <DocumentVerification model={selectedModel} />
      ) : (
        <>
          <h1 className="text-3xl font-bold text-center mb-6">
            {language === "hi" ? "वित्तपोषण मॉडल" : "Financing Models"}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {financingModels.map((model, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg shadow-md cursor-pointer"
                onClick={() => setSelectedModel(model)}
              >
                <h2 className="text-xl font-semibold mb-2">{model.name[language]}</h2>
                <p className="text-gray-600 mb-4">{model.description[language]}</p>
                <button className="text-blue-600 font-medium hover:underline">
                  {language === "hi" ? "निधि प्राप्त करें →" : "Get Funded →"}
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}