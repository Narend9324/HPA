import { BrowserRouter as Router, Routes, Route,useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Portal from "./pages/Portal";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ConditionalNavbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Portal" element={<Portal />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

const ConditionalNavbar = () => {
  const location = useLocation();
  const noNavbarRoutes = ['/login', '/signup'];

  return !noNavbarRoutes.includes(location.pathname) ? <Navbar /> : null;
};
export default App;
