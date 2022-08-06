import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyA_9obVTANHeyUi2Vg4U53ibxew0w4pRGE",
    authDomain: "todolistapp-a7737.firebaseapp.com",
    projectId: "todolistapp-a7737",
    storageBucket: "todolistapp-a7737.appspot.com",
    messagingSenderId: "772982451575",
    appId: "1:772982451575:web:ccfdb715400884065cc572",
    measurementId: "G-SS0PSMKCGK"
});

const db = firebaseApp.firestore();
export default db;