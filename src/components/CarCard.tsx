import { Car } from "../types/car";
import { Link } from "react-router-dom";
import "../styles/carcard.css"; 

interface Props {
  car: Car;
}

const CarCard = ({ car }: Props) => {
  return (
    <div className="car-card">
      <img
        src={car.images?.[0]}
        alt={`${car.make} ${car.model}`}
        className="car-images"
      />
      <h3 className="car-title">
        {car.make} {car.model} ({car.year})
      </h3>
      <p className="car-price">Price: ₹{car.price}</p>
      <Link to={`/car/${car.id}`} className="view-details-link">
        View Details
      </Link>
    </div>
  );
};

export default CarCard;
