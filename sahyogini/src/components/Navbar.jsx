import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full bg-blue-50 flex items-center p-5">
      <div className="flex-1 font-bold text-xl">Logo</div>

      <div className="mr-2 ml-2 border border-black p-2 cursor-pointer">
        Option 1
      </div>
      <div className="mr-2 ml-2 border border-black p-2 cursor-pointer">
        Option 2
      </div>
      <div className="mr-2 ml-2 border border-black p-2 cursor-pointer">
        Option 3
      </div>

      {/* Login & Signup Buttons */}
      <div className="ml-auto flex space-x-4">
        <Link to="/login">
          <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-100">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
