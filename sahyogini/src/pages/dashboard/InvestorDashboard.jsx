import { useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie, Bar, Line } from "react-chartjs-2";
import { useLanguage } from "../../context/LanguageContext";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import { Card, CardContent } from "../../components/ui/card";

const InvestorDashboard = () => {
  const { language } = useLanguage();

  // Content object with English and Hindi translations
  const content = {
    en: {
      title: "Investor Dashboard",
      summary: {
        portfolioValue: "Total Portfolio Value",
        growthRate: "Growth Rate",
        projectedReturns: "AI Projected Returns",
        projectedValue: "₹210,000 by 2029"
      },
      investments: {
        distribution: "Investment Distribution",
        growth: "Investment Growth",
        projected: "Projected Returns",
        suffix: "Investments"
      },
      types: {
        Equity: "Equity",
        Debt: "Debt",
        P2P: "P2P Lending",
        Crowdfunding: "Crowdfunding"
      },
      months: ["Jan", "Feb", "Mar", "Apr", "May"],
      years: ["2025", "2026", "2027", "2028", "2029"],
      datasets: {
        growth: "Investment Growth",
        projected: "Projected Portfolio Value"
      }
    },
    hi: {
      title: "निवेशक डैशबोर्ड",
      summary: {
        portfolioValue: "कुल पोर्टफोलियो मूल्य",
        growthRate: "वृद्धि दर",
        projectedReturns: "एआई अनुमानित रिटर्न",
        projectedValue: "₹210,000 (2029 तक)"
      },
      investments: {
        distribution: "निवेश वितरण",
        growth: "निवेश वृद्धि",
        projected: "अनुमानित रिटर्न",
        suffix: "निवेश"
      },
      types: {
        Equity: "इक्विटी",
        Debt: "ऋण",
        P2P: "पीयर-टू-पीयर लेंडिंग",
        Crowdfunding: "क्राउडफंडिंग"
      },
      months: ["जन", "फर", "मार्च", "अप्रैल", "मई"],
      years: ["2025", "2026", "2027", "2028", "2029"],
      datasets: {
        growth: "निवेश वृद्धि",
        projected: "अनुमानित पोर्टफोलियो मूल्य"
      }
    }
  };

  // Use the content for current language
  const c = content[language];

  // Investment data with translated types
  const getInvestmentData = () => {
    const baseData = [
      { type: "Equity", value: 40000 },
      { type: "Debt", value: 20000 },
      { type: "P2P", value: 15000 },
      { type: "Crowdfunding", value: 10000 },
    ];

    return baseData.map(item => ({
      ...item,
      translatedType: c.types[item.type]
    }));
  };

  const [investmentPortfolio, setInvestmentPortfolio] = useState(getInvestmentData());

  // Format currency based on language
  const formatCurrency = (amount) => {
    return language === "en" 
      ? `₹${amount.toLocaleString('en-IN')}` 
      : `₹${amount.toLocaleString('hi-IN')}`;
  };

  const totalInvestment = investmentPortfolio.reduce(
    (acc, investment) => acc + investment.value,
    0
  );

  // Portfolio Performance Metrics
  const growthRate = ((90000 - 50000) / 50000) * 100; // Assuming past vs. current

  // Pie Chart Data for Investment Distribution
  const pieChartData = {
    labels: investmentPortfolio.map((inv) => inv.translatedType),
    datasets: [
      {
        data: investmentPortfolio.map((inv) => inv.value),
        backgroundColor: ["#4CAF50", "#FF9800", "#2196F3", "#F44336"],
      },
    ],
  };

  // Investment Growth Chart
  const investmentGrowthData = {
    labels: c.months,
    datasets: [
      {
        label: c.datasets.growth,
        data: [50000, 60000, 75000, 85000, 90000],
        borderColor: "#4CAF50",
        fill: false,
      },
    ],
  };

  // Projected Returns (AI-Driven)
  const projectedReturns = {
    labels: c.years,
    datasets: [
      {
        label: c.datasets.projected,
        data: [100000, 120000, 150000, 180000, 210000],
        borderColor: "#2196F3",
        fill: false,
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">{c.title}</h2>

      {/* Investment Summary */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold">{c.summary.portfolioValue}</h3>
            <p className="text-2xl font-bold text-green-600">
              {formatCurrency(totalInvestment)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold">{c.summary.growthRate}</h3>
            <p className="text-2xl font-bold text-blue-600">
              {growthRate.toFixed(2)}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold">{c.summary.projectedReturns}</h3>
            <p className="text-2xl font-bold text-purple-600">
              {c.summary.projectedValue}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Investment Breakdown */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        {investmentPortfolio.map((investment) => (
          <Card key={investment.type}>
            <CardContent>
              <h3 className="text-lg font-semibold">
                {investment.translatedType} {c.investments.suffix}
              </h3>
              <p className="text-2xl font-bold text-blue-600">
                {formatCurrency(investment.value)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">
            {c.investments.distribution}
          </h3>
          <Pie data={pieChartData} />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">{c.investments.growth}</h3>
          <Line data={investmentGrowthData} />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">{c.investments.projected}</h3>
          <Line data={projectedReturns} />
        </div>
      </div>
    </div>
  );
};

export default InvestorDashboard;