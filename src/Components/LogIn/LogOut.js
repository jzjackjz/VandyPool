import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import axios from 'axios';

function LogOut() {
  const { setIsAuthenticated } = useAuth();
  let navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('sessionToken')
    delete axios.defaults.headers.common['Authorization'];

    navigate('/');
  }, [navigate]);

  setIsAuthenticated(false);
  return null;
}

export default LogOut;
