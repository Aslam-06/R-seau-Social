import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import PostItem from '../components/Postitem';
import PostForm from '../components/Postform';
import { DataContext } from '../context/DataContext';

function Profile() {
  const { user } = useContext(AuthContext);
  const { posts } = useContext(DataContext);

  if (!user) {
    return <p>Veuillez vous connecter pour accéder à votre profil.</p>;
  }

  const userPosts = posts.filter(post => post.userId === user.id);

  return (
    <div className="profile-page p-3">

      <div className="my-4">
        <h3>Créer un {userPosts.length > 0 ? "nouveau " : ""}post</h3>
        <PostForm />
      </div>

      <div>
        <h3>Mes publications</h3>
        {userPosts.length > 0 ? (
          userPosts.map(post => (
            <PostItem key={post.id} post={post} />
          ))
        ) : (
          <p>Vous n'avez encore rien publié.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
