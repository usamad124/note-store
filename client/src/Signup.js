import React, { useState } from "react";
import axios from "axios";

function SignupComponent() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
  
    // Create form data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("age", age);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("profilePicture", profilePicture);
  
    axios.post("http://localhost:5000/signup", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        console.log(response.data);
        setIsSignupSuccess(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };
  

  return (
    <div className="signup-container">
      <h1>Signup</h1>
      {isSignupSuccess ? (
        <div className="success-message">Signup successful! You can now login.</div>
      ) : (
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Signup</button>
        </form>
      )}
    </div>
  );
}

export default SignupComponent;

