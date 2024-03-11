import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function AddNewService(props) {
  const API_URL = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();
  const storeToken = localStorage.getItem("authToken");
  
  const [picture, setPicture] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");
  const [pricePerPerson, setPricePerPerson] = useState("");
  const [availability, setAvailability] = useState("");

  const uploadImage = (file) => {
    return axios
      .post(`${API_URL}/api/upload`, file)
      .then((res) => res.data)
      .catch((e) => console.log(e));
  };

  const handleFileUpload = (e) => {
    const uploadData = new FormData();

    uploadData.append("picture", e.target.files[0]);

    uploadImage(uploadData)
      .then((response) => {
        setPicture(response.picture);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBodyService = {
      picture,
      speciality,
      place,
      description,
      pricePerPerson,
      availability
    };


    axios
      .post(`${API_URL}/api/services`, requestBodyService, {
        headers: { Authorization: `Bearer ${storeToken}` },
      })
      .then((response) => {
        //to reset the form fields after the form is successfully submitted and the service is created
        setPicture("");
        setSpeciality("");
        setPlace("");
        setDescription("");
        setPricePerPerson("");
        setAvailability("");

        navigate("/services");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="btn-reservation-list">
        <Link to="/reservations">
          <button>Your Order</button>
        </Link>

        <Link to="/myService">
          <button>Your Own Service</button>
        </Link>

        <Link to="/mywork">
          <button>My Work</button>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="add-new-service">
        <label>Speciality :</label>
        <input
          type="text"
          name="speciality"
          value={speciality}
          placeholder="ex: French Food"
          onChange={(e) => {
            setSpeciality(e.target.value);
          }}
        />
        <label>Image :</label>
        <input
          type="file"
          name="picture"
          onChange={(e) => handleFileUpload(e)}
        />

        <label>Place :</label>
        <input
          type="text"
          name="place"
          value={place}
          placeholder="ex : Paris and Dublin"
          onChange={(e) => {
            setPlace(e.target.value);
          }}
        />

        <label>Description :</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />

        <label>Price Per Person :</label>
        <input
          type="number"
          name="pricePerPerson"
          value={pricePerPerson}
          min={1}
          placeholder="ex : 80$"
          onChange={(e) => {
            setPricePerPerson(e.target.value);
          }}
        />

        <label>Availability</label>
        
        <select
          name="availability"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        >
          <option value="">-- Select Availability --</option>
          <option value="Available">Available</option>
          <option value="Unavailable">Unavailable</option>
        </select>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default AddNewService;
