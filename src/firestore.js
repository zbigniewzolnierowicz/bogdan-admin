import { initializeApp } from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDpNwhWbKV1fIF8Ut6Q08O9iz0fu8YRsaU",
  authDomain: "mr-decal-7d5e3.firebaseapp.com",
  databaseURL: "https://mr-decal-7d5e3.firebaseio.com",
  projectId: "mr-decal-7d5e3",
  storageBucket: "mr-decal-7d5e3.appspot.com",
  messagingSenderId: "343777222161",
  appId: "1:343777222161:web:aa947eac0f6e2732"
};
const app = initializeApp(firebaseConfig);
const db = app.firestore();
const storage = app.storage();
const auth = app.auth();
export { db, storage, auth };
