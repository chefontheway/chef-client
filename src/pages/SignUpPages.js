import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignupPage(props) {
  const API_URL = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();

  const [picture, setPicture] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleAddress = (e) => setAddress(e.target.value);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setPicture(file);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("name", name);
    formData.append("address", address);
    formData.append("picture", picture);

    axios
      .post(`${API_URL}/auth/signup`, formData)
      .then((res) => {
        console.log(res);
        navigate("/login");
      })
      .catch((e) => {
        const error = e.response.data.message;
        setErrorMessage(error);
      });
  };

  return (
    <div className="SignupPage-Container">
      <h1>Sign Up</h1>

      <form onSubmit={handleSignupSubmit} className="Signup-Form">
        <label>Email </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
          className="email"
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
          className="password"
        />

        <label>Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleName}
          className="name"
        />

        <label>Address</label>
        <input
          type="text"
          name="address"
          value={address}
          onChange={handleAddress}
          className="address"
        />

        <label>Picture</label>
        <input
          type="file"
          name="picture"
          accept="image/*"
          onChange={handleFileUpload}
        />

        <button type="submit">Sign Up</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have an account?</p>
      <Link to={"/login"}>Login</Link>
    </div>
  );
}

export default SignupPage;
