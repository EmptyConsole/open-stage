import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// For Firebase JS SDK v9+, measurementId is optional
const config = {
    apiKey: "AIzaSyDKPBcx33ZE3S5Xu32QYKng2ZJ_seYfTgk",
    authDomain: "open-stage-167e7.firebaseapp.com",
    projectId: "open-stage-167e7",
    storageBucket: "open-stage-167e7.firebasestorage.app",
    messagingSenderId: "13925643966",
    appId: "1:13925643966:web:011008440fed8b2345d0ef",
    measurementId: "G-LXYHP0VHLJ"
};

const app = initializeApp(config);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { firestore, auth };