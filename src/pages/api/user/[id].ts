import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/app/api/db';
import User from '@/app/api/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  await connectDB();

  switch (req.method) {
    case 'GET':
      try {
        const user = await User.findById(id);

        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(user);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Internal server error';
        return res.status(500).json({ message: errorMessage });
      }

    case 'PUT': 
      try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(updatedUser);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error updating user';
        return res.status(500).json({ message: errorMessage });
      }

    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}