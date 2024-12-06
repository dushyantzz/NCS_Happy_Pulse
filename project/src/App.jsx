import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Prevention from './pages/Prevention';
import Symptoms from './pages/Symptoms';
import Treatment from './pages/Treatment';
import Education from './pages/Education';
import Appointments from './pages/Appointments';
import ChatBot from './components/ChatBot';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/prevention" element={<Prevention />} />
          <Route path="/symptoms" element={<Symptoms />} />
          <Route path="/treatment" element={<Treatment />} />
          <Route path="/education" element={<Education />} />
          <Route path="/appointments" element={<Appointments />} />
        </Routes>
        <ChatBot />
      </div>
    </Router>
  );
}

export default App;