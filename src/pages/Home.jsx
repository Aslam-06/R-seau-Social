import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { DataContext } from "../context/DataContext";
import Navigation from "../components/Navigation";
import { useNavigate } from "react-router-dom";
import PostItem from "../components/Postitem";

function Home() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { posts } = useContext(DataContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/welcome');
    } else {
      setLoading(false);
    }
  }, [user, navigate]);

  if (loading) {
    return <p className="text-center mt-5">Chargement...</p>;
  }

  return (
    <>
      <Navigation />
      <main className="container mt-4 mb-5">
        <h2 className="mb-4 text-center text-primary fw-bold">Fil d'actualités</h2>

        {posts.length === 0 ? (
          <p className="text-center text-muted fs-5">Aucun post pour l'instant.</p>
        ) : (
          <div className="row gy-4">
            {posts.map((post) => (
              <div key={post.id} className="col-12 col-md-6 col-lg-4">
                <PostItem post={post} />
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}

export default Home;