
import React, { useState } from "react";
import { Shirt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would validate credentials
    // For now, we'll just redirect to the home page
    navigate("/");
  };
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 bg-gradient-to-b from-fashion-light to-fashion-sand">
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
                className="mt-1"
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
                className="mt-1"
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <Button 
              type="submit" 
              className="w-full bg-fashion-amber hover:bg-fashion-amber/90 text-white"
            >
              Login
            </Button>
            
            <Button 
              type="button" 
              variant="outline"
              className="w-full border-fashion-amber text-fashion-amber hover:bg-fashion-sand"
            >
              Sign Up
            </Button>
          </div>
          
          <div className="text-center text-sm text-gray-600">
            <a href="#" className="hover:text-fashion-amber">Forgot your password?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
