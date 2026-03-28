import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      toast("Registration successful");
    } catch (error) {
      console.log(error);
      toast("Error");
    }
  };

  return (
    <div className="form-container">
         <h2>Registration</h2>
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Register</button>
    </form>
    </div>
  );
}

export default Register;
