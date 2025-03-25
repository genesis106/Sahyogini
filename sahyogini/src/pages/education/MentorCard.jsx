import { useState } from "react";

const MentorCard = ({ mentor }) => {
  const [isBooked, setIsBooked] = useState(false);

  const handleBooking = () => {
    setIsBooked(true);
    alert(`Session booked with ${mentor.name}!`);
  };

  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <h3 className="text-lg font-semibold">{mentor.name}</h3>
      <p className="text-gray-600">{mentor.expertise}</p>
      <p className="text-gray-500">Available: {mentor.availability}</p>
      <a href={`mailto:${mentor.contact}`} className="text-blue-500 mt-2 block">
        Contact
      </a>
      <button
        onClick={handleBooking}
        className={`mt-3 px-4 py-2 text-white rounded ${
          isBooked ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
        }`}
        disabled={isBooked}
      >
        {isBooked ? "Booked" : "Book Session"}
      </button>
    </div>
  );
};

export default MentorCard;
