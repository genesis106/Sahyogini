import { useState } from "react";

const ForumInput = ({ addPost }) => {
  const [content, setContent] = useState("");

  const handlePost = () => {
    if (content.trim() !== "") {
      addPost({
        user: "Anonymous User", // Can be replaced with actual user name
        content,
        likes: 0,
        comments: [],
      });
      setContent("");
    }
  };

  return (
    <div className="bg-white p-4 shadow rounded-lg mb-4">
      <textarea
        rows="3"
        placeholder="Ask a question or share your thoughts..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2 w-full rounded"
      />
      <button
        onClick={handlePost}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Post
      </button>
    </div>
  );
};

export default ForumInput;
