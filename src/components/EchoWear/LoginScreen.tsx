
import React, { useState, useEffect } from "react";
import { Shirt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Checkbox } from "@/components/ui/checkbox";

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("password");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, isAuthenticated } = useAuth();
  
  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(email, password, rememberMe);
      
      if (success) {
        toast({
          title: "Login successful",
          description: "Welcome to EchoWear!",
        });
        navigate("/");
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 bg-gradient-to-b from-fashion-light to-fashion-sand pt-safe">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and brand */}
        <div className="text-center">
          <div className="flex justify-center mb-3">
            <div className="w-16 h-16 rounded-full bg-fashion-amber flex items-center justify-center">
              <Shirt size={32} className="text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">EchoWear</h1>
          <p className="mt-2 text-gray-600">Your AI stylist for every occasion</p>
        </div>
        
        {/* Login form */}
        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-gray-700">Email / Username</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 bg-white/70 backdrop-blur-sm border-fashion-peach/30 focus:ring-fashion-amber focus:border-fashion-amber"
              />
            </div>
            
            <div>
              <Label htmlFor="password" className="text-gray-700">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 bg-white/70 backdrop-blur-sm border-fashion-peach/30 focus:ring-fashion-amber focus:border-fashion-amber"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="rememberMe" 
                  checked={rememberMe} 
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                />
                <Label htmlFor="rememberMe" className="text-sm text-gray-700 cursor-pointer">
                  Remember me
                </Label>
              </div>
              
              <div className="text-right text-sm">
                <a href="#" className="text-fashion-amber hover:underline">Forgot password?</a>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <Button 
              type="submit" 
              className="w-full bg-fashion-amber hover:bg-fashion-amber/90 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
            
            <Button 
              type="button" 
              variant="outline"
              className="w-full border-fashion-amber text-fashion-amber hover:bg-fashion-sand"
            >
              Sign Up
            </Button>
          </div>
          
          <div className="text-center text-xs text-gray-500 mt-8">
            <p>Test credentials: test@example.com / password</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
