import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditServicesPage(props) {
  const API_URL = process.env.REACT_APP_SERVER_URL
  
  const { serviceId } = useParams();

  const navigate = useNavigate();

  const [picture, setPicture] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");
  const [amountOfPeople, setAmountOfPeople] = useState("");
  const [pricePerPerson, setPricePerPerson] = useState("");
  const [availability, setAvailability] = useState("");

  const storeToken = localStorage.getItem('authToken');


  useEffect(() => {
    axios.get(`${API_URL}/api/services/${serviceId}`, { headers: { Authorization: `Bearer ${storeToken}` } })
      .then(response => {
        const oneService = response.data;
        setPicture(oneService.picture);
        setSpeciality(oneService.speciality);
        setPlace(oneService.place);
        setDescription(oneService.description);
        setAmountOfPeople(oneService.amountOfPeople);
        setPricePerPerson(oneService.pricePerPerson);
        setAvailability(oneService.availability)
      })
      .catch(e => console.log("failed to fetch the service", e));
  }, [serviceId, storeToken]);

  const handleSubmitUpdate = (e) => {
    e.preventDefault();

    const requestBodyService = {
      picture,
      speciality,
      place,
      description,
      amountOfPeople,
      pricePerPerson,
      availability
    };
    
    axios
      .put(`${API_URL}/api/services/${serviceId}`, requestBodyService, { headers: { Authorization: `Bearer ${storeToken}` } })
      .then(response => {
        navigate("/myService");
      })
      .catch(e => console.log("failed to edit the service", e));
  };

  return (
    <div >
      <form onSubmit={handleSubmitUpdate} className="edit-service-page">
        <label>Speciality</label>
        <input
          type="text"
          name="speciality"
          value={speciality}
          onChange={e => { setSpeciality(e.target.value) }}
        />
        <label>Image</label>
        <input
          type="text"
          name="picture"
          value={picture}
          onChange={e => { setPicture(e.target.value) }}
        />

        <label>Place</label>
        <input
          type="text"
          name="place"
          value={place}
          onChange={e => { setPlace(e.target.value) }}
        />

        <label>Description</label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={e => { setDescription(e.target.value) }}
        />

        <label>Price Per Person</label>
        <input
          type="number"
          name="pricePerPerson"
          value={pricePerPerson}
          onChange={e => { setPricePerPerson(e.target.value) }}
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
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditServicesPage;
