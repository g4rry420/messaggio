import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyCAfIRGGAA4C3qzwWiUZ68N9LhHDJV-kWo",
    authDomain: "messaggio-2247e.firebaseapp.com",
    databaseURL: "https://messaggio-2247e.firebaseio.com",
    projectId: "messaggio-2247e",
    storageBucket: "messaggio-2247e.appspot.com",
    messagingSenderId: "952307065289",
    appId: "1:952307065289:web:1745d7680f9c3a02de8818",
    measurementId: "G-ZVVC1MBWFM"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })

        } catch (error) {
            console.log("Error while Creating User", error.message);
        }
    }
    return userRef;
}

export const createNewGroup = async (userAuth, newGroup) => {
    if(!userAuth) return;
    if(!newGroup) return;

    const newGroupRef = firestore.collection("rooms").doc();

    try {
        await newGroupRef.set({
            name: newGroup.groupName,
            desc: newGroup.description
        })
    } catch (error) {
        console.log( "Error while creating a new group" ,error.message)
    }

    return newGroupRef
}

export const groupMessages = async (userAuth, groupMessage) => {
    if(!userAuth) return;
    if(!groupMessage) return;

    const messagesRef = firestore.doc(`messages/${groupMessage.groupId}/`);
    const messagesRefSnapshot = await messagesRef.get();

    if(!messagesRefSnapshot.exists) {
        try {
            await messagesRef.set({
                groupName: groupMessage.groupName,
                groupId: groupMessage.groupId
            })
        } catch (error) {
            console.log("error while sending the group name" ,error.message)
        }
    }

    const groupMessagesRef = await firestore.collection("messages").doc(groupMessage.groupId).collection("groupMessages").doc();

    const { displayName } = userAuth;
    const createdAt = new Date()
        try {
            await groupMessagesRef.set({
                sendBy: displayName,
                userId: userAuth.uid,
                createdAt,
                message: groupMessage.message
            })
        } catch (error) {
            console.log("error while setting the group messages", error.message)
        }
}

export const individualUserMessages = async (userAuth, individualmessages) => {
    if(!userAuth) return;
    if(!individualmessages) return;

    const messageRef = firestore.doc(`messages/${individualmessages.combineUserId}`);
    const messageRefSnapshot = await messageRef.get();
    
    if(!messageRefSnapshot.exists) {
        try {
            await messageRef.set({
                senderName: individualmessages.senderName,
                receiverName: individualmessages.receiverName
            })
        } catch (error) {
            console.log("Error while setting names for individual users", error.message)
        }
    }

    const individualMessageRef = await firestore.collection("messages").doc(individualmessages.combineUserId).collection("individualMessages").doc();

    const {displayName, uid} = userAuth;
    const createdAt = new Date();

        try {
            individualMessageRef.set({
                displayName,
                userId: uid,
                createdAt,
                message: individualmessages.message
            })
        } catch (error) {
            console.log("Error while sending individual message", error.message)
        }
    
    const chatsRef = firestore.doc(`chats/${userAuth.uid}/`);
    const chatsRefSnapshot = await chatsRef.get();

    if(!chatsRefSnapshot.exists) {
        try {
            await chatsRef.set({
                displayName
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    const chatsFriendsRef = firestore.doc(`chats/${userAuth.uid}/chatsFriends/${individualmessages.receiverId}`);
    const chatsFriendsRefSnapshot = await chatsFriendsRef.get();

    if(!chatsFriendsRefSnapshot.exists) {
        try {
            await chatsFriendsRef.set({
                id: individualmessages.receiverId,
                name: individualmessages.receiverName,
                createdAt
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    const chatsRecieverRef = firestore.doc(`chats/${individualmessages.receiverId}/`);
    const chatsRecieverRefSnapshot = await chatsRecieverRef.get();

    if(!chatsRecieverRefSnapshot.exists){
        try {
            await chatsRecieverRef.set({
                displayName: individualmessages.receiverName
            })
        } catch (error) {
            console.log(error.message)
        }
    }
    
    const chatsRecieverFriendRef = firestore.doc(`chats/${individualmessages.receiverId}/chatsFriends/${userAuth.uid}`);
    const chatsRecieverFriendRefSnapshot = await chatsRecieverFriendRef.get();

    if(!chatsRecieverFriendRefSnapshot.exists){
        try {
            await chatsRecieverFriendRef.set({
                id: userAuth.uid,
                name: displayName,
                createdAt
            })
        } catch (error) {
            console.log(error.message)
        }
    }
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;