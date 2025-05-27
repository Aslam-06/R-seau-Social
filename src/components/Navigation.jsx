import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Nav } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaReact, FaSignInAlt, FaSignOutAlt, FaUserCircle } from "react-icons/fa";

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/welcome');
  };

  return (
    <div style={{ textAlign: "center", paddingTop: "5px" }}>
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "50%",
            padding: "5px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <FaReact size={40} color="#61DBFB" />
        </div>
      </div>

      <Nav fill variant="tabs" activeKey={location.pathname} style={{ display: "flex" }}>
        <Nav.Item style={{ flex: 1, textAlign: "center" }}>
          <Nav.Link onClick={() => navigate("/welcome")} eventKey="/welcome">
            <FaSignInAlt size={20} style={{ marginRight: "5px" }} />
          </Nav.Link>
        </Nav.Item>

        <Nav.Item style={{ flex: 1, textAlign: "center" }}>
          <Nav.Link onClick={() => navigate("/")} eventKey="/">
            <FaHome size={20} style={{ marginRight: "5px" }} />
            Accueil
          </Nav.Link>
        </Nav.Item>

        <Nav.Item style={{ flex: 1, textAlign: "center" }}>
          <Nav.Link onClick={() => navigate("/profile")} eventKey="/profile">
            <FaUserCircle size={20} style={{ marginRight: "5px" }} />
            Profile
          </Nav.Link>
        </Nav.Item>

        <Nav.Item style={{ flex: 1, textAlign: "center" }}>
          <Nav.Link onClick={handleLogout}>
            <FaSignOutAlt size={20} style={{ marginRight: "5px" }} />
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default Navigation;