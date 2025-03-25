import MentorCard from "../../pages/education/MentorCard";

const mentors = [
  {
    name: "Priya Sharma",
    expertise: "Business Strategy",
    contact: "priya@example.com",
    availability: "Mon-Fri 2-4 PM",
  },
  {
    name: "Amit Verma",
    expertise: "Finance & Investments",
    contact: "amit@example.com",
    availability: "Tue-Thu 3-5 PM",
  },
];

const Mentorship = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">
        Mentorship for Women Entrepreneurs
      </h2>

      {/* Mentor Booking */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mentors.map((mentor) => (
          <MentorCard key={mentor.name} mentor={mentor} />
        ))}
      </div>

      {/* Webinars Section */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-3">Upcoming Webinars</h3>
        <div className="bg-white p-4 shadow rounded-lg">
          <p>
            <strong>Title:</strong> Scaling Your Business
          </p>
          <p>
            <strong>Speaker:</strong> Dr. Nisha Gupta
          </p>
          <p>
            <strong>Date:</strong> 5th April 2025
          </p>
          <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Register for Webinar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Mentorship;
