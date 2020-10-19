import React,{ createContext, useState, useEffect } from 'react'

import { auth, createUserProfileDocument, firestore } from "../firebase/firebase.utils"


export const MainContext = createContext();

const MainContextProvider = (props) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [headerDisplay, setHeaderDisplay] = useState(true);

    const [chatMessage, setChatMessage] = useState("")
    const [chatList, setChatList] = useState([]);

    const [groupsContent, setGroupsContent] = useState([]);
    const [groupID, setGroupID] = useState(null);

    const [createGroup, setCreateGroup] = useState({
        groupName: "",
        description: ""
    });

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
            setGroupsContent(docArray)
        })
    },[createGroup])

    useEffect(() => {
        let unsubscribe;
        if(groupID){
            unsubscribe = firestore.collection("messages").doc(groupID).collection("groupMessages")
                            .orderBy("createdAt").onSnapshot(async querySnapshot => {
                let docArray = [];
                await querySnapshot.forEach(doc => {
                    docArray.push({ id: doc.id, message: doc.data().message, time: doc.data().createdAt.toDate().getHours() + ":" + doc.data().createdAt.toDate().getMinutes(), sendBy: doc.data().sendBy.split(" ")[0] })
                })
                setChatList(docArray)
            })
        }
        if(!unsubscribe) return;
        return () => unsubscribe()
    }, [groupID])

    const getGroupId = (id) => {
        return groupsContent.filter(group => group.id === id)
    }

    const objectsToArray = (dataForObjects) => {
        return Object.keys(dataForObjects).map(key => dataForObjects[key])
    };

    return (
        <MainContext.Provider value={{ currentUser,headerDisplay, setHeaderDisplay, 
            groupsContent,chatMessage, setChatMessage,chatList, setChatList,createGroup, setCreateGroup, getGroupId
            ,groupID, setGroupID }}>
            {props.children}
        </MainContext.Provider>
    )
}

export default MainContextProvider