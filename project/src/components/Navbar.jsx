import { Link } from 'react-router-dom';
import { Heart, Stethoscope, Calendar, Video, Menu } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Stethoscope className="h-8 w-8 text-[#09B480]" />
              <span className="ml-2 text-xl font-semibold text-gray-800">
                HappyPulse
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/prevention"
              className="flex items-center text-gray-600 hover:text-[#09B480]"
            >
              <Heart className="h-5 w-5 mr-1" />
              <span>Prevention</span>
            </Link>
            <Link
              to="/symptoms"
              className="flex items-center text-gray-600 hover:text-[#09B480]"
            >
              <span>Symptoms</span>
            </Link>
            <Link
              to="/treatment"
              className="flex items-center text-gray-600 hover:text-[#09B480]"
            >
              <span>Treatment Plans</span>
            </Link>
            <Link
              to="/education"
              className="flex items-center text-gray-600 hover:text-[#09B480]"
            >
              <Video className="h-5 w-5 mr-1" />
              <span>Education</span>
            </Link>
            <Link
              to="/appointments"
              className="flex items-center text-gray-600 hover:text-[#09B480]"
            >
              <Calendar className="h-5 w-5 mr-1" />
              <span>Appointments</span>
            </Link>

            <Link
              to="/login"
              className="text-gray-600 hover:text-[#09B480]"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-[#09B480] text-white px-4 py-2 rounded-md hover:bg-opacity-90"
            >
              Sign Up
            </Link>
          </div>

          <button className="md:hidden">
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;