import { useState } from "react";
import { Card, Form } from "react-bootstrap";
import Buttonlikes from "./Likebutton";
import CommentSession from "./Commentsession";

function PostItem({ post }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);

  return (
    <Card className="mb-3">
      <Card.Body>
        {isEditing ? (
          <Form.Control
            as="textarea"
            rows={3}
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        ) : (
          <Card.Text>{post.content}</Card.Text>
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
          <CommentSession postID={post.id}/>

          <small className="text-muted">
            Publié le {new Date(post.createdAt).toLocaleString()}
          </small>
        </div>
      </Card.Body>
    </Card>
  );
}

export default PostItem;
