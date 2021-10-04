import Rebase from 're-base';
import Firebase from "firebase/app";

require('firebase/database');

const firebaseApp = Firebase.initializeApp({
    apiKey: "AIzaSyC_e2GYUIo8SGIZTX38lAA5PuTcOcvw0vY",
    authDomain: "very-hot-burgers-89e21.firebaseapp.com",
    databaseURL: "https://very-hot-burgers-89e21-default-rtdb.europe-west1.firebasedatabase.app",

    /*projectId: "very-hot-burgers-89e21",
    storageBucket: "very-hot-burgers-89e21.appspot.com",
    messagingSenderId: "313116162967",
    appId: "1:313116162967:web:7355a32571eeaa9352e2d2"*/
});

const base = Rebase.createClass(firebaseApp.database());

export {firebaseApp};
export default base;