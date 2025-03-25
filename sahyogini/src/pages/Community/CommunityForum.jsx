import { useState } from "react";
import ForumPost from "../../components/forum/ForumPost";
import ForumInput from "../../components/forum/ForumInput";

const CommunityForum = () => {
  const [posts, setPosts] = useState([
    {
      user: "Neha Sharma",
      content: "What are the best funding options for a small business?",
      likes: 3,
      comments: [
        "Try government schemes!",
        "Angel investors are a good option.",
      ],
    },
    {
      user: "Pooja Mehta",
      content: "How do I improve my financial literacy?",
      likes: 5,
      comments: [
        "There are free courses online!",
        "Try reading 'Rich Dad Poor Dad'.",
      ],
    },
  ]);

  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">💬 Community Forum</h2>
      <p className="text-gray-600 mb-6">
        Ask questions, share advice, and support fellow women entrepreneurs.
      </p>

      {/* New Post Input */}
      <ForumInput addPost={addPost} />

      {/* Display Forum Posts */}
      <div>
        {posts.map((post, index) => (
          <ForumPost key={index} post={post} />
        ))}
      </div>
    </div>
  );
};

export default CommunityForum;
