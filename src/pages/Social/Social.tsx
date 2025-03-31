
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageCircle, Share2, Send } from "lucide-react";
import { showToast } from "@/utils/toast";

// Mock data for social posts
const INITIAL_POSTS = [
  {
    id: 1,
    user: {
      name: "Ella Johnson",
      avatar: "https://i.pravatar.cc/150?img=1",
      handle: "@ella_style",
    },
    content: "Just added this amazing summer outfit to my closet! What do you think?",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000",
    likes: 24,
    comments: 3,
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    user: {
      name: "Alex Wang",
      avatar: "https://i.pravatar.cc/150?img=4",
      handle: "@alexfashion",
    },
    content: "Perfect outfit for today's weather. Layering is key for this season!",
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1000",
    likes: 42,
    comments: 7,
    timestamp: "5 hours ago",
  },
  {
    id: 3,
    user: {
      name: "Jordan Taylor",
      avatar: "https://i.pravatar.cc/150?img=8",
      handle: "@jt_styles",
    },
    content: "My AI stylist suggested this combo and I'm loving it. The EchoWear app is a game changer!",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1000",
    likes: 18,
    comments: 2,
    timestamp: "1 day ago",
  }
];

const Social = () => {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [newPost, setNewPost] = useState("");
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const handleLike = (postId: number) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, likes: post.likes - 1 } : post
      ));
    } else {
      setLikedPosts([...likedPosts, postId]);
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      ));
      showToast("Liked!", "You liked a post");
    }
  };

  const handlePostSubmit = () => {
    if (!newPost.trim()) return;
    
    const newPostObj = {
      id: Date.now(),
      user: {
        name: "You",
        avatar: "https://i.pravatar.cc/150?img=11",
        handle: "@your_style",
      },
      content: newPost,
      image: "",
      likes: 0,
      comments: 0,
      timestamp: "Just now",
    };
    
    setPosts([newPostObj, ...posts]);
    setNewPost("");
    showToast("Posted!", "Your post has been shared with your followers");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Style Feed</h1>
        
        {/* New Post Input */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="https://i.pravatar.cc/150?img=11" />
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
              <span className="font-medium">Share your style</span>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea 
              placeholder="What's your fashion statement today?" 
              className="w-full mb-3"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            />
          </CardContent>
          <CardFooter className="justify-end">
            <Button 
              onClick={handlePostSubmit}
              className="bg-fashion-teal hover:bg-fashion-teal/90"
              disabled={!newPost.trim()}
            >
              Post
            </Button>
          </CardFooter>
        </Card>
        
        {/* Posts Feed */}
        <div className="space-y-4">
          {posts.map(post => (
            <Card key={post.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={post.user.avatar} />
                    <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{post.user.name}</div>
                    <div className="text-sm text-gray-500">{post.user.handle} • {post.timestamp}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="mb-3">{post.content}</p>
                {post.image && (
                  <img 
                    src={post.image} 
                    alt="Post" 
                    className="w-full h-64 object-cover rounded-md mb-3" 
                  />
                )}
              </CardContent>
              <CardFooter className="border-t pt-3 flex justify-between">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`flex items-center gap-1 ${likedPosts.includes(post.id) ? 'text-red-500' : ''}`}
                  onClick={() => handleLike(post.id)}
                >
                  <Heart className="h-4 w-4" />
                  <span>{post.likes}</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
                  <span>{post.comments}</span>
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* Comment Input (appears below a selected post in a real app) */}
        <div className="flex items-center gap-2 mt-4 bg-white p-3 rounded-full border">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://i.pravatar.cc/150?img=11" />
            <AvatarFallback>You</AvatarFallback>
          </Avatar>
          <Input 
            placeholder="Add a comment..." 
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button size="icon" variant="ghost" className="rounded-full">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Social;
