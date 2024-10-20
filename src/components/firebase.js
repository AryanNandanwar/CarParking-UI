import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCkT2cON1oT-wsrX498Gjg9Wr1iS_8qK_k",
    authDomain: "car-parking-data-5a481.firebaseapp.com",
    databaseURL: "https://car-parking-data-5a481-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "car-parking-data-5a481",
    storageBucket: "car-parking-data-5a481.appspot.com",
    messagingSenderId: "792906043562",
    appId: "1:792906043562:web:49cddeec827cf604f200d3"
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
