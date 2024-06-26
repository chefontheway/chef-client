import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = process.env.REACT_APP_SERVER_URL;

function EditProfilePage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null); // State for the image preview URL
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const storedToken = localStorage.getItem("authToken");

  const uploadImage = (file) => {
    return axios
      .post(`${API_URL}/api/upload`, file, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((res) => res.data)
      .catch((e) => console.log(e));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a URL for the file
      const url = URL.createObjectURL(file);
      setImagePreviewUrl(url); // Update the image preview URL
    }

    const uploadData = new FormData();
    uploadData.append("picture", file);

    uploadImage(uploadData)
      .then((response) => {
        setPicture(response.picture);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  useEffect(() => {
    axios.get(`${API_URL}/api/profile/${userId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then(response => {
        const oneData = response.data;
        setName(oneData.name);
        setPicture(oneData.picture);
        setAddress(oneData.address);
        setEmail(oneData.email);
        setImagePreviewUrl(oneData.picture); // Set the initial image URL for preview
      })
      .catch(e => console.log("error fetching the profile", e));
  }, [storedToken, userId]);

  const updateProfile = (e) => {
    e.preventDefault();
    const requestProfileBody = {
      name, picture, address, email
    };

    axios.put(`${API_URL}/api/profile/${userId}`, requestProfileBody, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then(() => navigate(-1))
      .catch(e => console.log("failed to update", e));
  };

  return (
    <div className="update-profile-form-container">
      <h2>Update Profile</h2>
      <form onSubmit={updateProfile} className="update-profile-form">
        <input
          type="text"
          name="name"
          value={name}
          onChange={e => { setName(e.target.value) }}
        />

        <img src={imagePreviewUrl || picture} alt="profile" className="image-edit-profile"/>
        <input
          type="file"
          name="picture"
          onChange={handleFileUpload}
        />

        <input
          type="text"
          name="address"
          value={address}
          onChange={e => { setAddress(e.target.value) }}
        />

        <input
          type="text"
          name="email"
          value={email}
          onChange={e => { setEmail(e.target.value) }}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditProfilePage;