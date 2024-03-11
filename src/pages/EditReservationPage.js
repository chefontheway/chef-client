import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditReservationPage(props) {
  const API_URL = process.env.REACT_APP_SERVER_URL
  
  const { reservationId } = useParams();
  
  const navigate = useNavigate();

  const[fullName, setFullName] = useState("");
  const[totalPerson, setTotalPerson] = useState("");
  const[pricePerPerson, setPricePerPerson] = useState("");
  const[totalPrice, setTotalPrice] = useState("");
  const[date, setDate] = useState("");
  const[hour, setHour] = useState("");

  const storeToken = localStorage.getItem('authToken');

  useEffect(() => {
    axios.get(`${API_URL}/api/reservations/${reservationId}`, { headers: { Authorization: `Bearer ${storeToken}` } })
    .then(response => {
      const oneReservation = response.data;
      setFullName(oneReservation.fullName);
      setTotalPerson(oneReservation.totalPerson);
      setPricePerPerson(oneReservation.pricePerPerson);
      setTotalPrice(oneReservation.totalPrice);
      setHour(oneReservation.hour);

      // Format the date received from the server
      const formattedDate = format(new Date(oneReservation.date), "yyyy-MM-dd");
      setDate(formattedDate);
    })
    .catch(err => console.log("failed updating the reservation"));
  }, [reservationId]);


  const handleEditReservation = (e) => {
    e.preventDefault();

    const requestBodyReservation = {
      fullName,
      totalPerson,
      pricePerPerson,
      totalPrice,
      date,
      hour
    };

    axios
      .put(`${API_URL}/api/reservations/${reservationId}`, 
      requestBodyReservation,
      { headers: { Authorization: `Bearer ${storeToken}` } })
      .then(response => {
        navigate(-1);
        alert("You have successfully updated.");
      })
      .catch(e => console.log("failed to edit the service", e));
  };
  
  return(
    <div className="edit-reservation-page">
        <form onSubmit={handleEditReservation} className="edit-reservation-form">
        
        <label>Total Person</label>
        <input 
          type="number"
          name="totalPerson"
          value={totalPerson}
          onChange={e => {setTotalPerson(e.target.value)}}
        />

        <label>Total Price</label>
        <input 
          type="number"
          name="totalPrice"
          value={totalPrice}
          onChange={e => {setTotalPrice(e.target.value)}}
        />

        <label>Date</label>
        <input 
          type="date"
          name="date"
          value={date}
          onChange={e => {setDate(e.target.value)}}
        />

        <label>hour</label>
        <input 
          type="hour"
          name="hour"
          value={hour}
          onChange={e => {setHour(e.target.value)}}
        />

        <button type="submit">Update</button>
      </form>
    </div>
  )
};

export default EditReservationPage;