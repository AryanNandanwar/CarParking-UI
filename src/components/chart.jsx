import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { database } from "./firebase"; // Adjust the path accordingly
import { ref, onValue } from "firebase/database";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables); // Register necessary chart.js components

const ParkingChart = () => {
  const [timeData, setTimeData] = useState([]);
  const [carCountData, setCarCountData] = useState([]);

  useEffect(() => {
    const dbRef = ref(database, "Cars_Parked_Log");

    // Listen for changes in the Cars_Parked_Log node
    onValue(dbRef, (snapshot) => {
      const logData = snapshot.val() || {};

      const timeLabels = [];
      const carCounts = [];

      Object.keys(logData).forEach((time) => {
        timeLabels.push(time);
        carCounts.push(logData[time]);
      });

      setTimeData(timeLabels);
      setCarCountData(carCounts);
    });
  }, []);

  const data = {
    labels: timeData, // Time of day labels
    datasets: [
      {
        label: "Number of Cars Parked",
        data: carCountData,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Time of Day",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Cars",
        },
        min: 0, // Minimum value on the y-axis
      },
    },
  };

  return (
    <div>
      <h2>Parking Slot Occupancy Over Time</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default ParkingChart;
