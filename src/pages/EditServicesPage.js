import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditServicesPage = () => {
    const { serviceId } = useParams();
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_SERVER_URL;
    const storedToken = localStorage.getItem('authToken');
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

    const [serviceDetails, setServiceDetails] = useState({
        speciality: '',
        place: '',
        description: '',
        pricePerPerson: '',
        availability: '',
        picture: null
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
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }

        setServiceDetails({
            ...serviceDetails,
            picture: file,
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
            <h2 className='edit-service-title'>Edit Service</h2>
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
                <img src={imagePreviewUrl || serviceDetails?.picture} alt='' className='image-edit-service'/>
                
                <label>Place</label>
                <input
                  type="text"
                  name="place"
                  value={serviceDetails.place}
                  onChange={handleInputChange}
                />

                <label>Description</label>
                <input
                  type="text"
                  name="description"
                  value={serviceDetails.description}
                  onChange={handleInputChange}
                />

                <label>Price Per Person</label>
                <input
                  type="number"
                  name="pricePerPerson"
                  value={serviceDetails.pricePerPerson}
                  onChange={handleInputChange}
                />
            
                <label>Availability</label>
                <select
                  name="availability"
                  value={serviceDetails.availability}
                  onChange={handleInputChange}
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
