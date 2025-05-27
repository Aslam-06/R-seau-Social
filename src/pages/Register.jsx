import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { AuthContext } from "../context/Authcontext";

function Inscription() {
  const [message, setMessage] = useState("");
  const [localError, setLocalError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm();

  const { registerUser, error } = useContext(AuthContext); // bien utiliser registerUser
  const navigate = useNavigate();

  const password = watch("password");

  const onSubmit = async (data) => {
    setLocalError("");
    setMessage("");
    setLoading(true);

    try {
      const success = await registerUser(data); // bien utiliser registerUser

      if (success) {
        reset();
        setMessage("Inscription réussie !");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setLocalError(error || "Erreur inconnue lors de l'inscription.");
      }
    } catch (err) {
      setLocalError(err.message || "Erreur lors de l'inscription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Row className="justify-content-center w-100">
        <Col xs={12} sm={10} md={8} lg={6} xl={5}>
          <h2 className="mb-4 text-center">Inscription</h2>

          {message && <Alert variant="success">{message}</Alert>}
          {(localError || error) && <Alert variant="danger">{localError || error}</Alert>}

          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Form.Group className="mb-3">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez votre nom"
                {...register("nom", {
                  required: "Veuillez entrer votre nom",
                  pattern: {
                    value: /^[a-zA-Z\s-]+$/,
                    message: "Ce champ ne doit contenir que des lettres",
                  },
                })}
                isInvalid={!!errors.nom}
              />
              <Form.Control.Feedback type="invalid">
                {errors.nom?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Prénom</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez votre prénom"
                {...register("prenom", {
                  required: "Veuillez entrer votre prénom",
                  pattern: {
                    value: /^[a-zA-Z\s-]+$/,
                    message: "Ce champ ne doit contenir que des lettres",
                  },
                })}
                isInvalid={!!errors.prenom}
              />
              <Form.Control.Feedback type="invalid">
                {errors.prenom?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Adresse Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Entrez votre email"
                {...register("email", {
                  required: "Veuillez entrer votre email",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Format d'email invalide",
                  },
                })}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                placeholder="Entrez votre mot de passe"
                {...register("password", {
                  required: "Ce champ est obligatoire",
                  minLength: { value: 5, message: "Au moins 5 caractères" },
                  maxLength: { value: 10, message: "Au plus 10 caractères" },
                })}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirmez votre mot de passe</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirmez votre mot de passe"
                {...register("confirmPassword", {
                  required: "Ce champ est obligatoire",
                  validate: (value) =>
                    value === password || "Les mots de passe ne correspondent pas",
                })}
                isInvalid={!!errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Numéro</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez votre numéro"
                {...register("numero", {
                  required: "Veuillez entrer votre numéro",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Ce champ ne doit contenir que des chiffres",
                  },
                })}
                isInvalid={!!errors.numero}
              />
              <Form.Control.Feedback type="invalid">
                {errors.numero?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Sexe</Form.Label>
              <Form.Select
                {...register("sexe", { required: "Veuillez choisir un sexe" })}
                isInvalid={!!errors.sexe}
              >
                <option value="">Sélectionnez votre sexe</option>
                <option value="Masculin">Masculin</option>
                <option value="Feminin">Féminin</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.sexe?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              variant="success"
              type="submit"
              className="mt-3 w-100"
              disabled={loading}
            >
              {loading ? "Enregistrement..." : "S'inscrire"}
            </Button>

            <div className="mt-3 text-center">
              Vous avez déjà un compte ?{" "}
              <Link to="/login" style={{ textDecoration: "underline" }}>
                Connectez-vous
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Inscription;
