import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Sprout, Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import { loginStart, loginSuccess, loginFailure, clearError } from '../store/authSlice';
import './Login.css';

const Login = () => {
  const dispatch = useDispatch();
  const rememberedEmail = useSelector((state) => state.auth.rememberMeEmail);
  const storeError = useSelector((state) => state.auth.error);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [localError, setLocalError] = useState('');

  // Auto-fill remembered email
  useEffect(() => {
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, [rememberedEmail]);

  // Clean error alerts on input
  useEffect(() => {
    if (localError) setLocalError('');
    if (storeError) dispatch(clearError());
  }, [email, password]);

  const validateEmail = (emailStr) => {
    return /\S+@\S+\.\S+/.test(emailStr);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validations
    if (!email.trim() || !password.trim()) {
      setLocalError('Please fill in all fields.');
      return;
    }

    if (!validateEmail(email)) {
      setLocalError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters long.');
      return;
    }

    // Trigger mock login sequence
    dispatch(loginStart());

    // Simulate network delay for premium feel
    setTimeout(() => {
      // Mock login credentials check (support any email/password but demonstrate state workflow)
      dispatch(loginSuccess({ 
        email, 
        rememberMe,
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1) // Capitalized email name
      }));
    }, 1000);
  };

  const activeError = localError || storeError;

  return (
    <div className="login-page">
      {/* Decorative Blobs */}
      <div className="login-bg-blob blob-1" />
      <div className="login-bg-blob blob-2" />
      
      <div className="glass-panel login-card animate-scale-up">
        <div className="login-header">
          <div className="login-logo">
            <Sprout size={32} />
          </div>
          <h2 className="login-title">Urban Harvest</h2>
          <p className="login-subtitle">Admin Delivery Portal Dashboard</p>
        </div>
        
        <form className="login-form" onSubmit={handleSubmit}>
          {activeError && (
            <div className="error-alert animate-fade-in">
              <AlertCircle size={16} />
              <span>{activeError}</span>
            </div>
          )}
          
          <div className="form-group">
            <label className="form-label" htmlFor="email-input">Email Address</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input
                id="email-input"
                type="email"
                placeholder="admin@urbanharvest.com"
                className="glass-input login-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="password-input">Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                id="password-input"
                type="password"
                placeholder="••••••••"
                className="glass-input login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div className="form-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isLoading}
              />
              <span>Remember Me</span>
            </label>
            <a href="#" className="forgot-password" onClick={(e) => { e.preventDefault(); alert("Feature coming soon! Use any email/password to log in.") }}>Forgot Password?</a>
          </div>
          
          <button 
            type="submit" 
            className="btn-primary login-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <span>Signing in...</span>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-dark)' }}>
          Tip: You can use any email and a 6+ char password.
        </div>
      </div>
    </div>
  );
};

export default Login;
