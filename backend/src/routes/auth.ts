import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { sendOTP } from '../services/email';

const router = express.Router();
const otps = new Map<string, { otp: string; expires: Date; tempData?: { name: string; dob: Date } }>();

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Get user info
router.get('/user', require('../middleware/auth').auth, async (req, res) => {
  const user = await User.findById(req.user!.id);
  if (!user) return res.status(404).json({ msg: 'User not found' });
  res.json(user);
});

// Signup send OTP
router.post('/signup/send-otp', async (req, res) => {
  const { name, dob, email } = req.body;
  if (!name || !dob || !email) return res.status(400).json({ msg: 'Missing fields' });
  if (!/\S+@\S+\.\S+/.test(email)) return res.status(400).json({ msg: 'Invalid email' });

  const dobDate = new Date(dob);
  if (isNaN(dobDate.getTime())) return res.status(400).json({ msg: 'Invalid date' });

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ msg: 'Email already exists' });

  const otp = generateOTP();
  otps.set(email, { otp, expires: new Date(Date.now() + 5 * 60 * 1000), tempData: { name, dob: dobDate } });

  try {
    await sendOTP(email, otp);
    res.json({ msg: 'OTP sent' });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to send OTP' });
  }
});

// Signup verify OTP
router.post('/signup/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  const stored = otps.get(email);
  if (!stored || stored.otp !== otp || stored.expires < new Date()) {
    return res.status(400).json({ msg: 'Invalid or expired OTP' });
  }

  try {
    const user = new User({ name: stored.tempData!.name, dob: stored.tempData!.dob, email });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    otps.delete(email);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Signup failed' });
  }
});

// Login send OTP
router.post('/login/send-otp', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: 'Email not found' });

  const otp = generateOTP();
  otps.set(email, { otp, expires: new Date(Date.now() + 5 * 60 * 1000) });

  try {
    await sendOTP(email, otp);
    res.json({ msg: 'OTP sent' });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to send OTP' });
  }
});

// Login verify OTP
router.post('/login/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  const stored = otps.get(email);
  if (!stored || stored.otp !== otp || stored.expires < new Date()) {
    return res.status(400).json({ msg: 'Invalid or expired OTP' });
  }

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: 'User not found' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
  otps.delete(email);
  res.json({ token });
});

export default router;