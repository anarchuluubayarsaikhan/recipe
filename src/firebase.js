import { initializeApp } from 'firebase/app';
import { getAuth, FacebookAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAA92AWJeB44PWzSetlFo0VvJTl7hK06HM',
  authDomain: 'recipe-816db.firebaseapp.com',
  projectId: 'recipe-816db',
  storageBucket: 'recipe-816db.firebasestorage.app',
  messagingSenderId: '611651143059',
  appId: '1:611651143059:web:3a64e9f572a3605d141466',
  measurementId: 'G-0Z3GTQ0SN9',
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const facebookProvider = new FacebookAuthProvider();

export { auth, facebookProvider, signInWithPopup, signOut, onAuthStateChanged };



