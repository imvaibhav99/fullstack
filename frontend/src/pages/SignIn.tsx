// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './styles.css';

// const SignIn: React.FC = () => {
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleResendOTP = async () => {
//     setError('');
//     if (!email) return setError('Email is required');
//     try {
//       await axios.post('http://localhost:5001/api/auth/login/send-otp', { email });
//     } catch (err: any) {
//       setError(err.response?.data?.msg || 'Failed to send OTP');
//     }
//   };

//   const handleSignIn = async () => {
//     setError('');
//     try {
//       const res = await axios.post('http://localhost:5001/api/auth/login/verify-otp', { email, otp });
//       localStorage.setItem('token', res.data.token);
//       navigate('/dashboard');
//     } catch (err: any) {
//       setError(err.response?.data?.msg || 'Invalid OTP');
//     }
//   };

//   return (
//     <div className="container">
//       <div className="form-card">
//         <img src="assets/top.png" alt="HD Logo" className="logo" />
//         <h1>Sign in</h1>
//         <p>Please login to continue to your account.</p>
//         <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//         <input type="text" placeholder="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
//         <a onClick={handleResendOTP} className="resend">Resend OTP</a>
//         <div className="checkbox">
//           <input type="checkbox" id="keep-logged" />
//           <label htmlFor="keep-logged">Keep me logged in</label>
//         </div>
//         <button onClick={handleSignIn}>Sign in</button>
//         {error && <p className="error">{error}</p>}
//         <p>Need an account? <a href="/signup">Create one</a></p>
//       </div>
//     <div
//   className="background"
//   style={{ backgroundImage: "url('/assets/right-column.png')" }}
// ></div>

//     </div>
//   );
// };

// export default SignIn;



import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleResendOTP = async () => {
    setError('');
    if (!email) return setError('Email is required');
    try {
      await axios.post('http://localhost:5001/api/auth/login/send-otp', { email });
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Failed to send OTP');
    }
  };

  const handleSignIn = async () => {
    setError('');
    try {
      const res = await axios.post('http://localhost:5001/api/auth/login/verify-otp', { email, otp });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Invalid OTP');
    }
  };

  return (
    <div className="container">
      <div className="form-card">
        <img src="assets/top.png" alt="HD Logo" className="logo-top" />
        <h1>Sign in</h1>
        <p>Please login to continue to your account.</p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        {/* Resend OTP line */}
        <div className="resend-line">
          <a onClick={handleResendOTP} className="resend">Resend OTP</a>
        </div>

        {/* Checkbox line: checkbox and text in the same line */}
        <div className="checkbox-line">
          <input type="checkbox" id="keep-logged" />
          <label htmlFor="keep-logged">Keep me logged in</label>
        </div>

        <button onClick={handleSignIn}>Sign in</button>
        {error && <p className="error">{error}</p>}
        <p>Need an account? <a href="/signup">Create one</a></p>
      </div>

      <div
        className="background"
        style={{ backgroundImage: "url('/assets/right-column.png')" }}
      ></div>
    </div>
  );
};

export default SignIn;
