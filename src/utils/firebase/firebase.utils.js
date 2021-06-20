import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

let firebaseConfig = {
    apiKey: "AIzaSyCDVkuB4iSV5q7P6Pzpvhdo_xBe11qptVQ",
    authDomain: "one-way-slab.firebaseapp.com",
    projectId: "one-way-slab",
    storageBucket: "one-way-slab.appspot.com",
    messagingSenderId: "222403485999",
    appId: "1:222403485999:web:ec8cd02a80bb9bcd01c1da",
    measurementId: "G-E9Z3CQ0YT5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

let signInProvider = new firebase.auth.GoogleAuthProvider();
signInProvider.setCustomParameters({prompt:"select_account"});

export const SignInWithGoogle = ()=> auth.signInWithPopup(signInProvider);

export const CreateUserIfNotExists = async (userAuth, additionalUserData)=>{
    if(!userAuth) return;
    let userRef = firestore.doc(`users/${userAuth.uid}`);
    let user = await userRef.get();
    console.log(user);
    try{
        if(!user.exists){
            const {displayName, email } = userAuth;
            userRef.set({
                displayName, email ,
                createdDate:new Date(),
                ...additionalUserData
            });
            console.log('user created successfully.')
        }else{
            console.log('user exists.')
        }
    }catch(err){
        console.log('error while creating user')
        console.error(err);
    }
    return userRef;
}

export default firebase;