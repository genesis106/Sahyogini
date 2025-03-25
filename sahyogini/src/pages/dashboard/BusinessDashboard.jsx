import { useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line, Bar } from "react-chartjs-2";
ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);
import { Card, CardContent } from "../../components/ui/card";

const BusinessDashboard = () => {
  const [fundsRaised, setFundsRaised] = useState(75000);
  const [creditScore, setCreditScore] = useState(720);
  const [loanStatus, setLoanStatus] = useState("Pending");
  const [repaymentDue, setRepaymentDue] = useState("15 April 2025");
  const [revenue, setRevenue] = useState(75000);
  const [expenses, setExpenses] = useState(35000);

  // Funding Growth Chart Data
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Funds Raised",
        data: [15000, 25000, 50000, 70000, 75000],
        borderColor: "#4CAF50",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  // Monthly Revenue vs Expenses Chart
  const revenueExpenseData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Revenue",
        data: [40000, 45000, 60000, 70000, revenue],
        backgroundColor: "#4CAF50",
      },
      {
        label: "Expenses",
        data: [15000, 20000, 25000, 30000, expenses],
        backgroundColor: "#F44336",
      },
    ],
  };

  // AI-Based Revenue Growth Insights
  const getGrowthInsight = () => {
    if (revenue > expenses * 2) {
      return "Your revenue is growing significantly. Consider reinvesting in expansion.";
    } else if (revenue > expenses) {
      return "Your revenue is stable. Focus on cost reduction for better margins.";
    } else {
      return "Warning: Expenses are high. Optimize operations to improve profitability.";
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Business Dashboard</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold">Total Funds Raised</h3>
            <p className="text-2xl font-bold text-green-600">₹{fundsRaised}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold">Credit Score</h3>
            <p className="text-2xl font-bold text-blue-600">{creditScore}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold">Loan Request Status</h3>
            <p className="text-xl font-bold text-yellow-600">{loanStatus}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold">Next Repayment Due</h3>
            <p className="text-xl font-bold text-red-600">{repaymentDue}</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Funding Growth</h3>
          <Line data={chartData} />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">
            Monthly Revenue & Expenses
          </h3>
          <Bar data={revenueExpenseData} />
        </div>
      </div>

      {/* Apply for Funding */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Apply for Funding</h3>
        <button
          onClick={() => alert("Funding application form coming soon!")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Apply Now
        </button>
      </div>

      {/* AI-Driven Insights */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">
          AI-Based Financial Insights
        </h3>
        <p className="text-gray-700">{getGrowthInsight()}</p>
      </div>
    </div>
  );
};

export default BusinessDashboard;
