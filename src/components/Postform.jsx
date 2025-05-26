import { useState, useContext } from "react";
import { DataContext } from "../context/Datacontext";

function PostForm() {
  const { addpost } = useContext(DataContext); 
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.trim() === "") {
      setError("Le texte du post est requis.");
      return;
    }

    const newPost = {
      id: Date.now(),
      content: text,
      image,
      createdAt: new Date().toISOString(),
      like: [], 
      comments: [],
    };

    addpost(newPost);
    setText("");
    setImage(null);
    setError("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      {error && (
        <p style={{ color: "red", marginBottom: "8px", fontWeight: "500" }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="post-form" style={{ marginBottom: "20px" }}>
        <textarea
          placeholder="Exprime-toi..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            resize: "none",
            marginBottom: "10px",
          }}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginBottom: "10px" }}
        /> <br />

        {image && (
          <img
            src={image}
            alt="Prévisualisation"
            style={{height:"100px", marginTop: "10px", borderRadius: "8px" }}
          />
        )}

        <button
          type="submit"
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            borderRadius: "5px",
            backgroundColor: "blue",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Publier
        </button>
      </form>
    </>
  );
}

export default PostForm;
