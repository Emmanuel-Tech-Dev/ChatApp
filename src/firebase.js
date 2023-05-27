// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import {getStorage} from 'firebase/storage'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBhWkxeXSqOFwtUuVfWirjN09NXCTZz1p0',
  authDomain: 'chattinga-6606b.firebaseapp.com',
  projectId: 'chattinga-6606b',
  storageBucket: 'chattinga-6606b.appspot.com',
  messagingSenderId: '1021518460126',
  appId: '1:1021518460126:web:7a8581d72e45f5ab053e4f',
  measurementId: 'G-LBEXEJRPQK',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()


