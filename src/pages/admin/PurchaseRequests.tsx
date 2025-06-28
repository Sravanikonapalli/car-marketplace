import { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

interface Request {
  id: string;
  carId: string;
  email: string;
  requestedAt: string;
  status: string;
}

const PurchaseRequests = () => {
  const [requests, setRequests] = useState<Request[]>([]);

  const fetchRequests = async () => {
    const querySnapshot = await getDocs(collection(db, "purchaseRequests"));
    const reqList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Request[];
    setRequests(reqList);
  };

  const updateStatus = async (id: string, status: string) => {
    await updateDoc(doc(db, "purchaseRequests", id), { status });
    fetchRequests();
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2>Purchase Requests</h2>
      {requests.map(req => (
        <div key={req.id} style={{ border: "1px solid #ccc", padding: 10, margin: 10 }}>
          <p>Email: {req.email}</p>
          <p>Car ID: {req.carId}</p>
          <p>Status: {req.status}</p>
          <button onClick={() => updateStatus(req.id, "Approved")}>Approve</button>
          <button onClick={() => updateStatus(req.id, "Rejected")}>Reject</button>
          <button onClick={() => updateStatus(req.id, "Contacted")}>Contacted</button>
        </div>
      ))}
    </div>
  );
};

export default PurchaseRequests;
