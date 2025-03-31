import { useState } from "react";
import ForumPost from "../../components/forum/ForumPost";
import ForumInput from "../../components/forum/ForumInput";
import { useLanguage } from "../../context/LanguageContext";

const CommunityForum = () => {
  const { language } = useLanguage();
  
  // Content object with English and Hindi translations
  const content = {
    en: {
      title: "💬 Community Forum",
      description: "Ask questions, share advice, and support fellow women entrepreneurs.",
      samplePosts: [
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
      ]
    },
    hi: {
      title: "💬 समुदाय मंच",
      description: "प्रश्न पूछें, सलाह साझा करें, और साथी महिला उद्यमियों का समर्थन करें।",
      samplePosts: [
        {
          user: "नेहा शर्मा",
          content: "छोटे व्यवसाय के लिए सबसे अच्छे फंडिंग विकल्प क्या हैं?",
          likes: 3,
          comments: [
            "सरकारी योजनाओं का प्रयास करें!",
            "एंजेल निवेशक एक अच्छा विकल्प हैं।",
          ],
        },
        {
          user: "पूजा मेहता",
          content: "मैं अपनी वित्तीय साक्षरता कैसे सुधार सकती हूँ?",
          likes: 5,
          comments: [
            "ऑनलाइन मुफ्त कोर्स उपलब्ध हैं!",
            "'रिच डैड पुअर डैड' पढ़ने का प्रयास करें।",
          ],
        },
      ]
    }
  };
  
  // Use the content for current language
  const c = content[language];
  
  // Initialize state with translated sample posts
  const [posts, setPosts] = useState(c.samplePosts);
  
  // Update posts when language changes
  useState(() => {
    setPosts(c.samplePosts);
  }, [language]);

  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">{c.title}</h2>
      <p className="text-gray-600 mb-6">
        {c.description}
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