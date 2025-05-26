import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";  
import { DataContext } from "../context/DataContext"; 
import { FaHeart, FaRegHeart } from "react-icons/fa";

function Commentlike({ commentID }) {
  const { user } = useContext(AuthContext);
  const { comments, setComments } = useContext(DataContext);

  // Vérifie que les données sont prêtes
  if (!user || !user.username || !comments || comments.length === 0) return null;

  const comment = comments.find(c => c.id === commentID);
  if (!comment) return null;

  const isLoved = Array.isArray(comment.love) && comment.love.includes(user.username);

  const toggleComment = () => {
    const updatedComments = comments.map(c => {
      if (c.id === commentID) {
        const updatedLove = isLoved
          ? c.love?.filter(u => u !== user.username)
          : [...(c.love || []), user.username];

        return { ...c, love: updatedLove };
      }
      return c;
    });

    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));
  };

  return (
    <button
      onClick={toggleComment}
      style={{ background: "none", border: "none", cursor: "pointer" }}
      aria-label={isLoved ? "Retirer le like" : "Aimer le commentaire"}
      type="button"
    >
      {isLoved ? <FaHeart color="black" /> : <FaRegHeart />}
      <span>{comment.love?.length || 0}</span>
    </button>
  );
}

export default Commentlike;
