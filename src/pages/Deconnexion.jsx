import { useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Deconnexion() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    setUser(null);
    localStorage.removeItem('user'); 
  }, [setUser]);

  return (
    <div className="d-grid gap-2 text-center mt-5">
      <h4>Vous avez été déconnecté.</h4>
      <Button variant="primary" size="lg" onClick={() => navigate("/welcome")}>
        Retour à l’accueil
      </Button>
    </div>
  );
}

export default Deconnexion;
