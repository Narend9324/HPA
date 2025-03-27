import  { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route,useLocation , useNavigate} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Portal from "./pages/Portal";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import NadoAi from "./pages/NadoAi";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    console.log('tokenApp:', token);

    // If token exists in localStorage but not in the current URL
    if (token && !window.location.href.includes(`${token}`)) {
      // Append the token to the current URL
      const newUrl = `${window.location.pathname}/?user=${token}`;
      navigate(newUrl);
    }
  }, [navigate]);


  return (
    <>
      <AuthProvider>
        <ConditionalNavbar />
        <Routes>
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
          <Route path="/portal" element={<PrivateRoute><Portal /></PrivateRoute>} />
          <Route path="/nado-ai" element={<PrivateRoute><NadoAi /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </AuthProvider>
      </>
  );
}

const ConditionalNavbar = () => {
  const location = useLocation();
  const noNavbarRoutes = ['/login', '/signup'];

  return !noNavbarRoutes.includes(location.pathname) ? <Navbar /> : null;
};
export default App;
