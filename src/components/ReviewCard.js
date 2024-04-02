import axios from "axios";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import deleteImg from "../images/delete-icon.png"
import editImg from "../images/edit-icon.png"
import EditReviewPage from "../pages/EditReviewPage";

const API_URL = process.env.REACT_APP_SERVER_URL;

function ReviewCard({ description, reviewId, rating, owner, name, picture, serviceId }) {
  const { isLoggedIn, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const storedToken = localStorage.getItem("authToken");

  const deleteReview = () => {
    axios
      .delete(`${API_URL}/api/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate(-0);
      })
      .catch((e) => console.log("failed to delete the review", e));
  };

  const renderRatingStars = () => {
    const limitedRating = Math.max(1, Math.min(rating, 5)); // Limit the rating between 1 and 5
    const stars = [];
    for (let i = 1; i <= limitedRating; i++) {
      stars.push(<span key={i} className="gold-star">★</span>);
    }
    return stars;
  };

  const isOwner = isLoggedIn && user && owner === user._id;

  return (
    <div>
      <div className="card-review">
        <div className="picture-name-container">
          <img src={picture} alt="img" className="review-picture"/>
          <p>{name}</p>
        </div>
        <div className="star-render">{renderRatingStars()}</div>
        <p>{description}</p>

        {isOwner && (
          <div>
            <Link to={`/reviews/edit/${reviewId}`}>
              <img className="editIcon" src={editImg} alt="editButton"/>
            </Link>
            <img className="deleteIcon" onClick={deleteReview} src={deleteImg} alt="deleteButton"/>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReviewCard;

