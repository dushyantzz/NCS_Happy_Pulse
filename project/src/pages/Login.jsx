import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Stethoscope } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple login - just navigate to home
    navigate('/');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#ffffff] to-[#dfffe2] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Stethoscope className="h-12 w-12 text-[#09B480]" />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-gray-800">Welcome back</h2>
          <p className="mt-2 text-gray-600">Please sign in to your account</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-[#09B480] hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign in
          </button>

          <div className="text-center text-sm">
            <span className="text-gray-600">Don't have an account?</span>{' '}
            <Link to="/signup" className="text-blue-500 hover:text-blue-600">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;