import { useState, useContext } from "react";
import { FaEdit, FaPaperPlane } from "react-icons/fa";
import Commentlike from "./Commentlike";
import { DataContext } from "../context/Datacontext";
import { FiEdit } from "react-icons/fi";

function CommentSession({ postID }) {
  const [text, setText] = useState("");
  const { comments, setComments,updatecomments } = useContext(DataContext);

  const handleSend = (e) => {
    e.preventDefault();

    if (text.trim() === "") return;

    const newComment = {
      id: Date.now(),
      postID, 
      content: text.trim(),
      createdat: new Date().toISOString(),
      love: [],
    };

    const updated = [newComment, ...comments];
    setComments(updated);
    localStorage.setItem("comments", JSON.stringify(updated));
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
          placeholder="Écrivez un commentaire..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            background: "transparent",
            fontSize: "14px",
          }}
        />
        <button
          type="submit"
          disabled={text.trim() === ""}
          style={{
            background: "none",
            border: "none",
            cursor: text.trim() === "" ? "not-allowed" : "pointer",
          }}
        >
          <FaPaperPlane
            size={20}
            color={text.trim() === "" ? "#aaa" : "#4CAF50"}
          />
        </button>
      </form>

      <div style={{ marginTop: "15px" }}>
        {postComments.map((c) => (
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
        ))}
      </div>
    </div>
  );
}

export default CommentSession;