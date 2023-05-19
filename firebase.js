// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxvmwhmIBE_NZkLT2BkV_ja_qcns_oCFs",
  authDomain: "victor-ecommerce-admin.firebaseapp.com",
  projectId: "victor-ecommerce-admin",
  storageBucket: "victor-ecommerce-admin.appspot.com",
  messagingSenderId: "51595989106",
  appId: "1:51595989106:web:6a10121f0fac75b4d232eb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)