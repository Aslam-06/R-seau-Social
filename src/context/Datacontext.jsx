import { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const viewposts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(viewposts);
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    const viewcomments = JSON.parse(localStorage.getItem("comments")) || [];
    setComments(viewcomments);
    setLoading(false);
  }, []);

  const addpost = (post) => {
    const newpost = [post,...posts];
    setPosts(newpost);
    localStorage.setItem("posts", JSON.stringify(newpost));
  };

  const deletepost = (postID) => {
    const newpost = posts.filter((post) => post.id !== postID);
    setPosts(newpost);
    localStorage.setItem("posts", JSON.stringify(newpost));
  };

  const updatepost = (update) => {
    const newpost = posts.map((post) =>
      post.id === update.id ? update : post
    );
    setPosts(newpost);
    localStorage.setItem("posts", JSON.stringify(newpost));
  };

  const addcomment = (comment) => {
    const newcomments = [comment,...comments];
    setComments(newcomments);
    localStorage.setItem("comments", JSON.stringify(newcomments));
  };

  const deletecomments = (commentID) => {
    const newcomments = comments.filter((comment) => comment.id !== commentID);
    setComments(newcomments);
    localStorage.setItem("comments", JSON.stringify(newcomments));
  };

  const updatecomments = (updatecomment) => {
    const newcomments = comments.map((comment) =>
      comment.id === updatecomment.id ? updatecomment : comment
    );
    setComments(newcomments);
    localStorage.setItem("comments", JSON.stringify(newcomments));
  };

  return (
    <DataContext.Provider
      value={{
        posts,
        setPosts,
        comments,
        setComments,
        addpost,
        addcomment,
        deletepost,
        deletecomments,
        updatepost,
        updatecomments,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
