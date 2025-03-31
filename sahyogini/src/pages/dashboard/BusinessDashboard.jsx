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
import { useLanguage } from "../../context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { ArrowUp, BadgeAlert, BarChart3, CreditCard, Info, TrendingUp } from "lucide-react";

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

const BusinessDashboard = () => {
  const { language } = useLanguage();
  const [fundsRaised, setFundsRaised] = useState(75000);
  const [creditScore, setCreditScore] = useState(720);
  const [loanStatus, setLoanStatus] = useState("Pending");
  const [repaymentDue, setRepaymentDue] = useState("15 April 2025");
  const [revenue, setRevenue] = useState(75000);
  const [expenses, setExpenses] = useState(35000);

  const content = {
    en: {
      title: "Business Dashboard",
      summaryCards: {
        fundsRaised: "Total Funds Raised",
        creditScore: "Credit Score",
        loanStatus: "Loan Request Status",
        repaymentDue: "Next Repayment Due"
      },
      charts: {
        fundingGrowth: "Funding Growth",
        revenueExpenses: "Monthly Revenue & Expenses"
      },
      funding: {
        title: "Apply for Funding",
        applyBtn: "Apply Now",
        alert: "Funding application form coming soon!"
      },
      insights: {
        title: "AI-Based Financial Insights",
        excellent: "Your revenue is growing significantly. Consider reinvesting in expansion.",
        good: "Your revenue is stable. Focus on cost reduction for better margins.",
        warning: "Warning: Expenses are high. Optimize operations to improve profitability."
      },
      months: ["Jan", "Feb", "Mar", "Apr", "May"],
      datasets: {
        fundsRaised: "Funds Raised",
        revenue: "Revenue",
        expenses: "Expenses"
      }
    },
    hi: {
      title: "व्यवसाय डैशबोर्ड",
      summaryCards: {
        fundsRaised: "कुल जुटाया गया फंड",
        creditScore: "क्रेडिट स्कोर",
        loanStatus: "ऋण अनुरोध की स्थिति",
        repaymentDue: "अगला भुगतान देय"
      },
      charts: {
        fundingGrowth: "फंडिंग वृद्धि",
        revenueExpenses: "मासिक राजस्व और खर्च"
      },
      funding: {
        title: "फंडिंग के लिए आवेदन करें",
        applyBtn: "अभी आवेदन करें",
        alert: "फंडिंग आवेदन फॉर्म जल्द ही आ रहा है!"
      },
      insights: {
        title: "AI-आधारित वित्तीय अंतर्दृष्टि",
        excellent: "आपका राजस्व काफी बढ़ रहा है। विस्तार में पुनर्निवेश पर विचार करें।",
        good: "आपका राजस्व स्थिर है। बेहतर मार्जिन के लिए लागत में कमी पर ध्यान दें।",
        warning: "चेतावनी: खर्च अधिक हैं। लाभप्रदता बढ़ाने के लिए संचालन को अनुकूलित करें।"
      },
      months: ["जन", "फर", "मार्च", "अप्रैल", "मई"],
      datasets: {
        fundsRaised: "जुटाया गया फंड",
        revenue: "राजस्व",
        expenses: "खर्च"
      }
    }
  };

  const c = content[language];
  
  // Format currency based on language
  const formatCurrency = (amount) => {
    return language === "en" 
      ? `₹${amount.toLocaleString('en-IN')}` 
      : `₹${amount.toLocaleString('hi-IN')}`;
  };

  // Funding Growth Chart Data
  const chartData = {
    labels: c.months,
    datasets: [
      {
        label: c.datasets.fundsRaised,
        data: [15000, 25000, 50000, 70000, 75000],
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.1)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#4CAF50",
        pointBorderColor: "#fff",
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  // Monthly Revenue vs Expenses Chart
  const revenueExpenseData = {
    labels: c.months,
    datasets: [
      {
        label: c.datasets.revenue,
        data: [40000, 45000, 60000, 70000, revenue],
        backgroundColor: "rgba(76, 175, 80, 0.8)",
        borderRadius: 6,
      },
      {
        label: c.datasets.expenses,
        data: [15000, 20000, 25000, 30000, expenses],
        backgroundColor: "rgba(244, 67, 54, 0.8)",
        borderRadius: 6,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        }
      },
      x: {
        grid: {
          display: false,
        }
      }
    },
  };

  // AI-Based Revenue Growth Insights
  const getGrowthInsight = () => {
    if (revenue > expenses * 2) {
      return c.insights.excellent;
    } else if (revenue > expenses) {
      return c.insights.good;
    } else {
      return c.insights.warning;
    }
  };

  // Get insight color based on financial health
  const getInsightColor = () => {
    if (revenue > expenses * 2) {
      return "text-green-600 bg-green-50 border-green-200";
    } else if (revenue > expenses) {
      return "text-blue-600 bg-blue-50 border-blue-200";
    } else {
      return "text-red-600 bg-red-50 border-red-200";
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-6 flex items-center">
          <TrendingUp className="mr-2 h-8 w-8 text-primary" />
          <h2 className="text-3xl font-bold text-gray-800">{c.title}</h2>
        </div>

        {/* Summary Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
            <div className="bg-green-600 h-1 w-full"></div>
            <CardContent className="p-6">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-600">{c.summaryCards.fundsRaised}</h3>
                <BarChart3 className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(fundsRaised)}</p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
            <div className="bg-blue-600 h-1 w-full"></div>
            <CardContent className="p-6">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-600">{c.summaryCards.creditScore}</h3>
                <CreditCard className="h-5 w-5 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-blue-600">{creditScore}</p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
            <div className="bg-yellow-600 h-1 w-full"></div>
            <CardContent className="p-6">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-600">{c.summaryCards.loanStatus}</h3>
                <BadgeAlert className="h-5 w-5 text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-yellow-600">{language === "en" ? loanStatus : "प्रक्रियाधीन"}</p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
            <div className="bg-red-600 h-1 w-full"></div>
            <CardContent className="p-6">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-600">{c.summaryCards.repaymentDue}</h3>
                <ArrowUp className="h-5 w-5 text-red-600" />
              </div>
              <p className="text-2xl font-bold text-red-600">
                {language === "en" ? repaymentDue : "15 अप्रैल 2025"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
            <CardHeader className="border-b bg-gray-50 pb-2 pt-4">
              <CardTitle className="flex items-center text-lg font-semibold text-gray-700">
                <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                {c.charts.fundingGrowth}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Line data={chartData} options={chartOptions} />
            </CardContent>
          </Card>

          <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
            <CardHeader className="border-b bg-gray-50 pb-2 pt-4">
              <CardTitle className="flex items-center text-lg font-semibold text-gray-700">
                <BarChart3 className="mr-2 h-5 w-5 text-primary" />
                {c.charts.revenueExpenses}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Bar data={revenueExpenseData} options={chartOptions} />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Apply for Funding */}
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
            <CardHeader className="border-b bg-gray-50 pb-2 pt-4">
              <CardTitle className="flex items-center text-lg font-semibold text-gray-700">
                <CreditCard className="mr-2 h-5 w-5 text-primary" />
                {c.funding.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between p-6">
              <p className="text-gray-600">
                {language === "en" 
                  ? "Access different funding options customized for your business needs." 
                  : "अपने व्यवसाय की जरूरतों के अनुसार अनुकूलित विभिन्न फंडिंग विकल्पों तक पहुंच प्राप्त करें।"}
              </p>
              <button
                onClick={() => alert(c.funding.alert)}
                className="rounded-md bg-primary px-4 py-2 text-white transition-all duration-200 hover:bg-primary/90 hover:shadow-md"
              >
                {c.funding.applyBtn}
              </button>
            </CardContent>
          </Card>

          {/* AI-Driven Insights */}
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
            <CardHeader className="border-b bg-gray-50 pb-2 pt-4">
              <CardTitle className="flex items-center text-lg font-semibold text-gray-700">
                <Info className="mr-2 h-5 w-5 text-primary" />
                {c.insights.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className={`rounded-md border p-4 ${getInsightColor()}`}>
                <p className="font-medium">{getGrowthInsight()}</p>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="rounded-md bg-gray-100 p-3 text-center">
                  <div className="text-sm text-gray-500">{c.datasets.revenue}</div>
                  <div className="text-lg font-bold text-green-600">{formatCurrency(revenue)}</div>
                </div>
                <div className="rounded-md bg-gray-100 p-3 text-center">
                  <div className="text-sm text-gray-500">{c.datasets.expenses}</div>
                  <div className="text-lg font-bold text-red-600">{formatCurrency(expenses)}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;