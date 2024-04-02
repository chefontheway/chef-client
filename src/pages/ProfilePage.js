import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";

function ProfilePage() {
  const getTheLengthOfOrderList = localStorage.getItem("lengthOfOrder");
  const getMyWorkLength = localStorage.getItem("myWorkLength");
  const getUserIdWhoReserve = localStorage.getItem("userIdWhoReserve");
  const getOwnerId = localStorage.getItem("ownerId");
  
  const { isLoggedIn, user } = useContext(AuthContext);
  const [notificationOrder, setNotificationOrder] = useState("");
  const [notificationWork, setNotificationWork] = useState("");

  useEffect(() => {
    if(user && getUserIdWhoReserve) {
      const profileInArray = [user._id];
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
  }, [user, getTheLengthOfOrderList, getMyWorkLength, getUserIdWhoReserve, getOwnerId]);

  return (
    <div className="profile-page-container">
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
          <div key={user._id}>
            <h1>Welcome {user.name}</h1>
            <div>
              <img src={user.picture} alt="img" className="profile-picture"/>
            </div>
            <h3>Address: {user.address}</h3>
            <p>Email: {user.email}</p>
            <Link to={`/profile/edit/${user._id}`}>
              <button>Edit Profile</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;

