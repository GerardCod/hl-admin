import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDyybelhhZqlNeVNQBdTB-ijRHLawaXVio",
  authDomain: "homegrown-learning.firebaseapp.com",
  projectId: "homegrown-learning",
  storageBucket: "homegrown-learning.appspot.com",
  messagingSenderId: "920114469568",
  appId: "1:920114469568:web:a8615d950df1b4212eeb25",
  measurementId: "G-LJCQWGME0K"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const storage = firebase.storage();

export default firebase;