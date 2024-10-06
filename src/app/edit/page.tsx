"use client"; 

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const Edit = () => {
  const { data: session } = useSession(); 

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    dateDeNaissance: '',
    adresse: '',
    telephone: ''
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.id) {
        try {
          const response = await axios.get(`/api/user/${session.user.id}`);
          console.log('Fetched user data:', response.data);
          setUserData(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [session]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`/api/user/${session?.user?.id}`, userData);
      alert('User updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  const handleExit = () => {
    window.location.href = 'http://localhost:3000'; 
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-gradient-to-r from-green-400 to-blue-500 min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-950">Edit User</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900">Name:</label>
            <input
              className='mt-1 block w-full p-2 border text-gray-800 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              type="text"
              name="name"
              value={userData?.name || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900">Email:</label>
            <input
              className='mt-1 block w-full p-2 border text-gray-800 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              type="email"
              name="email"
              value={userData?.email || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900">Date de naissance:</label>
            <input
              className='mt-1 block w-full p-2 border text-gray-800 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              type="date"
              name="dateDeNaissance"
              value={userData?.dateDeNaissance || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900">Adresse:</label>
            <input
              className='mt-1 block w-full p-2 border text-gray-800 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              type="text"
              name="adresse"
              value={userData?.adresse || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900">Numéro de téléphone:</label>
            <input
              className='mt-1 block w-full p-2 border text-gray-800 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              type="tel"
              name="telephone"
              value={userData?.telephone || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition duration-200"
          >
            Save Changes
          </button>
          <button
          onClick={handleExit} 
          className="mt-4 w-full py-2 px-4 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition duration-200"
        >
          Exit
        </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
