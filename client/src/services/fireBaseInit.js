import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASEKEY,
  authDomain: process.env.REACT_APP_FIREBASEURL,
  projectId: "trinity1-6d22d",
  storageBucket: process.env.REACT_APP_FBSTORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FBMESSAGESENDID,
  appId: process.env.REACT_APP_FBAPPID
}

const app = firebase.initializeApp(firebaseConfig)

export const storage = getStorage(app)
export const firestore = firebase.firestore();
export const auth = firebase.auth();