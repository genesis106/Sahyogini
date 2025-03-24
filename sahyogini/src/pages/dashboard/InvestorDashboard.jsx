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

import { Pie, Bar } from "react-chartjs-2";
ChartJS.register(
  ArcElement, // Needed for Pie/Doughnut charts
  CategoryScale, // Needed for bar/line charts (X-axis)
  LinearScale, // Needed for bar/line charts (Y-axis)
  BarElement, // Needed for Bar charts
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
        backgroundColor: "#4CAF50",
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Investor Dashboard</h2>

      {/* Investment Summary */}
      <div className="grid grid-cols-2 gap-4">
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
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">
            Investment Distribution
          </h3>
          <Pie data={pieChartData} />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Investment Growth</h3>
          <Bar data={investmentGrowthData} />
        </div>
      </div>
    </div>
  );
};

export default InvestorDashboard;
