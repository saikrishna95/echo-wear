
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShirtIcon, Share2Icon, UserIcon } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="max-w-7xl mx-auto pt-10 pb-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            EchoWear <span className="text-fashion-teal">AI</span> Stylist
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your personal AI fashion assistant that helps you organize your closet, 
            create outfits, and stay stylish.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {/* Closet Card */}
          <Card className="hover:shadow-xl transition-shadow duration-300 border-2 hover:border-fashion-teal">
            <CardHeader>
              <div className="rounded-full bg-fashion-teal/10 w-12 h-12 flex items-center justify-center mb-2">
                <ShirtIcon className="h-6 w-6 text-fashion-teal" />
              </div>
              <CardTitle>My Closet</CardTitle>
              <CardDescription>
                Organize and view all your clothing items
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Catalog your wardrobe, categorize items, and let AI suggest outfits based on 
                weather, occasion, and your personal style.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-fashion-navy hover:bg-fashion-navy/90"
                onClick={() => navigate("/closet")}
              >
                Open Closet
              </Button>
            </CardFooter>
          </Card>

          {/* Social Card */}
          <Card className="hover:shadow-xl transition-shadow duration-300 border-2 hover:border-fashion-teal md:transform md:scale-110 bg-gradient-to-br from-fashion-navy to-fashion-teal text-white">
            <CardHeader>
              <div className="rounded-full bg-white/20 w-12 h-12 flex items-center justify-center mb-2">
                <Share2Icon className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Social Feed</CardTitle>
              <CardDescription className="text-white/80">
                Share your style with the community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/80">
                Get inspired by others, share your outfits, and receive feedback from fashion 
                enthusiasts and stylists from around the world.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-white text-fashion-navy hover:bg-white/90"
                onClick={() => navigate("/social")}
              >
                Explore Feed
              </Button>
            </CardFooter>
          </Card>

          {/* Profile Card */}
          <Card className="hover:shadow-xl transition-shadow duration-300 border-2 hover:border-fashion-teal">
            <CardHeader>
              <div className="rounded-full bg-fashion-teal/10 w-12 h-12 flex items-center justify-center mb-2">
                <UserIcon className="h-6 w-6 text-fashion-teal" />
              </div>
              <CardTitle>My Profile</CardTitle>
              <CardDescription>
                Manage your preferences and settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Update your style preferences, body measurements, and connect with other fashion 
                enthusiasts who share your taste.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-fashion-navy hover:bg-fashion-navy/90"
                onClick={() => navigate("/profile")}
              >
                View Profile
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
