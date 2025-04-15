
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Settings as SettingsIcon, LogOut, Moon, Bell, Globe, Shield, HelpCircle } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

const Settings = () => {
  const { logout, user } = useAuth();

  const settingsGroups = [
    {
      title: "Account",
      items: [
        { icon: Shield, label: "Privacy", onClick: () => {} },
        { icon: Bell, label: "Notifications", onClick: () => {} },
        { icon: Globe, label: "Language", onClick: () => {} },
        { icon: Moon, label: "Dark Mode", onClick: () => {}, toggle: true },
      ]
    },
    {
      title: "Support",
      items: [
        { icon: HelpCircle, label: "Help Center", onClick: () => {} },
        { icon: LogOut, label: "Logout", onClick: logout, destructive: true },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-fashion-light pb-20">
      <MobileLayout title="Settings" rightContent={<SettingsIcon className="text-white" size={20} />}>
        <div className="space-y-6">
          {/* User profile card */}
          <Card className="p-4">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-fashion-amber flex items-center justify-center">
                <span className="text-white text-lg font-bold">
                  {user?.name?.charAt(0) || "U"}
                </span>
              </div>
              <div>
                <h3 className="font-medium">{user?.name || "User"}</h3>
                <p className="text-sm text-gray-500">{user?.email || "user@example.com"}</p>
              </div>
            </div>
          </Card>

          {/* Settings groups */}
          {settingsGroups.map((group, index) => (
            <div key={index} className="space-y-2">
              <h3 className="font-medium text-sm text-gray-500 px-1">
                {group.title}
              </h3>
              <Card>
                {group.items.map((item, itemIndex) => (
                  <Button
                    key={itemIndex}
                    variant="ghost"
                    className={`w-full justify-start px-4 py-3 h-auto ${
                      item.destructive ? "text-red-500 hover:text-red-600 hover:bg-red-50" : ""
                    }`}
                    onClick={item.onClick}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    <span>{item.label}</span>
                    {item.toggle && (
                      <div className="ml-auto w-9 h-5 bg-gray-200 rounded-full relative">
                        <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    )}
                  </Button>
                ))}
              </Card>
            </div>
          ))}
        </div>
      </MobileLayout>
      <MobileBottomNav />
    </div>
  );
};

export default Settings;
