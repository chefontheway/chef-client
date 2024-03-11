import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import axios from "axios";

function ProfilePage() {
  const storedToken = localStorage.getItem("authToken");
  const getTheLengthOfOrderList = localStorage.getItem("lengthOfOrder");
  const getMyWorkLength = localStorage.getItem("myWorkLength");
  const getUserIdWhoReserve = localStorage.getItem("userIdWhoReserve");
  const getOwnerId = localStorage.getItem("ownerId");
  
  const API_URL = process.env.REACT_APP_SERVER_URL; 
  const { isLoggedIn, user } = useContext(AuthContext);
  const[profile, setProfile] = useState("");
  const[notificationOrder, setNotificationOrder] = useState("");
  const[notificationWork, setNotificationWork] = useState("");

  const fetchingProfile = () => {
    axios.get(`${API_URL}/api/profile`, { headers : { Authorization: `Bearer ${storedToken}`}})
      .then(response => {
        setProfile(response.data)
      })
      .catch(e => console.log("failed fetching data"));
  };

  useEffect(() => {
    fetchingProfile();
  }, []);

  useEffect(() => {
    if(profile && getUserIdWhoReserve) {
      const profileInArray = [profile._id];
      const getUserIdWhoReserveInArray = getUserIdWhoReserve ? [getUserIdWhoReserve] : [];
      const checkIfTrueOrderUserId = getUserIdWhoReserveInArray.some(id => profileInArray.includes(id));

      if(getTheLengthOfOrderList > 0 && checkIfTrueOrderUserId) {
          setNotificationOrder(getTheLengthOfOrderList);
      } else {
          setNotificationOrder("");
      }
    }

    if(getMyWorkLength > 0 && getOwnerId === user?._id) {
        setNotificationWork(getMyWorkLength);
    } else {
        setNotificationWork("");
    }
  }, [profile, getTheLengthOfOrderList, getMyWorkLength, getUserIdWhoReserve, getOwnerId, user]);

  return (
    <div>
      <div className="btn-reservation-list">
        <Link to="/create">
          <button>Create Service</button>
        </Link>

        <Link to="/reservations">
          <button>Your Order <span className="notification">{notificationOrder}</span></button>
        </Link>

        <Link to="/myService">
          <button>Your Own Service</button>
        </Link>

        <Link to="/mywork">
          <button>My Work <span className="notification">{notificationWork}</span></button>
        </Link>
      </div>
    
      <div className="profile">
        {isLoggedIn && user && (
          <div key={profile._id}>
            <h1>Welcome {profile.name}</h1>
            <div>
              <img src={profile.picture} alt="img" className="profile-picture"/>
            </div>
            <h3>Address: {profile.address}</h3>
            <p>Email: {profile.email}</p>
            <Link to={`/profile/edit/${profile._id}`}>
              <button>Edit Profile</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
