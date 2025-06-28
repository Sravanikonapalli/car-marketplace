import { useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      const role = userDoc.data()?.role;
      localStorage.setItem("role", role);

      alert("Login successful!");
      navigate(role === "admin" ? "/admin" : "/");
    } catch (error: any) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="login-input"
      />
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="login-input"
      />
      <button className="login-button" onClick={handleLogin}>Login</button>
      <p className="register-link">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
