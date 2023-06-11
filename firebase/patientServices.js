import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export const listAllPatients = async (nextPageToken) => {
  // List batch of users, 1000 at a time.
  const patients = [];
  const querySnapshot = await getDocs(collection(db, "patients"));
  querySnapshot.forEach((doc) => {
    patients.push({ ...doc.data(), id: doc.id });
  });

  return patients;
};
