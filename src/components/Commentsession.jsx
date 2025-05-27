import { useState, useContext } from "react";
import { FaPaperPlane } from "react-icons/fa";
import Commentlike from "./Commentlike";
import { DataContext } from "../context/DataContext";
import { AuthContext } from "../context/AuthContext";

function CommentSession({ postID }) {
  const [text, setText] = useState("");
  const { comments, setComments } = useContext(DataContext);
  const { user } = useContext(AuthContext);

  const handleSend = (e) => {
    e.preventDefault();

    if (!user) {
      alert("Vous devez être connecté pour commenter.");
      return;
    }

    if (text.trim() === "") return;

    const newComment = {
      id: Date.now(),
      postID,
      content: text.trim(),
      createdAt: new Date().toISOString(),
      love: [],
      username: user.username,
    };

    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));
    setText("");
  };

  const postComments = comments.filter((c) => c.postID === postID);

  return (
    <div style={{ width: "100%", marginTop: "10px" }}>
      <form
        onSubmit={handleSend}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "8px 12px",
          border: "1px solid #ccc",
          borderRadius: "30px",
          background: "#f9f9f9",
        }}
      >
        <input
          type="text"
          placeholder={user ? "Écrivez un commentaire..." : "Connectez-vous pour commenter"}
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={!user}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            background: "transparent",
            fontSize: "14px",
            color: user ? "inherit" : "#888",
            cursor: user ? "text" : "not-allowed",
          }}
        />
        <button
          type="submit"
          disabled={text.trim() === "" || !user}
          style={{
            background: "none",
            border: "none",
            cursor: text.trim() === "" || !user ? "not-allowed" : "pointer",
          }}
          aria-label="Envoyer le commentaire"
        >
          <FaPaperPlane
            size={20}
            color={text.trim() === "" || !user ? "#aaa" : "#4CAF50"}
          />
        </button>
      </form>

      <div style={{ marginTop: "15px" }}>
        {postComments.length === 0 ? (
          <p style={{ color: "#666", fontStyle: "italic" }}>Aucun commentaire pour ce post.</p>
        ) : (
          postComments.map((c) => (
            <div
              key={c.id}
              style={{
                background: "#f1f1f1",
                padding: "8px 12px",
                borderRadius: "12px",
                marginBottom: "8px",
              }}
            >
              <p style={{ margin: 0 }}>{c.content}</p>
              <div style={{ marginTop: "5px" }}>
                <Commentlike commentID={c.id} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CommentSession;