// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
}

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export const provider = new firebase.auth.GoogleAuthProvider();

/*
USERS
*/
export function getUserRef(userId) { return db.collection("users").doc(userId); }
export function getTeamRef(teamId) { return db.collection("teams").doc(teamId) }
export function getFolderRef(teamId, folderId) { return db.collection("teams").doc(teamId).collection('folders').doc(folderId); }
export function getLinkRef(teamId, linkId) { return db.collection("teams").doc(teamId).collection('links').doc(linkId); }

export async function getUserData(userId) {
    let res = await getUserRef(userId).get()
    return (res.exists) ? res.data() : false;
}

export async function setUserData(userId, data) {
    await getUserRef(userId).set(data);
}
export async function updateUserData(userId, data) {
    await getUserRef(userId).update(data);
}
export async function getUsers() {
    let res = await db.collection("users").get()
    let users = [];
    res.docs.forEach(doc => {
        users.push(doc.data());
    });
    return users;
}

export async function createNewUser(result) {
    let data = {
        "id": result.user.uid,
        "displayName": result.user.displayName,
        "photoUrl": result.user.photoURL,
        "email": result.user.email,
        "createdAt": firebase.firestore.FieldValue.serverTimestamp(),
        "teams": [],
    };
    await setUserData(result.user.uid, data);
    return data;
}




export async function getTeamData(teamId) {
    let res = await getTeamRef(teamId).get()
    return (res.exists) ? res.data() : false;
}
export async function createTeam(name, userId) {
    const teamData = {
        "name": name,
        "host": userId,
        "users": [{ id: userId }],
        "folders": [],
        "links": [],
        "screens": [],
        "createdAt": firebase.firestore.FieldValue.serverTimestamp(),
    };
    // Add team
    let res = await db.collection("teams").add(teamData);
    let userData = await getUserData(userId);
    updateUserData(userId, { teams: [...userData.teams, res.id] });
    return res;
}

export async function updateTeam(teamId, data) {
    await getTeamRef(teamId).update( data);
}

export async function deleteTeam(teamId, userId) {
    await getTeamRef(teamId).delete();
    let userData= await getUserData(userId);
   return await updateUserData(userId, {"teams": userData.teams.filter(team => team !== teamId)});

}

export async function getLinkData(teamId, linkId) {
    let res = await getLinkRef(teamId,linkId).get()
    return (res.exists) ? res.data() : false;
}

export async function createLink(teamId, folderId, linktype, name, url) {
   if(url===undefined)url = "";
    const linkData = {
        "linkType": linktype,
        "name": name,
        "pinned": false,
        "createdDate": firebase.firestore.FieldValue.serverTimestamp(),
        "url": url,
    };

    if ( linktype === "figma" || linktype === "resource" || linktype.includes("google")) {
        let folder = await getFolderData(teamId, folderId);
        let linkRes = await getTeamRef(teamId).collection('links').add(linkData);
        await updateFolder(teamId, folderId, { "links": [...folder.links, linkRes.id] })
        return linkRes;
    }

}


export async function updateLink(teamId, linkId, data) {
    await getLinkRef(teamId, linkId).update( data);
}

export async function deleteLink(teamId, folderId, linkId) {
    await getLinkRef(teamId, linkId).delete();
    let res = await getFolderData(teamId, folderId);
    let links = res.links;
    let index = links.indexOf(linkId);
    links.splice(index, 1);
    await updateFolder(teamId, folderId,{ links: links });
   
}


export async function getFolderData(teamId, folderId) {
    let res = await getFolderRef(teamId, folderId).get()
    return (res.exists) ? res.data() : false;
}

export async function createFolder(teamId, data) {
    return await getTeamRef(teamId).collection('folders').add(data);
}

export async function updateFolder(teamId, folderId, data) {
  return await getFolderRef(teamId, folderId).update(data);
        
}
export async function deleteFolder(teamId, folderId) {
    await getFolderRef(teamId, folderId).delete();
}

