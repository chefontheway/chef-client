import { Link } from "react-router-dom"
import defaultPicture from '../images/tableexposition.jpg'

function ServiceCard({ speciality, place, picture, _id, owner, pricePerPerson, availability}) {
    const ownerName = owner.name

    return(                 
            <div className="description-service">
            {availability === "Available"
                ? <Link to={{ pathname: `/services/${_id}`, state: { picture } }}>
                        <div className="img-service-list">
                            {picture ? <img src={picture} alt="img" /> : <img src={defaultPicture} alt="defaultPictures"/>}
                            <div className="description-list">
                                <h1>{ownerName} || {speciality}</h1>
                                <h4>{place}</h4>
                                <h4>{pricePerPerson} € / Person</h4>
                                <h4>{availability}</h4>                  
                            </div>
                        </div>
                  </Link>      
                : <></>
            }
            </div>
        );
}

export default ServiceCard;