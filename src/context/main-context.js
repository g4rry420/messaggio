import React,{ createContext, useState, useEffect } from 'react'

import { auth, createUserProfileDocument, firestore } from "../firebase/firebase.utils"


export const MainContext = createContext();

const MainContextProvider = (props) => {

    const [currentUser, setCurrentUser] = useState(null);

    const [groupChatMessage, setGroupChatMessage] = useState("")
    const [groupChatList, setGroupChatList] = useState([]);

    const [individualChatList, setIndividualChatList] = useState([]);
    const [individualChatMessage, setIndividualChatMessage] = useState("");
    const [combineUserId, setCombineUserId] = useState(null);

    const [groupsList, setGroupsList] = useState([]);
    const [groupID, setGroupID] = useState(null);

    const [createGroup, setCreateGroup] = useState({
        groupName: "",
        description: ""
    });

    const [chatsList, setChatsList] = useState([]);

    useEffect(() => {
        const unsubcribe = auth.onAuthStateChanged(async userAuth => {
            if(userAuth) {
                const userRef = await createUserProfileDocument(userAuth);
 
                userRef.onSnapshot(snapshot => {
                    setCurrentUser({
                        uid: snapshot.id,
                        ...snapshot.data()
                    })
                })
            }
            setCurrentUser(userAuth);
        })

        return () => {
            unsubcribe();
        }
    },[])

    useEffect(() => {
        const groupsContentRef = firestore.collection("rooms");
        groupsContentRef.get().then(async querySnapshot => {
            let docArray = [];
            await querySnapshot.forEach(doc => {
                docArray.push({id:doc.id, title: doc.data().name, desc: doc.data().desc})
            })
            setGroupsList(docArray)
        })
    },[createGroup])

    useEffect(() => {
        let unsubscribe;
        if(groupID){
            unsubscribe = firestore.collection("messages").doc(groupID).collection("groupMessages")
                            .orderBy("createdAt").onSnapshot(async querySnapshot => {
                let docArray = [];
                await querySnapshot.forEach(doc => {
                    docArray.push({ id: doc.id, message: doc.data().message, time: doc.data().createdAt.toDate().getHours() + ":" + doc.data().createdAt.toDate().getMinutes(), sendBy: doc.data().sendBy, userId: doc.data().userId })
                })
                setGroupChatList(docArray)
            })
        }
        if(!unsubscribe) return;
        return () => unsubscribe()
    }, [groupID])

    useEffect(() => {
        let unsubscribe;
        if(combineUserId){
            unsubscribe = firestore.collection("messages").doc(combineUserId).collection("individualMessages")
                            .orderBy("createdAt").onSnapshot(async querySnapshot => {
                                let docArray = [];
                                await querySnapshot.forEach(doc => {
                                    docArray.push({ id: doc.id, message: doc.data().message,  time: doc.data().createdAt.toDate().getHours() + ":" + doc.data().createdAt.toDate().getMinutes(), sendBy: doc.data().displayName, userId: doc.data().userId })
                                })
                                setIndividualChatList(docArray);
                            })
        }

        if(!unsubscribe) return;
        return () => unsubscribe();

    },[combineUserId])

    useEffect(() => {
        if(!currentUser) return
        let unsubscribe = firestore.collection("chats").doc(currentUser.uid).collection("chatsFriends")
                      .orderBy("createdAt").onSnapshot(async querySnapshot => {
                          let docArray = [];
                          await querySnapshot.forEach(doc => {
                              docArray.push({ id: doc.id, name: doc.data().name })
                          })
                          setChatsList(docArray);
                      })

        return () => unsubscribe();              
    },[currentUser])

    return (
        <MainContext.Provider value={{ currentUser, groupsList, setGroupsList,groupChatMessage, setGroupChatMessage,
            groupChatList, setGroupChatList,createGroup, setCreateGroup, groupID, setGroupID,
            individualChatList, setIndividualChatList,individualChatMessage, setIndividualChatMessage
            ,combineUserId, setCombineUserId, chatsList, setChatsList }}>
            {props.children}
        </MainContext.Provider>
    )
}

export default MainContextProvider