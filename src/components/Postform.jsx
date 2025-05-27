import { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";

function PostForm() {
  const { posts, addPost } = useContext(DataContext);
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

    addPost(newPost);
    setText("");
    setImage(null);
    setError("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("Image trop lourde (max 5 Mo).");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      setError("");
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      {error && (
        <p style={{ color: "red", marginBottom: 8, fontWeight: 500 }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="post-form" style={{ marginBottom: 20 }}>
        <textarea
          placeholder="Exprime-toi..."
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (error) setError("");
          }}
          rows={4}
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 5,
            border: "1px solid #ccc",
            resize: "none",
            marginBottom: 10,
          }}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginBottom: 10 }}
        />
        <br />

        {image && (
          <img
            src={image}
            alt="Image postée"
            style={{ height: 100, marginTop: 10, borderRadius: 8 }}
          />
        )}

        <button
          type="submit"
          disabled={!text.trim()}
          style={{
            marginTop: 10,
            padding: "10px 20px",
            borderRadius: 5,
            backgroundColor: !text.trim() ? "gray" : "blue",
            color: "#fff",
            border: "none",
            cursor: !text.trim() ? "not-allowed" : "pointer",
            fontWeight: "bold",
          }}
        >
          Publier
        </button>
      </form>

      <div>
        {posts.length === 0 ? (
          <p>Vous n'avez encore rien publié.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} style={{ marginBottom: 20, border: "1px solid #ccc", padding: 10, borderRadius: 8 }}>
              <p>{post.content}</p>
              {post.image && (
                <img
                  src={post.image}
                  alt="Image du post"
                  style={{ height: 100, marginTop: 10, borderRadius: 8 }}
                />
              )}
              <small style={{ color: "#666" }}>
                Publié le {new Date(post.createdAt).toLocaleString()}
              </small>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default PostForm;
