import express from 'express';
import Note from '../models/note';
import { auth } from '../middleware/auth';

const router = express.Router();

router.use(auth);

router.get('/', async (req, res) => {
  const notes = await Note.find({ userId: req.user!.id });
  res.json(notes);
});

router.post('/', async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ msg: 'Missing fields' });
  const note = new Note({ userId: req.user!.id, title, content });
  await note.save();
  res.json(note);
});

router.put('/:id', async (req, res) => {
  const { title, content } = req.body;
  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, userId: req.user!.id },
    { title, content },
    { new: true }
  );
  if (!note) return res.status(404).json({ msg: 'Note not found' });
  res.json(note);
});

router.delete('/:id', async (req, res) => {
  const note = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user!.id });
  if (!note) return res.status(404).json({ msg: 'Note not found' });
  res.json({ msg: 'Deleted' });
});

export default router;