import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function LogOut() {
  const [token, setToken] = useCookies(['sessionToken']);
  let navigate = useNavigate();

  useEffect(() => {
    setToken('sessionToken', '');
    navigate('/');
  }, [setToken, navigate]);

  return null;
}

export default LogOut;
