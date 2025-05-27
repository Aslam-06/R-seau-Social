import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';
import { AuthContext } from '../context/Authcontext';

function Connexion() {
  const [message, setMessage] = useState('');
  const [localError, setLocalError] = useState('');
  const { register, formState: { errors }, reset, handleSubmit } = useForm();
  const { loginUser, error } = useContext(AuthContext);  
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setLocalError('');
    const success = loginUser(data);  
    if (success) {
      reset();
      setMessage('Connexion réussie');
      setTimeout(() => {
        navigate('/');
      }, 500);
    } else {
      setMessage('');
      setLocalError(error || "Erreur inconnue");
    }
  };

  return (
    <Container fluid className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <Row className="w-100 justify-content-center">
        <Col xs={11} sm={8} md={6} lg={4}>
          <Card className="p-4 shadow-sm">
            <h2 className="mb-4 text-center">Connexion</h2>

            {message && <Alert variant="success" aria-live="polite">{message}</Alert>}
            {(localError || error) && <Alert variant="danger" aria-live="assertive">{localError || error}</Alert>}

            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Entrez votre email"
                  {...register('email', {
                    required: 'Veuillez entrer votre email',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Adresse email invalide',
                    }
                  })}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Entrez votre mot de passe"
                  {...register('password', {
                    required: 'Ce champ est obligatoire',
                    minLength: { value: 5, message: 'Au moins 5 caractères' },
                    maxLength: { value: 10, message: 'Au plus 10 caractères' },
                  })}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mt-3">
                Se connecter
              </Button>
            </Form>

            <div className="mt-3 text-center">
              Vous n'avez pas encore de compte ?{' '}
              <Link to="/register" style={{ textDecoration: 'underline' }}>
                Inscrivez-vous
              </Link>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Connexion;