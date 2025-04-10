import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../redux/authSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch('https://localhost:7140/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Salva il token nel localStorage
      localStorage.setItem('jwtToken', data.token);

      // Dispatch l'azione di login con l'utente e il suo ruolo
      dispatch(loginSuccess({ username, role: data.role }));

      // Naviga alla home
      navigate('/');
    } else {
      // Gestisci l'errore in caso di fallimento, potresti anche voler aggiornare l'UI con un alert o un messaggio
      alert(data.Message || 'Login failed');
    }
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#212529',
      margin: 0,
      padding: 0,
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '30px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '400px',
      textAlign: 'center',
    },
    title: {
      fontSize: '24px',
      color: '#333',
      marginBottom: '20px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    input: {
      padding: '12px',
      fontSize: '16px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      marginBottom: '10px',
      outline: 'none',
    },
    inputFocus: {
      borderColor: '#007bff',
    },
    button: {
      padding: '12px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
            onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;



