import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { DataContext } from "../context/DataContext";
import Navigation from "../components/Navigation";
import { useNavigate } from "react-router-dom";
import PostItem from "../components/Postitem";

function Home() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { posts } = useContext(DataContext);

  useEffect(() => {
    if (!user) {
      navigate('/welcome');
    }
  }, [user, navigate]);

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
