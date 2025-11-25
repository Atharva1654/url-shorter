import { useState } from "react";
import API from "../services/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await API.post("/api/auth/register", {
        name,
        email,
        password,
      });

      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          style={{ padding: 10, marginBottom: 10, display: "block" }}
        />

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          style={{ padding: 10, marginBottom: 10, display: "block" }}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          style={{ padding: 10, marginBottom: 10, display: "block" }}
        />

        <button style={{ padding: "10px 20px" }}>Register</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
