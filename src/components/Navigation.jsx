import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaHome, FaReact, FaSignInAlt, FaSignOutAlt, FaUserCircle } from "react-icons/fa";

function Navigation() {
  const navigate = useNavigate();
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

      <Nav fill variant="tabs" defaultActiveKey="/home" style={{ display: "flex" }}>
        <Nav.Item style={{ flex: 1, textAlign: "left" }}>
          <Nav.Link onClick={() => navigate("/welcome")}>
            <FaSignInAlt size={20} style={{ marginRight: "2px" }} />
          </Nav.Link>
        </Nav.Item>

        <Nav.Item style={{ flex: 1, textAlign: "left" }}>
          <Nav.Link onClick={() => navigate("/")}>
            <FaHome size={20} style={{ marginRight: "5px" }} />
          </Nav.Link>
          <p>Accueil</p>
        </Nav.Item>

        <Nav.Item style={{ flex: 1, textAlign: "center" }}>
          <Nav.Link onClick={() => navigate("/profile")}>
            <FaUserCircle size={20} style={{ marginRight: "5px" }} />
          </Nav.Link>
          <p>Profile</p>
        </Nav.Item>

        <Nav.Item style={{ flex: 1, textAlign: "right" }}>
          <Nav.Link onClick={handleLogout}> 
            <FaSignOutAlt size={20} style={{ marginRight: "5px" }} />
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default Navigation;
