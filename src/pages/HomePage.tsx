import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Car } from "../types/car";
import CarCard from "../components/CarCard";
import "../styles/home.css"; 

const HomePage = () => {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    const fetchCars = async () => {
      const querySnapshot = await getDocs(collection(db, "cars"));
      const carList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Car[];
      setCars(carList);
    };
    fetchCars();
  }, []);

  return (
    <div className="homepage">
      <h2 className="homepage-title">Available Cars</h2>
      <div className="car-grid">
        {cars.map(car => <CarCard key={car.id} car={car} />)}
      </div>
    </div>
  );
};

export default HomePage;
