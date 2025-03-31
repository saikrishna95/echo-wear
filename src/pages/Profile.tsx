
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Home, ShoppingBag, Users, UserIcon, Settings } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import HumanAvatar3D from "@/components/3d/HumanAvatar3D";

const defaultMeasurements = {
  height: 175,
  weight: 70,
  neck: 38,
  shoulder: 45,
  chest: 95,
  waist: 85,
  stomach: 90,
  hips: 95,
  thigh: 55,
  inseam: 80,
};

const MeasurementForm = ({ onChange }: { onChange: (m: any) => void }) => {
  const [values, setValues] = useState(defaultMeasurements);

  useEffect(() => {
    const saved = localStorage.getItem("avatarMeasurements");
    if (saved) {
      const parsed = JSON.parse(saved);
      setValues(parsed);
      onChange(parsed);
    }
  }, [onChange]);

  const handleChange = (key: string, value: string) => {
    const updated = { ...values, [key]: parseFloat(value) };
    setValues(updated);
    localStorage.setItem("avatarMeasurements", JSON.stringify(updated));
    onChange(updated);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {Object.keys(values).map((key) => (
        <div key={key} className="flex flex-col">
          <Label>{key.toUpperCase()}</Label>
          <Input
            type="number"
            value={values[key as keyof typeof values]}
            onChange={(e) => handleChange(key, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

const Profile = () => {
  const { toast } = useToast();
  const [measurements, setMeasurements] = useState(defaultMeasurements);

  const formatted = Object.entries(measurements).reduce((acc, [k, v]) => {
    acc[k] = {
      value: v,
      min: 10,
      max: 300,
      unit: "cm",
      label: k.toUpperCase(),
      category: "general",
    };
    return acc;
  }, {} as any);

  const downloadAvatarImage = async () => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;
    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob((blob) => resolve(blob), "image/png");
    });
    if (blob) {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "echowear_avatar.png";
      link.click();
      
      toast({
        title: "Avatar Saved",
        description: "Your avatar image has been downloaded successfully.",
      });
    }
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
        <div className="p-6 space-y-6">
          <Card className="p-4 shadow-xl bg-gradient-to-br from-white to-slate-100 mt-6">
            <h2 className="text-xl font-semibold mb-2">3D Avatar</h2>
            <div className="h-[500px] relative">
              <HumanAvatar3D measurements={formatted} highlightedPart={null} rotation={180} />
              <button
                onClick={downloadAvatarImage}
                className="absolute bottom-2 right-2 bg-black/70 text-white px-3 py-1 rounded text-xs"
              >
                Save Avatar
              </button>
            </div>
          </Card>

          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-2">Measurements</h2>
            <MeasurementForm onChange={setMeasurements} />
          </Card>
        </div>
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
              <ShoppingBag className="h-6 w-6" />
              <span className="text-xs mt-1">Closet</span>
            </Link>
            <Link 
              to="/social" 
              className="flex flex-col items-center py-3 px-4 text-fashion-navy"
            >
              <Users className="h-6 w-6" />
              <span className="text-xs mt-1">Social</span>
            </Link>
            <Link 
              to="/profile" 
              className="flex flex-col items-center py-3 px-4 text-fashion-teal"
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

export default Profile;
