import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/register", form);
    navigate("/");
  };

  return (
  <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="card shadow p-4" style={{ width: "320px" }}>
      <h3 className="text-center mb-3">Register</h3>

      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" placeholder="Name"
          onChange={e => setForm({...form, name: e.target.value})} />

        <input className="form-control mb-2" placeholder="Email"
          onChange={e => setForm({...form, email: e.target.value})} />

        <input type="password" className="form-control mb-3" placeholder="Password"
          onChange={e => setForm({...form, password: e.target.value})} />

        <button className="btn btn-success w-100">Register</button>
      </form>

      <p className="text-center mt-3">
        Already have account? <a href="/">Login</a>
      </p>
    </div>
  </div>
);
}