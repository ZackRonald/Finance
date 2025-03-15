import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3010/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include", 
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful!");
        navigate("/home"); 
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      alert("Server error");
    }
  };

  return (
    <>
    <div className="OuterBoxL">
      <div className="InnerBoxL">
        <div className="loginLeft">
          <h1>Login</h1>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Enter your email id"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            onChange={handleChange}
          />
          <button onClick={handleLogin} id="LoginBtn">Login</button>

          <p id="ald">Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>
        <div className="loginRight">
      <img src="https://files.oaiusercontent.com/file-4943HkMYXtu8jq1oQxbMHQ?se=2025-03-10T08%3A32%3A55Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Dc337c4f4-b3f2-4719-9296-0fd421d8e4c9.webp&sig=%2BGyENVZk/2vza80/Xo0WvqLJj6v1KklDrmY2aZwkK9c%3D" id="loginImg" alt="" />
</div>
      </div>
      </div>
      </>
  
  );

}

export default Login;
