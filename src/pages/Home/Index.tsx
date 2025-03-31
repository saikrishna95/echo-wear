
// This file is a placeholder - you'll need to move your actual Index.tsx component here
// For now, we're just providing a placeholder to make the structure work
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold">EchoWear Home</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div 
          className="bg-white p-4 rounded shadow cursor-pointer"
          onClick={() => navigate('/closet')}
        >
          <h2 className="text-xl font-semibold">My Closet</h2>
          <p>Manage your clothing collection</p>
        </div>
        <div 
          className="bg-white p-4 rounded shadow cursor-pointer"
          onClick={() => navigate('/social')}
        >
          <h2 className="text-xl font-semibold">Social Feed</h2>
          <p>Share and discover outfits</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
