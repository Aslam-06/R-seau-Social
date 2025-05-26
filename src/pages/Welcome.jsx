import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Container, Button } from "react-bootstrap";
import { FaReact } from "react-icons/fa";

function Welcome() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <Container className="text-center mt-5">
      <div>
        < FaReact size={40} color="#61DBFB"  />
      </div>
      <div>
        <h1>Bienvenue sur SphèreConnect</h1>
        <p>Rejoignez notre communauté dès maintenant</p>
      </div>
      <div>
        <Button onClick={() => navigate('/register')} className="m-2" variant="success">
          Inscription
        </Button>
        <Button onClick={() => navigate('/login')} className="m-2" variant="primary">
          Connexion
        </Button>
      </div>
    </Container>
  );
}

export default Welcome;
