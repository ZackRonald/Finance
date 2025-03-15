import { useNavigate,Link } from "react-router-dom";
import { useState } from "react";
import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3010/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include" 
      });

      const data = await response.json();

      if (response.ok) {
        alert("Sign-up successful!");
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
    <div className="OuterBox">
       <div className="InnerBox">
     
        <div className="leftSignUp">
          <h1>Sign Up</h1>
          <input type="text" name="username" id="username" placeholder="Enter your username" onChange={handleChange} /> <br />
          <input type="email" name="email" id="email" placeholder="Enter your email" onChange={handleChange} /> <br />
          <input type="password" name="password" id="password" placeholder="Enter your password" onChange={handleChange} /> <br />
          <button onClick={handleSubmit} id="SignBtn">Sign Up</button>

          <p id="ald">Already have an account? <Link to="/login">Login</Link></p>

        </div>
        <div className="rightSignUp">
          <img src="https://evolvtan.com/wp-content/uploads/cache/2019/07/Affiliate-Marketing-for-Beginners-using-green-colors/4097178414.jpg" alt=""  id="loginImg"/>
        </div>
      </div>
    </div>
      </>
  );
};

export default SignUp;
