import axios from "axios";
import { useState, useEffect } from "react";
import ServiceCard from "../components/ServiceCard";

function ServiceList() {
  const API_URL = process.env.REACT_APP_SERVER_URL
  
  const [services, setServices] = useState(undefined);
  const [place, setSearchPlace] = useState('');
  const [pricePerPerson, setSearchPricePerPerson] = useState('');

  const storeToken = localStorage.getItem('authToken');

  const getAllService = () => {
    axios
    .get(`${API_URL}/api/services`, { headers: { Authorization: `Bearer ${storeToken}` }})
    .then((result) => {
      console.log(result.data); // Debugging: Log the data to inspect its structure
      if (Array.isArray(result.data)) { // Check if the response is an array
        let filteredServices = result.data.filter((element) => {
          const matchesPlace = element.place.toLowerCase().includes(place.toLowerCase());
          const matchesPrice = pricePerPerson === '' || element.pricePerPerson <= parseFloat(pricePerPerson);
          return matchesPlace && matchesPrice;
        });
        setServices(filteredServices);
      } else {
        console.error('Expected an array but received:', result.data);
        setServices([]); // Fallback to an empty array or handle as needed
      }
    })
    .catch((error) => {
      console.log(error); // Error handling
    });

  };

  useEffect(() => {
    getAllService();
  }, [place, pricePerPerson]);

  console.log(services)

  if (services === undefined) {
    return <h1 className="loading">Loading...</h1>;
  } else {
    return (
      <div>

        <div className="container-filter-by-place">
          <input
            type="text"
            value={place}
            onChange={(e) => setSearchPlace(e.target.value)}
            className="filter-input"
            placeholder="Filter by Place"
          />
          <br />
          <input
            type="text"
            value={pricePerPerson}
            onChange={(e) => setSearchPricePerPerson(e.target.value)}
            className="filter-input"
            placeholder="Filter by Max Price"
          />
        
        </div>
        <div className="title-list"><h1>Choose your fighter</h1></div>
        <div className="list-of-services">
          {services.length === 0 ? (
            <p>No services found.</p>
          ) : (
            services.map((service) => (
              <div key={service._id} className="container-service-card-list">
                <ServiceCard key={service._id} {...service} />
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}

export default ServiceList;

