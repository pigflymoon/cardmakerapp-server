import firebase from 'firebase';
const prodConfig = {
    apiKey: "AIzaSyCWshjbWMf9dKwKWScyYePagnBLu-aD04I",
    authDomain: "cardmaker-31ae8.firebaseapp.com",
    databaseURL: "https://cardmaker-31ae8.firebaseio.com",
    projectId: "cardmaker-31ae8",
    storageBucket: "cardmaker-31ae8.appspot.com",
    messagingSenderId: "409995152460"
};

const devConfig = {
    apiKey: "AIzaSyD82Zkw5DitDzlrBnTqO2jvt38eMOn1LzU",
    authDomain: "cardmaker-dev.firebaseapp.com",
    databaseURL: "https://cardmaker-dev.firebaseio.com",
    projectId: "cardmaker-dev",
    storageBucket: "cardmaker-dev.appspot.com",
    messagingSenderId: "588144564200"
};
console.log('(process.env.NODE_ENV is ?===========>' ,process.env.NODE_ENV)
const config = process.env.NODE_ENV === 'production' ? devConfig : devConfig;//prodConfig devConfig


var firebaseApp = firebase.initializeApp(config);
const db = firebaseApp.database();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export {
    db,
    auth,
    storage,
};
