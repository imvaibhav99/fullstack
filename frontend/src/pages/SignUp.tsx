import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css'; // Shared styles

const SignUp: React.FC = () => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGetOTP = async () => {
    setError('');
    if (!name || !dob || !email) return setError('All fields are required');
    if (!/\S+@\S+\.\S+/.test(email)) return setError('Invalid email');
    const dobDate = new Date(dob);
    if (isNaN(dobDate.getTime())) return setError('Invalid date (use YYYY-MM-DD)');

    try {
      await axios.post('http://localhost:5001/api/auth/signup/send-otp', { name, dob, email });
      setOtpSent(true);
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Failed to send OTP');
    }
  };

  const handleVerifyOTP = async () => {
    setError('');
    try {
      const res = await axios.post('http://localhost:5001/api/auth/signup/verify-otp', { email, otp });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Invalid OTP');
    }
  };

  return (
    <div className="container">
      <div className="form-card">
        <img src="/assets/top.png" alt="HD Logo" className="logo-top" />
        <h1>Sign up</h1>
        <p>Sign up to enjoy the feature of HD</p>

        <input 
          type="text" 
          placeholder="Your Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Date of Birth (YYYY-MM-DD)" 
          value={dob} 
          onChange={(e) => setDob(e.target.value)} 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />

        {!otpSent ? (
          <button onClick={handleGetOTP}>Get OTP</button>
        ) : (
          <>
            <input 
              type="text" 
              placeholder="OTP" 
              value={otp} 
              onChange={(e) => setOtp(e.target.value)} 
            />
            <button onClick={handleVerifyOTP}>Verify OTP</button>
          </>
        )}

        {error && <p className="error">{error}</p>}

        <p>
          Already have an account? <a href="/signin">Sign in</a>
        </p>
      </div>

      <div 
        className="background" 
        style={{ backgroundImage: "url('/assets/right-column.png')" }}
      />
    </div>
  );
};

export default SignUp;
