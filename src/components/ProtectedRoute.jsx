import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  
  return isAuthenticated ? children : <Navigate to="/admin-login" replace />;
};

export default ProtectedRoute;