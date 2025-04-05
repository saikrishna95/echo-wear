
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.29a8a41885cd46dd82309c3ec04432aa',
  appName: 'echo-wardrobe',
  webDir: 'dist',
  server: {
    url: 'https://29a8a418-85cd-46dd-8230-9c3ec04432aa.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    }
  }
};

export default config;
