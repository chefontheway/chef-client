import { Link } from "react-router-dom";
import IsPrivate from "../components/IsPrivate";
import deleteImg from '../images/delete-icon.png'
import editImg from '../images/edit-icon.png'
import defaultPicture from '../images/tableexposition.jpg'

function MyServiceList({ speciality, place, picture, _id, owner, pricePerPerson, availability, deleteService}) {

    return(
        <>
            <div className="description-myService">
            <Link to={{ pathname: `/services/${_id}`, state: { picture } }}>
                <div className="img-service-myList">
                    {picture ? <img src={picture} alt="img"/> : <img src={defaultPicture} alt="defaultPictures"/>}
                </div>
                <div className="description-mylist">
                    <h1>{speciality}</h1>
                    <h4>{place}</h4>
                    <h4>Price : {pricePerPerson} €</h4>
                    <h4>{availability}</h4>
                 </div>
                </Link>
                <div className="Service-page-Btn">
                    <Link to={`/services/edit/${_id}`}>
                    <img className="edit-myService" src={editImg} alt="editImg" />
                    </Link>
                    <IsPrivate>
                        <img onClick={() => deleteService(_id)} src={deleteImg} alt="editImg" className="delete-myService"  />
                    </IsPrivate>
                </div>
            </div>
        </>
    );
}

export default MyServiceList;