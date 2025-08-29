import { Schema, model, Document } from 'mongoose';

interface INote extends Document {
  userId: string;
  title: string;
  content: string;
  createdAt: Date;
}

const noteSchema = new Schema<INote>({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model<INote>('Note', noteSchema);