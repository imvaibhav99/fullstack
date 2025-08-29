import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  dob: Date;
  email: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
});

export default model<IUser>('User', userSchema);