import React, { useState } from "react";
import axios from "axios";

function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [userDetails, setUserDetails] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:4000/login", {
        username,
        password,
      });
  
      if (response && response.data) {
        // Ensure the response contains a token
        setToken(response.data.token);
        setMessage("Login successful! Token received.");
      } else {
        // Handle unexpected response structure
        setMessage("Login failed: Invalid response structure.");
      }
    } catch (error) {
      // Ensure proper error handling in case the response object is not what we expect
      if (error.response && error.response.data && error.response.data.message) {
        setMessage("Login failed: " + error.response.data.message);
      } else {
        setMessage("Login failed: Unexpected error.");
        console.error("Error details:", error);
      }
    }
  };
  

  // Access protected route
  const accessProtectedRoute = async () => {
    try {
      const response = await axios.get("http://localhost:4000/details", {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token to Authorization header
        },
      });
      setUserDetails(response.data.user);
      setMessage("Accessed protected route successfully.");
    } catch (error) {
      setMessage("Access denied: " + error.response.statusText);
    }
  };

  return (
    <div className="App">
      <h1>JWT Authentication</h1>

      {/* Login Form */}
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      
      
      {message && <p>{message}</p>}

      
      {token && (
        <div>
          <h2>Your JWT Token</h2>
          <pre>{token}</pre>
        </div>
      )}

      
      {token && (
        <button onClick={accessProtectedRoute}>
          Access Protected Route
        </button>
      )}

      {/* Display user details */}
      {userDetails && (
        <div>
          <h2>User Details from JWT</h2>
          <p>Username: {userDetails.username}</p>
        </div>
      )}
    </div>
  );
}

export default Auth;
