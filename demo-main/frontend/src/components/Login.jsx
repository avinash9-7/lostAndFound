import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch {
      alert("Invalid Credentials");
    }
  };

  return (
  <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="card shadow p-4" style={{ width: "320px" }}>
      <h3 className="text-center mb-3">Login</h3>

      <form onSubmit={handleLogin}>
        <input className="form-control mb-3" placeholder="Email"
          onChange={e => setForm({...form, email: e.target.value})} />

        <input type="password" className="form-control mb-3" placeholder="Password"
          onChange={e => setForm({...form, password: e.target.value})} />

        <button className="btn btn-primary w-100">Login</button>
      </form>

      <p className="text-center mt-3">
        New user? <Link to="/register">Register</Link>
      </p>
    </div>
  </div>
);
}