import { useState } from "react";

const CourseCard = ({ course }) => {
  const [completed, setCompleted] = useState(false);

  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <h3 className="text-lg font-semibold">{course.title}</h3>
      <p className="text-gray-600">{course.description}</p>
      <button
        onClick={() => setCompleted(!completed)}
        className={`mt-3 px-4 py-2 rounded text-white ${
          completed ? "bg-green-400" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {completed ? "Completed 🎉" : "Mark as Complete"}
      </button>
    </div>
  );
};

export default CourseCard;
