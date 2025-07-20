import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import UserDashboard from './pages/UserDashboard';
import Complaint from "./pages/Complaint"
import KeyFeatures from './pages/KeyFeatures';
import EmailVerify from './pages/EmailVerify';
import ResetPassword from './pages/ResetPassword';


function App() {
  
  return (
    <div className="mx-4 sm:mx-[10%]">
      <Navbar/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="key-features" element={<KeyFeatures/>}/>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify/>} />
        <Route path="/reset-password" element={<ResetPassword/>} />
        
        <Route path="/complaint" element={<Complaint />} />
      </Routes>

      <Footer/>
    </div>
  )
}

export default App
