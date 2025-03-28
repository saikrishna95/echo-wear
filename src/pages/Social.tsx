
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Home, 
  Hanger, 
  Users, 
  UserIcon,
  Heart,
  MessageCircle,
  Share2,
  Search,
  Plus,
  Star,
  Bookmark
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

// Mock data for social posts
const mockPosts = [
  {
    id: 1,
    user: {
      name: "Sophie Williams",
      username: "sophiestyle",
      avatar: "https://placehold.co/200x200/ffdee2/333333?text=SW"
    },
    content: "Just found this amazing sustainable brand for summer dresses! The fabric is so comfortable and eco-friendly.",
    image: "https://placehold.co/600x800/eeeeee/333333?text=Summer+Fashion",
    likes: 256,
    comments: 42,
    liked: false,
    saved: false,
    isVerified: true,
    rating: 4.8,
    brand: "EcoChic",
    timeAgo: "2h"
  },
  {
    id: 2,
    user: {
      name: "Marcus Chen",
      username: "marcuswears",
      avatar: "https://placehold.co/200x200/d3e4fd/333333?text=MC"
    },
    content: "Streetwear essentials for fall 2023. These pieces mix and match perfectly for any casual occasion.",
    image: "https://placehold.co/600x800/333333/ffffff?text=Fall+Streetwear",
    likes: 189,
    comments: 23,
    liked: true,
    saved: true,
    isVerified: false,
    rating: 4.5,
    brand: "UrbanEdge",
    timeAgo: "5h"
  },
  {
    id: 3,
    user: {
      name: "Zara Official",
      username: "zara",
      avatar: "https://placehold.co/200x200/111111/ffffff?text=Z"
    },
    content: "New collection just dropped! Explore our latest designs for the upcoming season.",
    image: "https://placehold.co/600x800/f6f6f7/333333?text=New+Collection",
    likes: 1204,
    comments: 156,
    liked: false,
    saved: false,
    isVerified: true,
    rating: 4.7,
    brand: "Zara",
    timeAgo: "1d"
  }
];

// Mock data for trending hashtags
const mockTrends = [
  "#SustainableFashion",
  "#SummerStyle2023",
  "#MinimalistWardrobe",
  "#VintageFinds",
  "#FashionTech"
];

