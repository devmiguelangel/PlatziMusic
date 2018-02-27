import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyA_vfJn9MNrqJ9j0PA3y4GbmiJEz3eWlZ8",
  authDomain: "platzimusic-196421.firebaseapp.com",
  databaseURL: "https://platzimusic-196421.firebaseio.com",
  projectId: "platzimusic-196421",
  storageBucket: "platzimusic-196421.appspot.com",
  messagingSenderId: "1057440979740"
};
firebase.initializeApp(config);

export const firebaseAuth = firebase.auth();

export const firebaseDatabase = firebase.database();

export default firebase;