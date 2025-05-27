import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { DataContext } from "../context/DataContext";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";

function Buttonlikes({ postID }) {
  const { user } = useContext(AuthContext);
  const { posts, setPosts } = useContext(DataContext);

  const post = posts.find((p) => p.id === postID);
  if (!post) return null; 

  const isliked = post?.like?.includes(user?.username);

  const toggleLike = () => {
    if (!user) {
      alert("Vous devez être connecté pour aimer.");
      return;
    }

    const updatedLikes = isliked
      ? post.like.filter((u) => u !== user.username)
      : [...(post.like || []), user.username];

    const newPosts = posts.map((p) =>
      p.id === postID ? { ...p, like: updatedLikes } : p
    );

    setPosts(newPosts);
    localStorage.setItem("posts", JSON.stringify(newPosts));
  };

  return (
    <button
      onClick={toggleLike}
      style={{ background: "none", border: "none", cursor: user ? "pointer" : "not-allowed" }}
      aria-label={isliked ? "Retirer le like" : "Ajouter un like"}
      disabled={!user}
      title={!user ? "Connectez-vous pour aimer" : ""}
    >
      {isliked ? <FaThumbsUp color="blue" /> : <FaRegThumbsUp />}
      <span style={{ marginLeft: 4 }}>{post.like?.length || 0}</span>
    </button>
  );
}

export default Buttonlikes;