import React, { useEffect, useState } from "react";
import { database } from "./firebase"; // Adjust path accordingly
import { ref, onValue } from "firebase/database";

const ParkingSlotsDisplay = () => {
  const [parkingData, setParkingData] = useState(null);

  useEffect(() => {
    const dbRef = ref(database, "Cars_Parked");

    // Listen for changes in the Cars_Parked node
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setParkingData(data || {});
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>Smart Car Parking System</h1>
      {parkingData ? (
        <div>
          <p>Total Cars Parked: {parkingData.Cars_Parked}</p>
          <ul>
            <li>Slot 1: {parkingData.Slot1 === 1 ? "Occupied" : "Free"}</li>
            <li>Slot 2: {parkingData.Slot2 === 1 ? "Occupied" : "Free"}</li>
            <li>Slot 3: {parkingData.Slot3 === 1 ? "Occupied" : "Free"}</li>
          </ul>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default ParkingSlotsDisplay;
