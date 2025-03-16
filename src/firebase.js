import { initializeApp } from 'firebase/app';
import { getAuth, FacebookAuthProvider, signInWithPopup, signOut, onAuthStateChanged} from 'firebase/auth';
import {getFirestore, addDoc, collection, deleteDoc, updateDoc, doc, onSnapshot, query,where, getDocs, getDoc} from 'firebase/firestore'

const firebaseConfig = {
  apiKey:process.env.VUE_APP_API_KEY,
  authDomain:process.env.VUE_APP_AUTH_DOMAIN,
  projectId:process.env.VUE_APP_PROJECT_ID,
  storageBucket:process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId:process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId:process.env.VUE_APP_APP_ID
};
console.log(process.env.VUE_APP_PROJECT_ID)


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const facebookProvider = new FacebookAuthProvider();
const db = getFirestore(app)

export { auth, facebookProvider, db, signInWithPopup, signOut, onAuthStateChanged, addDoc, collection, deleteDoc, updateDoc, doc,onSnapshot, query, where, getDocs, getDoc};








