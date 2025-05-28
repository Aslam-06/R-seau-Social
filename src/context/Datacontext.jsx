import { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const viewPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const viewComments = JSON.parse(localStorage.getItem("comments")) || [];
    setPosts(viewPosts);
    setComments(viewComments);
    setLoading(false);
  }, []);

  const addPost = (post) => {
    const newPosts = [post, ...posts];
    setPosts(newPosts);
    localStorage.setItem("posts", JSON.stringify(newPosts));
  };

  const deletePost = (postID) => {
    const newPosts = posts.filter((post) => post.id !== postID);
    setPosts(newPosts);
    localStorage.setItem("posts", JSON.stringify(newPosts));
  };

  const updatePost = (updatedPost) => {
    const newPosts = posts.map((post) =>
      post.id === updatedPost.id ? updatedPost : post
    );
    setPosts(newPosts);
    localStorage.setItem("posts", JSON.stringify(newPosts));
  };

  const addComment = (comment) => {
    const newComments = [comment, ...comments];
    setComments(newComments);
    localStorage.setItem("comments", JSON.stringify(newComments));
  };

  const deleteComment = (commentID) => {
    const newComments = comments.filter((comment) => comment.id !== commentID);
    setComments(newComments);
    localStorage.setItem("comments", JSON.stringify(newComments));
  };

  const updateComment = (updatedComment) => {
    const newComments = comments.map((comment) =>
      comment.id === updatedComment.id ? updatedComment : comment
    );
    setComments(newComments);
    localStorage.setItem("comments", JSON.stringify(newComments));
  };

  return (
    <DataContext.Provider
      value={{
        posts,
        setPosts,
        comments,
        setComments,
        addPost,
        addComment,
        deletePost,
        deleteComment,
        updatePost,
        updateComment,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
