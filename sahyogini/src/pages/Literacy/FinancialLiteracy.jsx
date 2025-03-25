import { Link } from "react-router-dom";
import CourseCard from "../../pages/education/CourseCard";

const courses = [
  {
    title: "Budgeting 101",
    description: "Learn how to manage expenses effectively.",
  },
  {
    title: "Investing for Beginners",
    description: "Understand the basics of investments.",
  },
  {
    title: "Tax Compliance",
    description: "Get insights into tax benefits and filings.",
  },
];

const FinancialLiteracy = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center">
        📚 Financial Literacy for Women Entrepreneurs
      </h2>

      {/* Personalized Learning Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.title} course={course} />
        ))}
      </div>

      {/* Discussion Forum Section */}
      <div className="mt-12 bg-white p-6 shadow-md rounded-lg text-center">
        <h3 className="text-xl font-semibold text-gray-800">
          💬 Join the Discussion Forum!
        </h3>
        <p className="text-gray-600 mt-2">
          Connect with other women entrepreneurs to ask financial questions &
          share advice.
        </p>

        {/* Link to Community Forum Page */}
        <Link to="/community-forum">
          <button className="mt-4 px-6 py-3 bg-purple-600 text-white text-lg rounded-lg hover:bg-purple-700 transition">
            Join the Forum
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FinancialLiteracy;
