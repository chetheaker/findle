import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyCHNE3hCPYDPI-9pLB06NQJ1wWAYoSNqxA",
  authDomain: "trinity1-6d22d.firebaseapp.com",
  projectId: "trinity1-6d22d",
  storageBucket: "trinity1-6d22d.appspot.com",
  messagingSenderId: "904774931337",
  appId: "1:904774931337:web:50cdc9bf3989fbc6a70758"
}

const app = firebase.initializeApp(firebaseConfig)

export const storage = getStorage(app)

export const firestore = firebase.firestore();