// src/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import './Welcome.css'; // reuse styles

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      alert('Please enter both username and password.');
      return;
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .eq('password', password)
      .single();

    if (error || !data) {
      alert('Invalid username or password.');
    } else {
      navigate('/dashboard', { state: { user: data } });
    }
  };

  return (
    <div className="welcome-container">
      <h2 className="welcome-subheading">Log In to Your Account</h2>
      <div className="input-button-group">
        <input
          type="text"
          placeholder="Username"
          className="welcome-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="welcome-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="welcome-button" onClick={handleLogin}>
          Log In
        </button>
      </div>
    </div>
  );
}

export default Login;
