import React, { useState } from "react";
import "./ps.css"
function PasswordStrength() {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(0);

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setStrength(calculateStrength(newPassword));
  };
  const calculateStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[@$!%*?&#]/.test(password)) strength += 1;
    return strength; 
  };

  const getColor = (strength) => {
    const colors = ["black","red", "orange", "yellow",  "blue","green"];
    return colors[strength];
  };

  const getStrengthMessage = (strength) => {
    const messages = ["empty","Very Weak", "Weak", "Moderate", "Strong", "Very Strong"];
    return messages[strength];
  };

  return (
    <div className="main">
      <h1>Password Strength Checker</h1>
      <input className="i" type="password" placeholder="Enter your password" value={password} onChange={handlePasswordChange}/>
      <div id="strengthContainer">
        <div
          id="strengthOutput"
          style={{
            width: `${strength * 20}%`,
            backgroundColor: getColor(strength),
          }}
        ></div>
      </div>
      <p id="strengthText">{getStrengthMessage(strength)}</p>
    </div>
  );
}
export default PasswordStrength;
