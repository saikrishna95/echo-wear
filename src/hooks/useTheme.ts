
// This is a simplified version since we're not using next-themes
// In a real app with theme support, this would be more complex

export function useTheme() {
  return {
    theme: "light",
    setTheme: (theme: string) => {
      console.log("Theme would be set to:", theme);
    },
  };
}
