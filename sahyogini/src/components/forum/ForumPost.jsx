import { useState } from "react";

const ForumPost = ({ post }) => {
  const [likes, setLikes] = useState(post.likes);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post.comments || []);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleComment = () => {
    if (comment.trim() !== "") {
      setComments([...comments, comment]);
      setComment("");
    }
  };

  return (
    <div className="bg-white p-4 shadow rounded-lg mb-4">
      <h4 className="text-lg font-semibold">{post.user}</h4>
      <p className="text-gray-600">{post.content}</p>

      {/* Like & Comment Section */}
      <div className="mt-3 flex items-center space-x-4">
        <button onClick={handleLike} className="text-blue-500">
          👍 {likes} Likes
        </button>
      </div>

      {/* Comment Input */}
      <div className="mt-2">
        <input
          type="text"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <button
          onClick={handleComment}
          className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Comment
        </button>
      </div>

      {/* Display Comments */}
      <div className="mt-3">
        {comments.map((cmt, index) => (
          <p key={index} className="text-gray-700 border-t pt-2">
            {cmt}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ForumPost;
