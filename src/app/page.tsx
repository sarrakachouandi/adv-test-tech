'use client';

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";

const Home: FC = () => {
  const { data: session } = useSession();
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleAddressCheck = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = await validateAddress(address);
    setMessage(isValid ? 'Address is within 50 km of Paris.' : 'Address is NOT within 50 km of Paris.');
  };

  const validateAddress = async (address: string) => {
    const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(address)}`);
    const data = await response.json();

    if (data.features.length > 0) {
      const { coordinates } = data.features[0].geometry;
      const [lng, lat] = coordinates;

      const parisCoords = [2.3522, 48.8566]; 
      const distance = calculateDistance(parisCoords[1], parisCoords[0], lat, lng);

      return distance <= 50; 
    }

    return false; 
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; 
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; 
    return distance;
  };

  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12 ? "Good morning" :
    currentHour < 18 ? "Good afternoon" :
    "Good evening";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
        {session ? (
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4 text-purple-700">{`${greeting}, ${session.user?.name || session.user?.email}!`}</h1>
            <p className="mb-4 text-gray-600">Signed in as <strong>{session.user?.email}</strong></p>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-200 transform hover:scale-105"
            >
              Sign out
            </button>
            <button
              onClick={() => router.push('/edit')} 
              className="mt-4 px-4 py-2 mx-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200 transform hover:scale-105"
            >
              Edit User
            </button>
            <form onSubmit={handleAddressCheck} className="mt-4">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
                className="border rounded p-2 w-full mb-2  text-black"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200 transform hover:scale-105"
              >
                Check Address
              </button>
            </form>
            {message && <p className="mt-4 text-gray-500">{message}</p>}
          </div>
        ) : (
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4 text-purple-700">Please Sign In</h1>
            <p className="mb-4 text-gray-600">You are currently not signed in.</p>
            <button
              onClick={() => signIn()}
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200 transform hover:scale-105"
            >
              Sign in with Google
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
