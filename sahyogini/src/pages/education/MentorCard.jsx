import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

const MentorCard = ({ mentor }) => {
  const { language } = useLanguage();
  const [isBooked, setIsBooked] = useState(false);

  // Content object with English and Hindi translations
  const content = {
    en: {
      available: "Available:",
      contact: "Contact",
      bookSession: "Book Session",
      booked: "Booked",
      bookingConfirmation: "Session booked with"
    },
    hi: {
      available: "उपलब्ध:",
      contact: "संपर्क",
      bookSession: "सत्र बुक करें",
      booked: "बुक किया गया",
      bookingConfirmation: "के साथ सत्र बुक किया गया"
    }
  };

  // Use the content for current language
  const c = content[language];

  const handleBooking = () => {
    setIsBooked(true);
    // Using the appropriate language for the alert message
    alert(`${c.bookingConfirmation} ${mentor.name}!`);
  };

  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <h3 className="text-lg font-semibold">{mentor.name}</h3>
      <p className="text-gray-600">{mentor.expertise}</p>
      <p className="text-gray-500">{c.available} {mentor.availability}</p>
      <a href={`mailto:${mentor.contact}`} className="text-blue-500 mt-2 block">
        {c.contact}
      </a>
      <button
        onClick={handleBooking}
        className={`mt-3 px-4 py-2 text-white rounded ${
          isBooked ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
        }`}
        disabled={isBooked}
      >
        {isBooked ? c.booked : c.bookSession}
      </button>
    </div>
  );
};

export default MentorCard;