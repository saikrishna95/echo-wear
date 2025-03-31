
// This file is a placeholder - you'll need to move your actual Profile.tsx component here
// For now, we're just providing a placeholder to make the structure work
import { useAuth } from "@/auth/AuthContext";

const Profile = () => {
  const { user, logout } = useAuth();
  
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">My Profile</h1>
        {user ? (
          <>
            <div className="mb-4">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Log Out
            </button>
          </>
        ) : (
          <p>You are not logged in.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
