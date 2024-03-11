// import axios from "axios";
// import { useState, useEffect, useContext } from "react";
// import { useNavigate, useParams, } from "react-router-dom";
// import { AuthContext } from "../context/auth.context";

// function ReservationPage(props){

//     const {user} = useContext(AuthContext);
//     const [reservation, setReservation] = useState([]);
//     const [service, setService] = useState("");
//     const [fullName, setFullName] = useState("");
//     const [totalPerson, setTotalPerson] = useState("");
//     const [pricePerPerson, setPricePerPerson] = useState("");
//     const [totalPrice, setTotalPrice] = useState("");
//     const [date, setDate] = useState("");
//     const [hour, setHour] = useState("");

//     const API_URL = process.env.REACT_APP_SERVER_URL;
    
//     const { serviceId } = useParams();
//     const navigate = useNavigate()
//     const storedToken = localStorage.getItem("authToken");
    
//     const getService = () => {
//         axios
//             .get(`${API_URL}/api/services/${serviceId}`, { headers : { Authorization: `Bearer ${storedToken}`}})
//                 .then((e) => {
//                     const infoService = e.data
//                     setPricePerPerson(infoService.pricePerPerson)
//                     setFullName(infoService.owner.name)
//                 })
//                 .catch((e) => console.log(e))
//     }

//       const getReservation = (e) => {
//         e.preventDefault();

//         const newReservation = {
//             serviceId, 
//             user,
//             totalPerson,
//             pricePerPerson,
//             totalPrice: (totalPerson * pricePerPerson),
//             date,
//             fullName,
//             hour
//           };


//             axios
//             .post(`${API_URL}/api/services/${serviceId}/reserve`, newReservation, { headers : { Authorization: `Bearer ${storedToken}`}})
//                 .then((response) => {                    
//                     const reservationData = response.data;
//                     setService(reservationData._id);
//                     setTotalPerson("");
//                     setTotalPrice("");
//                     setDate("");
//                     setHour("");
                                        
//                     navigate('/confirmation');
//                     console.log(reservationData)
//                 })
//                 .catch(err => {
//                     console.log("failed to reserve the service", err);
//                 });
//     }
    
//      useEffect(() => {
//         getService();
//      }, [])
    


//     if(reservation === undefined) {
//         return <h1 className="loading">Loading...</h1>
//     } else {
//         return(
//             <div className="reservation-page">
//                 <div>
//                     <h1>Reservation</h1>
//                     <h2>Service by: {fullName}</h2>
//                     <h3>Price per Person : {pricePerPerson}$</h3>
//                 </div>
//                 <form onSubmit={getReservation} className="form-reservation">
//                     <label>Total Persons</label>
//                     <input 
//                         type="number"
//                         name="totalPerson"
//                         min={1}
//                         value={totalPerson}
//                         onChange={(e) => {setTotalPerson(e.target.value)}}
//                     />
//                     <label>Date</label>
//                     <input 
//                         type="date"
//                         name="date"
//                         value={date}
//                         onChange={(e) => {setDate(e.target.value)}}
//                     />
//                     <label>Hour</label>
//                     <input 
//                         type="text"
//                         name="hour"
//                         value={hour}
//                         step="0.01"
//                         placeholder="ex. 10:30"
//                         onChange={(e) => {setHour(e.target.value)}}
//                     />
//                     <button type="submit" >Reserve</button>
//                 </form>
//             </div>

//         )
//     }

// }
// export default ReservationPage;


import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function ReservationPage(props) {
  const { user } = useContext(AuthContext);
  const [service, setService] = useState("");
  const [fullName, setFullName] = useState("");
  const [totalPerson, setTotalPerson] = useState("");
  const [pricePerPerson, setPricePerPerson] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");

  const API_URL = process.env.REACT_APP_SERVER_URL;
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const storedToken = localStorage.getItem("authToken");

  const getService = () => {
    axios
      .get(`${API_URL}/api/services/${serviceId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        const infoService = response.data;
        setPricePerPerson(infoService.pricePerPerson);
        setFullName(infoService.owner.name);
      })
      .catch((error) => console.log(error));
  };

  const getReservation = (e) => {
    e.preventDefault();

    const newReservation = {
      serviceId,
      user,
      totalPerson,
      pricePerPerson,
      totalPrice: totalPerson * pricePerPerson,
      date,
      fullName,
      hour,
    };

    axios
      .post(`${API_URL}/api/services/${serviceId}/reserve`, newReservation, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        // Redirect the user to Stripe checkout using the URL from the response
        const { stripeCheckoutUrl } = response.data;
        window.location.href = stripeCheckoutUrl;
      })
      .catch((error) => {
        console.log("Failed to reserve the service", error);
      });
  };

  useEffect(() => {
    getService();
  }, [serviceId]);

  return (
    <div className="reservation-page">
      <div>
        <h1>Reservation</h1>
        <h2>Service by: {fullName}</h2>
        <h3>Price per Person: {pricePerPerson}$</h3>
      </div>
      <form onSubmit={getReservation} className="form-reservation">
        <label>Total Persons</label>
        <input
          type="number"
          name="totalPerson"
          min={1}
          value={totalPerson}
          onChange={(e) => setTotalPerson(e.target.value)}
        />
        <label>Date</label>
        <input
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <label>Hour</label>
        <input
          type="text"
          name="hour"
          value={hour}
          placeholder="ex. 10:30"
          onChange={(e) => setHour(e.target.value)}
        />
        <button type="submit">Reserve</button>
      </form>
    </div>
  );
}

export default ReservationPage;
            