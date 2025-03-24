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

  // Funding Growth Chart Data
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Funds Raised",
        data: [15000, 25000, 50000, 70000, 75000],
        borderColor: "#4CAF50",
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
        data: [40000, 45000, 60000, 70000, 75000],
        backgroundColor: "#4CAF50",
      },
      {
        label: "Expenses",
        data: [15000, 20000, 25000, 30000, 35000],
        backgroundColor: "#F44336",
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Business Dashboard</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
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
      <div className="mt-6 grid grid-cols-2 gap-4">
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
    </div>
  );
};

export default BusinessDashboard;
