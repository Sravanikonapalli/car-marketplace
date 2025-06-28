import { useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import "../styles/register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        role: "user",
      });

      alert("Registration successful!");
      localStorage.setItem("role", "user");
      navigate("/");
    } catch (error: any) {
      alert("Registration failed: " + error.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <input
        placeholder="Full Name"
        className="register-input"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email Address"
        className="register-input"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="register-input"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="register-button" onClick={handleRegister}>
        Register
      </button>
      <p className="login-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
