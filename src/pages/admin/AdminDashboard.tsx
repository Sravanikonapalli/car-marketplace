import { useEffect, useState } from "react";
import { db, storage } from "../../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Car } from "../../types/car";
import { useNavigate } from "react-router-dom";
import "../../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const navigate = useNavigate();

  const [form, setForm] = useState<Omit<Car, "images"> & { imageFile: File | null }>({
    make: "",
    model: "",
    year: new Date().getFullYear(),
    fuelType: "",
    mileage: 0,
    transmission: "",
    owners: 1,
    registrationCity: "",
    description: "",
    price: 0,
    imageFile: null,
  });

  const fetchCars = async () => {
    const querySnapshot = await getDocs(collection(db, "cars"));
    const list = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Car[];
    setCars(list);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleAddOrUpdateCar = async () => {
    let imageUrl = "";
    if (form.imageFile) {
      const imageRef = ref(storage, `cars/${form.imageFile.name}`);
      const uploadSnap = await uploadBytes(imageRef, form.imageFile);
      imageUrl = await getDownloadURL(uploadSnap.ref);
    }

    const carData = {
      ...form,
      images: imageUrl ? [imageUrl] : [],
    };

    if (editId) {
      await updateDoc(doc(db, "cars", editId), carData);
      setEditId(null);
    } else {
      await addDoc(collection(db, "cars"), carData);
    }

    setForm({
      make: "",
      model: "",
      year: new Date().getFullYear(),
      fuelType: "",
      mileage: 0,
      transmission: "",
      owners: 1,
      registrationCity: "",
      description: "",
      price: 0,
      imageFile: null,
    });

    fetchCars();
  };

  const handleEdit = (car: Car) => {
    setEditId(car.id!);
    setForm({ ...car, imageFile: null });
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "cars", id));
    fetchCars();
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>{editId ? "Update Car" : "Add New Car"}</h2>
        <button className="btn btn-secondary" onClick={() => navigate("/admin/requests")}>
          View Purchase Requests
        </button>
      </div>

      <div className="car-form">
        <label>Make:</label>
        <input value={form.make} onChange={(e) => setForm({ ...form, make: e.target.value })} placeholder="e.g., Toyota" />

        <label>Model:</label>
        <input value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} placeholder="e.g., Innova" />

        <label>Year:</label>
        <input type="number" value={form.year} onChange={(e) => setForm({ ...form, year: +e.target.value })} />

        <label>Fuel Type:</label>
        <input value={form.fuelType} onChange={(e) => setForm({ ...form, fuelType: e.target.value })} placeholder="e.g., Diesel" />

        <label>Mileage (km):</label>
        <input type="number" value={form.mileage} onChange={(e) => setForm({ ...form, mileage: +e.target.value })} />

        <label>Transmission:</label>
        <input value={form.transmission} onChange={(e) => setForm({ ...form, transmission: e.target.value })} placeholder="Manual/Automatic" />

        <label>Owners:</label>
        <input type="number" value={form.owners} onChange={(e) => setForm({ ...form, owners: +e.target.value })} />

        <label>Registration City:</label>
        <input value={form.registrationCity} onChange={(e) => setForm({ ...form, registrationCity: e.target.value })} placeholder="e.g., Hyderabad" />

        <label>Description:</label>
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Condition, service history..." />

        <label>Price (₹):</label>
        <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: +e.target.value })} />

        <label>Image:</label>
        <input type="file" onChange={(e) => setForm({ ...form, imageFile: e.target.files?.[0] || null })} />

        <button className="btn btn-primary" onClick={handleAddOrUpdateCar}>
          {editId ? "Update" : "Add Car"}
        </button>
      </div>

      <h3>All Cars</h3>
      {cars.map((car) => (
        <div key={car.id} className="car-card">
          <h4>{car.make} {car.model} ({car.year})</h4>
          {car.images?.[0] && <img src={car.images[0]} alt="car" />}
          <p><strong>Fuel:</strong> {car.fuelType}</p>
          <p><strong>Mileage:</strong> {car.mileage} km</p>
          <p><strong>Transmission:</strong> {car.transmission}</p>
          <p><strong>Owners:</strong> {car.owners}</p>
          <p><strong>City:</strong> {car.registrationCity}</p>
          <p><strong>Description:</strong> {car.description}</p>
          <p><strong>Price:</strong> ₹{car.price}</p>
          <div className="buttons">
            <button className="btn btn-primary" onClick={() => handleEdit(car)}>Edit</button>
            <button className="btn btn-danger" onClick={() => handleDelete(car.id!)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
