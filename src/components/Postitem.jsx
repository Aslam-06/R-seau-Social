import { useState, useContext } from "react";
import { Card, Form, Button } from "react-bootstrap";
import Buttonlikes from "./Likebutton";
import CommentSession from "./Commentsession";
import { DataContext } from "../context/DataContext";

function PostItem({ post }) {
  const { updatepost } = useContext(DataContext);

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);

  const handleSave = () => {
    if (editedContent.trim() === "") return;
    updatepost({ ...post, content: editedContent });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedContent(post.content);
    setIsEditing(false);
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        {isEditing ? (
          <>
            <Form.Control
              as="textarea"
              rows={3}
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="mt-2 d-flex gap-2">
              <Button variant="success" size="sm" onClick={handleSave}>
                Enregistrer
              </Button>
              <Button variant="secondary" size="sm" onClick={handleCancel}>
                Annuler
              </Button>
            </div>
          </>
        ) : (
          <>
            <Card.Text>{post.content}</Card.Text>
          </>
        )}

        {post.image && (
          <div className="mb-3">
            <img
              src={post.image}
              alt="Post"
              style={{ maxWidth: "100%", borderRadius: "4px" }}
            />
          </div>
        )}

        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <Buttonlikes postID={post.id} />
          <CommentSession postID={post.id} />

          <small className="text-muted">
            Publié le {new Date(post.createdAt).toLocaleString()}
          </small>
        </div>
      </Card.Body>
    </Card>
  );
}

export default PostItem;