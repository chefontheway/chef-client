import { Link } from "react-router-dom";

function ConfirmationPage() {
    return(
        <div className="confirmation-page">
            <h1>Reservation Confirmed</h1>
            <p>Your reservation has been successfully made!</p>
            <p>Thank you for choosing our service</p>

            <Link to="/reservations">
                <button>Your Order</button>
            </Link>
        </div>
    )
}

export default ConfirmationPage;