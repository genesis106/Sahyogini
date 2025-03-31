import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

const CourseCard = ({ course }) => {
  const { language } = useLanguage();
  const [completed, setCompleted] = useState(false);

  // Content object with English and Hindi translations
  const content = {
    en: {
      markComplete: "Mark as Complete",
      completed: "Completed 🎉"
    },
    hi: {
      markComplete: "पूर्ण के रूप में चिह्नित करें",
      completed: "पूर्ण हुआ 🎉"
    }
  };

  // Use the content for current language
  const c = content[language];

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
        {completed ? c.completed : c.markComplete}
      </button>
    </div>
  );
};

export default CourseCard;