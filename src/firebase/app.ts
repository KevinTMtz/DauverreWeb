import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/storage';

import 'firebase/functions'

const firebaseConfig = {
  apiKey: 'AIzaSyDPm0dMe1rpGOgV6Hkgk5v6E0kujBhTiEU',
  authDomain: 'dauverre-ac.firebaseapp.com',
  databaseURL: 'https://dauverre-ac.firebaseio.com',
  projectId: 'dauverre-ac',
  storageBucket: 'dauverre-ac.appspot.com',
  messagingSenderId: '1044841907485',
  appId: '1:1044841907485:web:d440d2c53c1e0928c68df4',
  measurementId: 'G-GPXZ8Z6NFR',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;

export const auth = firebaseApp.auth();
export const functions = firebaseApp.functions();

export const db = firebaseApp.firestore();
export const functions = firebaseApp.functions();
export const storage = firebaseApp.storage();


