import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  dateDeNaissance: { type: String, default: null }, 
  adresse: { type: String, default: null }, 
  telephone: { type: String, default: null },
}, { strict: false });

export default mongoose.models.User || mongoose.model('User', UserSchema);