const Social = () => {
  const [posts, setPosts] = useState(mockPosts);
  const [selectedTab, setSelectedTab] = useState("feed");
  const { toast } = useToast();

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1 
          } 
        : post
    ));
  };

  const handleSave = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, saved: !post.saved } 
        : post
    ));
    
    toast({
      title: "Post Saved",
      description: "This post has been saved to your collection.",
    });
  };

  const handleComment = (postId: number) => {
    toast({
      title: "Comments Coming Soon",
      description: "The comments section will be available in a future update!",
    });
  };

  const handleShare = (postId: number) => {
    toast({
      title: "Share Feature Coming Soon",
      description: "The ability to share posts will be available soon!",
    });
  };

  const handleNewPost = () => {
    toast({
      title: "Create Post Coming Soon",
      description: "The ability to create new posts will be available in a future update!",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-fashion-gray">
      {/* Top Navigation */}
      <header className="w-full py-4 px-6 bg-white shadow-sm z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-fashion-navy">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-bold text-fashion-navy">
              Fashion Social
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-fashion-navy"
              onClick={() => {
                toast({
                  title: "Search Coming Soon",
                  description: "The search functionality will be available in a future update!",
                });
              }}
            >
              <Search className="h-5 w-5" />
            </Button>
            <Link to="/profile">
              <Avatar>
                <AvatarImage src="https://placehold.co/200x200/f6f6f7/333333?text=You" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-3xl mx-auto w-full pb-20">
        <Tabs 
          defaultValue="feed" 
          className="w-full"
          onValueChange={setSelectedTab}
        >
          <TabsList className="grid w-full grid-cols-2 sticky top-0 z-10 mb-4">
            <TabsTrigger value="feed">For You</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
          </TabsList>
          
          {/* Feed Tab */}
          <TabsContent value="feed" className="animate-fade-in px-4">
            {/* Create Post Button */}
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-lg font-medium">Latest Posts</h2>
              <Button 
                onClick={handleNewPost}
                className="bg-fashion-teal hover:bg-fashion-teal/90"
              >
                <Plus className="mr-2 h-4 w-4" />
                New Post
              </Button>
            </div>
            
            {/* Social Feed */}
            <div className="space-y-6">
              {posts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  {/* Post Header */}
                  <div className="p-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={post.user.avatar} />
                        <AvatarFallback>{post.user.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-1">
                          <p className="font-medium">{post.user.name}</p>
                          {post.isVerified && (
                            <span className="text-xs bg-blue-500 text-white rounded-full px-1 py-0.5">✓</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">@{post.user.username} • {post.timeAgo}</p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={post.saved ? "text-yellow-500" : "text-gray-400"}
                      onClick={() => handleSave(post.id)}
                    >
                      <Bookmark className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  {/* Post Content */}
                  <div>
                    <p className="px-4 pb-3">{post.content}</p>
                    <img 
                      src={post.image} 
                      alt="Post content" 
                      className="w-full max-h-96 object-cover" 
                    />
                  </div>
                  
                  {/* Product Rating (if available) */}
                  {post.brand && (
                    <div className="px-4 py-3 bg-gray-50 flex justify-between items-center">
                      <div>
                        <span className="text-sm font-medium">{post.brand}</span>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm">{post.rating}</span>
                        </div>
                      </div>
                      <Button size="sm" className="bg-fashion-navy hover:bg-fashion-navy/90">
                        Shop Now
                      </Button>
                    </div>
                  )}
                  
                  {/* Post Actions */}
                  <div className="px-4 py-3 flex justify-between">
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className={post.liked ? "text-red-500" : "text-gray-500"}
                        onClick={() => handleLike(post.id)}
                      >
                        <Heart className={`h-5 w-5 ${post.liked ? "fill-red-500" : ""}`} />
                      </Button>
                      <span className="text-sm">{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-gray-500"
                        onClick={() => handleComment(post.id)}
                      >
                        <MessageCircle className="h-5 w-5" />
                      </Button>
                      <span className="text-sm">{post.comments}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-gray-500"
                      onClick={() => handleShare(post.id)}
                    >
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Trending Tab */}
          <TabsContent value="trending" className="animate-fade-in px-4">
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-4">Trending Topics</h2>
              <div className="flex flex-wrap gap-2">
                {mockTrends.map((trend, index) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    className="rounded-full bg-white hover:bg-gray-50"
                  >
                    {trend}
                  </Button>
                ))}
              </div>
            </div>
            
            <h2 className="text-lg font-medium mb-4">Popular Brands & Creators</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <img 
                    src={`https://placehold.co/400x200/${index % 2 === 0 ? '333333/ffffff' : 'f6f6f7/333333'}?text=Brand+${index + 1}`} 
                    alt={`Brand ${index + 1}`} 
                    className="w-full h-32 object-cover" 
                  />
                  <div className="p-3">
                    <h3 className="font-medium">Brand {index + 1}</h3>
                    <p className="text-xs text-gray-500">Fashion, Lifestyle</p>
                    <Button size="sm" className="mt-2 w-full bg-fashion-teal hover:bg-fashion-teal/90">
                      Follow
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            
            <h2 className="text-lg font-medium mb-4">Weekly Highlights</h2>
            <Card className="overflow-hidden mb-6">
              <div className="p-4 bg-fashion-navy text-white">
                <h3 className="font-medium">Style of the Week</h3>
                <p className="text-sm text-white/80">Discover the most influential looks</p>
              </div>
              <div className="grid grid-cols-3 gap-2 p-4">
                {Array.from({ length: 6 }).map((_, index) => (
                  <img 
                    key={index} 
                    src={`https://placehold.co/200x200/${index % 2 === 0 ? 'eeeeee/333333' : '333333/ffffff'}?text=Look+${index + 1}`} 
                    alt={`Look ${index + 1}`} 
                    className="w-full h-24 object-cover rounded" 
                  />
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-around">
            <Link 
              to="/" 
              className="flex flex-col items-center py-3 px-4 text-fashion-navy"
            >
              <Home className="h-6 w-6" />
              <span className="text-xs mt-1">Home</span>
            </Link>
            <Link 
              to="/closet" 
              className="flex flex-col items-center py-3 px-4 text-fashion-navy"
            >
              <Hanger className="h-6 w-6" />
              <span className="text-xs mt-1">Closet</span>
            </Link>
            <Link 
              to="/social" 
              className={`flex flex-col items-center py-3 px-4 ${selectedTab === "social" ? "text-fashion-teal" : "text-fashion-navy"}`}
            >
              <Users className="h-6 w-6" />
              <span className="text-xs mt-1">Social</span>
            </Link>
            <Link 
              to="/profile" 
              className="flex flex-col items-center py-3 px-4 text-fashion-navy"
            >
              <UserIcon className="h-6 w-6" />
              <span className="text-xs mt-1">Profile</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Social;
