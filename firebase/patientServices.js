import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export const listAllPatients = async (nextPageToken) => {
  // List batch of users, 1000 at a time.
  const patients = [];
  const querySnapshot = await getDocs(collection(db, "patients"));
  querySnapshot.forEach((doc) => {
    patients.push({ ...doc.data(), id: doc.id });
  });

  const date = new Date();
  for(let i = 0; i < 10; i++){
    console.log('callled');
    // await addDoc(collection(db, "records"), {
    //   patientId: "0GXwpzNwHfOguBxdfzWlFyGux7m1",
    //   diseases: "Malaria",
    //   createAt: date,
    //   hospital: "",
    // });
    date.setMonth(date.getMonth() - 1);
  }

  return patients;
};
