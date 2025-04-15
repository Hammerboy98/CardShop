import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../redux/authSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState(''); // State for the welcome message
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
      // Save the token to localStorage
      localStorage.setItem('jwtToken', data.token);
  
      // Decode the token to extract username and role
      try {
        const decoded = JSON.parse(atob(data.token.split('.')[1]));
        const usernameFromToken = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
        const roleFromToken = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  
        // Normalize the username and capitalize the first letter
        const normalizedUsername = usernameFromToken.charAt(0).toUpperCase() + usernameFromToken.slice(1).toLowerCase();
  
        console.log("Decoded from token:", { usernameFromToken, roleFromToken });
  
        // Dispatch the data extracted from the token
        dispatch(loginSuccess({
          username: normalizedUsername,  // Use the normalized username
          role: roleFromToken,
          user: normalizedUsername,  // You can pass the username as 'user' or other
        }));
  
        // Set the welcome message
        setWelcomeMessage(`Welcome, ${normalizedUsername}!`);
  
        // Navigate to the home page after setting the welcome message
        setTimeout(() => navigate('/'), 2000); // Stay on the login page for 2 seconds to see the message
      } catch (error) {
        console.error("Error during token decoding:", error);
        alert("An error occurred during login.");
      }
    } else {
      // If the response is not OK, show the error
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
    welcomeMessage: {
      color: '#28a745',
      fontSize: '18px',
      marginBottom: '20px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>
        {/* Show the welcome message only after successful login */}
        {welcomeMessage && <p style={styles.welcomeMessage}>{welcomeMessage}</p>}
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






