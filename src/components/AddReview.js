import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";

const API_URL = process.env.REACT_APP_SERVER_URL;

function AddReview(props) {
  const { isLoggedIn, user } = useContext(AuthContext);

  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [showForm, setShowForm] = useState(false); // Track form visibility

  const handleSubmitNewReview = (e) => {
    e.preventDefault();
    const { serviceId } = props;
    const requestBodyReview = { description, serviceId, rating };
    const storedToken = localStorage.getItem("authToken");

    axios
      .post(`${API_URL}/api/reviews`, requestBodyReview, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setDescription("");
        setRating(0);
        props.getService(); // refers to the element of the AddReview
        setShowForm(false); // Hide the form after submitting
      })
      .catch((err) => console.log(err));
  };

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const renderRatingStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          onClick={() => handleRatingChange(i)}
          style={{ cursor: "pointer" }}
        >
          {i <= rating ? "★" : "☆"}
        </span>
      );
    }
    return stars;
  };

  return (
    <div >
      {isLoggedIn && user ? (
        <div>
          <button onClick={toggleFormVisibility}>Give your review</button>
          {showForm && (
            <div className="add-review-div">
              <h4>Description</h4>
              <form onSubmit={handleSubmitNewReview}>
                <textarea
                  type="text"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div>
                  <p>Rate the service:</p>
                  <div>{renderRatingStars()}</div>
                </div>
                <div>
                  <button type="submit">Submit</button>
                </div>
              </form>
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default AddReview;
