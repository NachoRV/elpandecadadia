import firebase from 'firebase';

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: 'AIzaSyApAsyDu4qtLn55KB1l5G7FEaBaa26a_CQ',
  authDomain: 'elpandecadadia-84430.firebaseapp.com',
  projectId: 'elpandecadadia-84430',
  storageBucket: 'elpandecadadia-84430.appspot.com',
  messagingSenderId: '957025888019',
  appId: '1:957025888019:web:7bd066a2c1a6c78b08dce6',
};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();
const st = firebase.storage();

// collection references
const usersCollection = db.collection('users');
const postsCollection = db.collection('posts');
const commentsCollection = db.collection('comments');
const likesCollection = db.collection('likes');

// export utils/refs
export {
  db,
  auth,
  st,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection,
};
