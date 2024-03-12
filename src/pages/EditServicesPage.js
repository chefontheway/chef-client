// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// function EditServicesPage(props) {
//   const API_URL = process.env.REACT_APP_SERVER_URL
  
//   const { serviceId } = useParams();

//   const navigate = useNavigate();

//   const [picture, setPicture] = useState(null);
//   const [speciality, setSpeciality] = useState("");
//   const [place, setPlace] = useState("");
//   const [description, setDescription] = useState("");
//   const [amountOfPeople, setAmountOfPeople] = useState("");
//   const [pricePerPerson, setPricePerPerson] = useState("");
//   const [availability, setAvailability] = useState("");

//   const storedToken = localStorage.getItem('authToken');

//   const uploadImage = (file) => {
//     return axios
//       .post(`${API_URL}/api/upload`, file)
//       .then((res) => res.data)
//       .catch((e) => console.log(e));
//   };

//   const handleFileUpload = (e) => {
//     const uploadData = new FormData();
//     uploadData.append("picture", e.target.files[0]);

//     uploadImage(uploadData)
//       .then((response) => {
//         setPicture(response.picture);
//       })
//       .catch((err) => console.log("Error while uploading the file: ", err));
//   };

//   useEffect(() => {
//     axios.get(`${API_URL}/api/services/${serviceId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
//       .then(response => {
//         const oneService = response.data;
//         setPicture(oneService.picture);
//         setSpeciality(oneService.speciality);
//         setPlace(oneService.place);
//         setDescription(oneService.description);
//         setAmountOfPeople(oneService.amountOfPeople);
//         setPricePerPerson(oneService.pricePerPerson);
//         setAvailability(oneService.availability)
//       })
//       .catch(e => console.log("failed to fetch the service", e));
//   }, [serviceId, storedToken]);

//   const handleSubmitUpdate = (e) => {
//     e.preventDefault();
//     const requestBodyService = {
//       picture,
//       speciality,
//       place,
//       description,
//       amountOfPeople,
//       pricePerPerson,
//       availability
//     };

//     console.log(requestBodyService)
    
//     axios
//       .put(`${API_URL}/api/services/${serviceId}`, requestBodyService, { headers: { Authorization: `Bearer ${storedToken}` } })
//       .then(response => {
//         navigate("/myService");
//         alert("success")
//       })
//       .catch(e => console.log("failed to edit the service", e));
//   };


//   return (
//     <div >
//       <form onSubmit={handleSubmitUpdate} className="edit-service-page">
//         <label>Speciality</label>
//         <input
//           type="text"
//           name="speciality"
//           value={speciality}
//           onChange={e => { setSpeciality(e.target.value) }}
//         />
//         <label>Image</label>
//         <img src={picture} alt="img" className="image-edit-service" />
//         <input
//           type="file"
//           name="picture"
//           onChange={handleFileUpload}
//         />

//         <label>Place</label>
//         <input
//           type="text"
//           name="place"
//           value={place}
//           onChange={e => { setPlace(e.target.value) }}
//         />

//         <label>Description</label>
//         <input
//           type="text"
//           name="description"
//           value={description}
//           onChange={e => { setDescription(e.target.value) }}
//         />

//         <label>Price Per Person</label>
//         <input
//           type="number"
//           name="pricePerPerson"
//           value={pricePerPerson}
//           onChange={e => { setPricePerPerson(e.target.value) }}
//         />

     
//         <label>Availability</label>
//         <select
//           name="availability"
//           value={availability}
//           onChange={(e) => setAvailability(e.target.value)}
//         >
//           <option value="">-- Select Availability --</option>
//           <option value="Available">Available</option>
//           <option value="Unavailable">Unavailable</option>
//         </select>
//         <button type="submit">Update</button>
//       </form>
//     </div>
//   );
// }

// export default EditServicesPage;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditServicesPage = () => {
    const { serviceId } = useParams();
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_SERVER_URL;
    const storedToken = localStorage.getItem('authToken');

    // Initial state for service details
    const [serviceDetails, setServiceDetails] = useState({
        speciality: '',
        place: '',
        description: '',
        pricePerPerson: '',
        availability: '',
        picture: null // Initially, no file is selected
    });

    useEffect(() => {
        axios.get(`${API_URL}/api/services/${serviceId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(response => {
                const { speciality, place, description, pricePerPerson, availability, picture } = response.data;
                setServiceDetails({
                    speciality,
                    place,
                    description,
                    pricePerPerson,
                    availability,
                    picture // Assuming this is the URL to the existing picture
                });
            })
            .catch(error => console.error("There was an error fetching the service details", error));
    }, [serviceId, API_URL, storedToken]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setServiceDetails({
            ...serviceDetails,
            [name]: value,
        });
    };

    const handleFileChange = (event) => {
        setServiceDetails({
            ...serviceDetails,
            picture: event.target.files[0],
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        for (const key in serviceDetails) {
            formData.append(key, serviceDetails[key]);
        }

        axios.put(`${API_URL}/api/services/${serviceId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${storedToken}`,
            },
        })
        .then(() => {
            alert('Service updated successfully!');
            navigate('/myService');
        })
        .catch(error => console.error('There was an error updating the service', error));
    };

    return (
        <div >
            <h2 style={{textAlign: "center"}}>Edit Service</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="edit-service-page">
                <label>Speciality</label>
                <input 
                  type="text" 
                  name="speciality" 
                  value={serviceDetails.speciality} 
                  onChange={handleInputChange} 
                />
                
                <label>Picture</label>
                <input 
                  type="file" 
                  name="picture" 
                  onChange={handleFileChange} 
                />
                <img src={serviceDetails?.picture} alt='img' className='image-edit-service'/>
                
                <label>Place</label>
                <input
                  type="text"
                  name="place"
                  value={serviceDetails.place}
                  onChange={handleFileChange}
                />

                <label>Description</label>
                <input
                  type="text"
                  name="description"
                  value={serviceDetails.description}
                  onChange={handleFileChange}
                />

                <label>Price Per Person</label>
                <input
                  type="number"
                  name="pricePerPerson"
                  value={serviceDetails.pricePerPerson}
                  onChange={handleFileChange}
                />
            
                <label>Availability</label>
                <select
                  name="availability"
                  value={serviceDetails.availability}
                  onChange={handleFileChange}
                >
                  <option value="">-- Select Availability --</option>
                  <option value="Available">Available</option>
                  <option value="Unavailable">Unavailable</option>
                </select>

                <button type="submit">Update Service</button>
            </form>
        </div>
    );
};

export default EditServicesPage;
