import { useState } from "react";

function App() {
  const [form, setForm] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert("Submitted!");
    setForm({ name: "", email: "" });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Form → Saves to JSON</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} placeholder="Enter Name" onChange={handleChange} />
        <br /><br />
        <input name="email" value={form.email} placeholder="Enter Email" onChange={handleChange} />
        <br /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;