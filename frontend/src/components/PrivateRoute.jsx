import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Make sure this path is correct

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth(); // Check if user is logged in (use your own auth logic here)
  console.log('currentUser:', currentUser);
  if (!currentUser) {
    // If not logged in, redirect to login page
    return <Navigate to="/login" />;
  }

  // If logged in, render the children components
  return children;
};

export default PrivateRoute;
