
import React from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Home, 
  ShoppingBag, 
  Users, 
  UserIcon,
  Settings,
  Camera,
  MessageCircle,
  Grid3X3,
  Bookmark,
  Edit,
  Ruler
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Profile = () => {
  const { toast } = useToast();

  const handleEditProfile = () => {
    toast({
      title: "Profile Editing Coming Soon",
      description: "The ability to edit your profile will be available in a future update!",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-fashion-light">
      {/* Top Navigation */}
      <header className="w-full py-4 px-6 bg-white shadow-sm z-10 border-b border-fashion-amber/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-fashion-navy">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-bold text-fashion-navy">
              Your Profile
            </h1>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-fashion-navy"
            onClick={() => {
              toast({
                title: "Settings Coming Soon",
                description: "The settings page will be available in a future update!",
              });
            }}
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-3xl mx-auto w-full pb-20 px-4">
        {/* Profile Header */}
        <div className="mt-6 bg-white rounded-xl shadow-sm p-6 relative border border-fashion-amber/10">
          <div className="h-24 bg-gradient-to-r from-fashion-amber to-fashion-peach rounded-t-lg absolute top-0 left-0 right-0"></div>
          
          <div className="relative flex flex-col items-center">
            <Avatar className="w-24 h-24 border-4 border-white">
              <AvatarImage src="https://placehold.co/200x200/f6f6f7/333333?text=You" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute bottom-0 right-24 bg-white rounded-full shadow-sm"
              onClick={() => {
                toast({
                  title: "Photo Upload Coming Soon",
                  description: "The ability to change your profile photo will be available soon!",
                });
              }}
            >
              <Camera className="h-4 w-4" />
            </Button>
            
            <h2 className="text-xl font-bold mt-3">Alex Johnson</h2>
            <p className="text-gray-500">@fashionalex</p>
            
            <div className="flex gap-8 mt-4">
              <div className="text-center">
                <p className="font-bold">52</p>
                <p className="text-sm text-gray-500">Posts</p>
              </div>
              <div className="text-center">
                <p className="font-bold">843</p>
                <p className="text-sm text-gray-500">Followers</p>
              </div>
              <div className="text-center">
                <p className="font-bold">267</p>
                <p className="text-sm text-gray-500">Following</p>
              </div>
            </div>
            
            <div className="mt-6 w-full flex gap-3">
              <Button 
                className="flex-1 bg-fashion-amber hover:bg-fashion-amber/90 text-white"
                onClick={handleEditProfile}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 border-fashion-amber/20 hover:bg-fashion-amber/10"
                onClick={() => {
                  toast({
                    title: "Messaging Coming Soon",
                    description: "The messaging feature will be available in a future update!",
                  });
                }}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Messages
              </Button>
            </div>
          </div>
        </div>
        
        {/* Profile Content Tabs */}
        <Tabs defaultValue="posts" className="mt-6">
          <TabsList className="w-full grid grid-cols-3 bg-white shadow-sm rounded-lg p-1 mb-6">
            <TabsTrigger value="posts" className="rounded-md data-[state=active]:bg-fashion-amber/20">
              <Grid3X3 className="h-5 w-5" />
            </TabsTrigger>
            <TabsTrigger value="saved" className="rounded-md data-[state=active]:bg-fashion-amber/20">
              <Bookmark className="h-5 w-5" />
            </TabsTrigger>
            <TabsTrigger value="outfits" className="rounded-md data-[state=active]:bg-fashion-amber/20">
              <ShoppingBag className="h-5 w-5" />
            </TabsTrigger>
          </TabsList>
          
          {/* Posts Tab */}
          <TabsContent value="posts" className="animate-fade-in">
            <div className="grid grid-cols-3 gap-1">
              {Array.from({ length: 9 }).map((_, index) => (
                <AspectRatio ratio={1/1} key={index} className="overflow-hidden">
                  <img 
                    src={`https://placehold.co/300x300/${index % 2 === 0 ? 'eeeeee/333333' : '333333/ffffff'}?text=Post+${index + 1}`} 
                    alt={`Post ${index + 1}`} 
                    className="w-full h-full object-cover" 
                  />
                </AspectRatio>
              ))}
            </div>
          </TabsContent>
          
          {/* Saved Tab */}
          <TabsContent value="saved" className="animate-fade-in">
            <div className="grid grid-cols-3 gap-1">
              {Array.from({ length: 6 }).map((_, index) => (
                <AspectRatio ratio={1/1} key={index} className="overflow-hidden">
                  <img 
                    src={`https://placehold.co/300x300/ffdee2/333333?text=Saved+${index + 1}`} 
                    alt={`Saved ${index + 1}`} 
                    className="w-full h-full object-cover" 
                  />
                </AspectRatio>
              ))}
            </div>
          </TabsContent>
          
          {/* Outfits Tab */}
          <TabsContent value="outfits" className="animate-fade-in">
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border border-fashion-amber/10">
                  <div className="p-2 bg-gradient-to-r from-fashion-amber/80 to-fashion-peach/80 text-white text-sm">
                    Outfit {index + 1}
                  </div>
                  <div className="p-3">
                    <div className="grid grid-cols-3 gap-1">
                      {Array.from({ length: 3 }).map((_, itemIndex) => (
                        <AspectRatio ratio={1/1} key={itemIndex} className="overflow-hidden bg-fashion-light/50">
                          <img 
                            src={`https://placehold.co/100x100/${itemIndex % 2 === 0 ? 'eeeeee/333333' : '333333/ffffff'}?text=Item`} 
                            alt="Outfit item" 
                            className="w-full h-full object-cover" 
                          />
                        </AspectRatio>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Created 3 days ago
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-fashion-amber/20 fixed bottom-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-around">
            <Link 
              to="/" 
              className="flex flex-col items-center py-3 px-4 text-fashion-navy"
            >
              <Home className="h-5 w-5" />
              <span className="text-xs mt-1">Home</span>
            </Link>
            <Link 
              to="/closet" 
              className="flex flex-col items-center py-3 px-4 text-fashion-navy"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="text-xs mt-1">Closet</span>
            </Link>
            <Link 
              to="/virtual-tryon" 
              className="flex flex-col items-center py-3 px-4 text-fashion-navy"
            >
              <Ruler className="h-5 w-5" />
              <span className="text-xs mt-1">Try-On</span>
            </Link>
            <Link 
              to="/social" 
              className="flex flex-col items-center py-3 px-4 text-fashion-navy"
            >
              <Users className="h-5 w-5" />
              <span className="text-xs mt-1">Social</span>
            </Link>
            <Link 
              to="/profile" 
              className="flex flex-col items-center py-3 px-4 text-fashion-amber"
            >
              <UserIcon className="h-5 w-5" />
              <span className="text-xs mt-1">Profile</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="h-20"></div>
    </div>
  );
};

export default Profile;
