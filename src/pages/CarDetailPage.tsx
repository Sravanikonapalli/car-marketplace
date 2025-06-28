import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase/firebaseConfig";
import { Car } from "../types/car";
import "../styles/CarDetailPage.css"; 

const CarDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);

  useEffect(() => {
    const fetchCar = async () => {
      if (!id) return;
      const docRef = doc(db, "cars", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setCar({ id: docSnap.id, ...docSnap.data() } as Car);
    };
    fetchCar();
  }, [id]);

  const handleRequestPurchase = async () => {
    const user = auth.currentUser;
    if (!user || !car) {
      const confirmLogin = window.confirm("Login required. Go to login?");
      if (confirmLogin) navigate("/login");
      return;
    }

    const request = {
      userId: user.uid,
      carId: car.id,
      status: "Pending",
      email: user.email,
      requestedAt: new Date().toISOString(),
    };

    await setDoc(doc(collection(db, "purchaseRequests")), request);
    alert("Request submitted");
  };

  if (!car) return <div className="loading">Loading...</div>;

  return (
    <div className="car-detail-container">
      <h2 className="car-title">
        {car.make} {car.model} ({car.year})
      </h2>
      <img
        src={car.images?.[0]}
        alt="car"
        className="car-image"
      />
      <div className="car-details">
        <p><strong>Description:</strong> {car.description}</p>
        <p><strong>Fuel Type:</strong> {car.fuelType}</p>
        <p><strong>Mileage:</strong> {car.mileage} km</p>
        <p><strong>Owners:</strong> {car.owners}</p>
        <p><strong>City:</strong> {car.registrationCity}</p>
        <p><strong>Transmission:</strong> {car.transmission}</p>
        <p><strong>Price:</strong> ₹{car.price}</p>
      </div>
      <button className="request-btn" onClick={handleRequestPurchase}>
        Request to Purchase
      </button>
    </div>
  );
};

export default CarDetailPage;
