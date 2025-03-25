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
  const [investmentPortfolio, setInvestmentPortfolio] = useState([
    { type: "Equity", value: 40000 },
    { type: "Debt", value: 20000 },
    { type: "P2P Lending", value: 15000 },
    { type: "Crowdfunding", value: 10000 },
  ]);

  const totalInvestment = investmentPortfolio.reduce(
    (acc, investment) => acc + investment.value,
    0
  );

  // Portfolio Performance Metrics
  const growthRate = ((90000 - 50000) / 50000) * 100; // Assuming past vs. current

  // Pie Chart Data for Investment Distribution
  const pieChartData = {
    labels: investmentPortfolio.map((inv) => inv.type),
    datasets: [
      {
        data: investmentPortfolio.map((inv) => inv.value),
        backgroundColor: ["#4CAF50", "#FF9800", "#2196F3", "#F44336"],
      },
    ],
  };

  // Investment Growth Chart
  const investmentGrowthData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Investment Growth",
        data: [50000, 60000, 75000, 85000, 90000],
        borderColor: "#4CAF50",
        fill: false,
      },
    ],
  };

  // Projected Returns (AI-Driven)
  const projectedReturns = {
    labels: ["2025", "2026", "2027", "2028", "2029"],
    datasets: [
      {
        label: "Projected Portfolio Value",
        data: [100000, 120000, 150000, 180000, 210000],
        borderColor: "#2196F3",
        fill: false,
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Investor Dashboard</h2>

      {/* Investment Summary */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold">Total Portfolio Value</h3>
            <p className="text-2xl font-bold text-green-600">
              ₹{totalInvestment}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold">Growth Rate</h3>
            <p className="text-2xl font-bold text-blue-600">
              {growthRate.toFixed(2)}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold">AI Projected Returns</h3>
            <p className="text-2xl font-bold text-purple-600">
              ₹210,000 by 2029
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
                {investment.type} Investments
              </h3>
              <p className="text-2xl font-bold text-blue-600">
                ₹{investment.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">
            Investment Distribution
          </h3>
          <Pie data={pieChartData} />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Investment Growth</h3>
          <Line data={investmentGrowthData} />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Projected Returns</h3>
          <Line data={projectedReturns} />
        </div>
      </div>
    </div>
  );
};

export default InvestorDashboard;
