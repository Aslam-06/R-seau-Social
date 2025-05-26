import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { DataContext } from "../context/DataContext";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";

function Buttonlikes({ postID }) {
  const { user } = useContext(AuthContext);
  const { posts, setPosts } = useContext(DataContext);

  const post = posts.find((p) => p.id === postID);
  const isliked = post?.like?.includes(user?.username);

  const toggleLike = () => {
    if (!user) {
      alert("Vous devez être connecté pour aimer.");
      return;
    }

    const newPosts = posts.map((p) => {
      if (p.id === postID) {
        const updatedLikes = isliked
          ? p.like.filter((u) => u !== user.username)
          : [...(p.like || []), user.username];

        return { ...p, like: updatedLikes };
      }
      return p;
    });

    setPosts(newPosts);
    localStorage.setItem("posts", JSON.stringify(newPosts));
  };

  return (
    <button
      onClick={toggleLike}
      style={{ background: "none", border: "none", cursor: "pointer" }}
      aria-label={isliked ? "Retirer le like" : "Ajouter un like"}
    >
      {isliked ? <FaThumbsUp color="blue" /> : <FaRegThumbsUp />}
      <span>{post?.like?.length || 0}</span>
    </button>
  );
}

export default Buttonlikes;
