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
getUserRef
createNewUser
getUserData
updateUserData
getUsers


getTeamData
createTeam
updateTeam
deleteTeam

getFolderData
createFolder
updateFolder
deleteFolder
*/


// Team listener - will listen to any changes to the team doc itself
//           -- deleting/ changing name / changing users
// Folders Listener - will listen to any changes to all the folders docs in a team
//          --  deleting / changing name / adding/removing links
// Links Listener - will listen to any changes to all the links docs in a team
//          -- deleting / changing name / creating link / pinning/unpinning etc

/*

Team Listener

const teamRef = db.collection('teams').doc("teamid");
const teamListener = teamRef.onSnapshot(doc => {
  console.log(`Received query snapshot  ${querySnapshot.size}`);
  // ...
}, err => {
  console.log(`Encountered error: ${err}`);
});
const foldersListener = db.collection('teams').doc("teamid").collection("folders");
const teamListener = teamRef.onSnapshot(doc => {
  console.log(`Received query snapshot  ${querySnapshot.size}`);
  // ...
}, err => {
  console.log(`Encountered error: ${err}`);
});
const link= query.onSnapshot(querySnapshot => {
  console.log(`Received query snapshot of size ${querySnapshot.size}`);
  // ...
}, err => {
  console.log(`Encountered error: ${err}`);
});

*/




/*
USERS
*/
export function getUserRef(userId) { return db.collection("users").doc(userId); }
export function getTeamRef(teamId) { return db.collection("teams").doc(teamId) }
export function getFolderRef(teamId, folderId) { return db.collection("teams").doc(teamId).collection('folders').doc(folderId); }
export function getLinkRef(teamId, linkId) { return db.collection("teams").doc(teamId).collection('links').doc(linkId); }




/*
 USERS
*/

/*
function: [[createNewUser]]
    Updates the a document's data by passing in a map, if the attribute already exists, it is updated, and if it doesn't exist, it is created
    input -  googleUser(map) 
    output - new user data(map)
    ex.
    in -> googleUser
    out -> {
                "id"":"D3DkBBnNQqYR9ywYkEbD6palHvs2"
                "displayName": "Victor Grajski",
                "email": "victor.grajski@gmail.com",
                "photoUrl": "https://lh4.googleusercontent.com/--a9EEwJUMqs/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnhhK4Qs1f4CjYgYC2vJG18lFIKCw/s96-c/photo.jpg",
                "teams": ["N7GhVvDaR08YGKVQzc1l", "PHbymFO4SyTPMqcAxrk4", "DLSOGcR4k3igH1iXGYNT"],
                "createdAt": "December 6, 2020 at 7:51:48 PM UTC-5"
            },
*/

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


/*
function: [[getUserData]]
    input - userId
    output - userData
    ex.
    in ->D3DkBBnNQqYR9ywYkEbD6palHvs2
    out-> {
                "id"":"D3DkBBnNQqYR9ywYkEbD6palHvs2"
                "displayName": "Victor Grajski",
                "email": "victor.grajski@gmail.com",
                "photoUrl": "https://lh4.googleusercontent.com/--a9EEwJUMqs/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnhhK4Qs1f4CjYgYC2vJG18lFIKCw/s96-c/photo.jpg",
                "teams": ["N7GhVvDaR08YGKVQzc1l", "PHbymFO4SyTPMqcAxrk4", "DLSOGcR4k3igH1iXGYNT"],
                "createdAt": "December 6, 2020 at 7:51:48 PM UTC-5"
            }
*/
export async function getUserData(userId) {
    let res = await getUserRef(userId).get()
    return (res.exists) ? {...res.data(), "id":userId} : false;
}


/*
function: [[setUserData]]
    Creates a user document with a specific userID
    input - userId(String), data(map) 
    output - null
    ex.
    in -> (D3DkBBnNQqYR9ywYkEbD6palHvs2, 
            {teams: ["N7GhVvDaR08YGKVQzc1l", "PHbymFO4SyTPMqcAxrk4"],})

*/
async function setUserData(userId, data) {
    await getUserRef(userId).set(data);
}

/*
function: [[updateUserData]]
    Updates the a document's data by passing in a map, if the attribute already exists, it is updated, and if it doesn't exist, it is created
    input - userId(String), data(map) 
    output - null
    ex.
    in -> (D3DkBBnNQqYR9ywYkEbD6palHvs2, 
            {teams: ["N7GhVvDaR08YGKVQzc1l", "PHbymFO4SyTPMqcAxrk4"],})

*/
export async function updateUserData(userId, data) {
    await getUserRef(userId).update(data);
}


/*
function: [[getUsers]]
    gets all users
    input - none
    output - list of data of all users in the collection
    ex.
    in -> ()
    out -> [
        {
                "id"":"D3DkBBnNQqYR9ywYkEbD6palHvs2"
                "displayName": "Victor Grajski",
                "email": "victor.grajski@gmail.com",
                "photoUrl": "https://lh4.googleusercontent.com/--a9EEwJUMqs/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnhhK4Qs1f4CjYgYC2vJG18lFIKCw/s96-c/photo.jpg",
                "teams": ["N7GhVvDaR08YGKVQzc1l", "PHbymFO4SyTPMqcAxrk4", "DLSOGcR4k3igH1iXGYNT"],
                "createdAt": "December 6, 2020 at 7:51:48 PM UTC-5"
        },
         {
            "id":"0kjQ6Rjv60PdCfFuEUX4JvV2yoQ2"
            "displayName": "Karthick Shankar",
            "email": "karthicksh10@gmail.com",
            "photoUrl":"https://lh3.googleusercontent.com/a-/AOh14GgBzQVZDfGFNbSVO_QZ3Y4SvlG1mcsI6SLzqq3hYA=s96-c",
            "teams": ["D8BfrjnYTf8Xs9yrWlPl"],
            "createdAt": "December 6, 2020 at 7:51:48 PM UTC-5"
        },

    ]
*/
export async function getUsers() {
    let res = await db.collection("users").get()
    let users = [];
    res.docs.forEach(doc => {
        users.push({...doc.data(), "id":doc.id});
    });
    return users;
}





/*

TEAMS

*/

/*
function: [[getTeamData]]
    gets team data
    input - teamId(String)
    output - teamData
    
    ex. Getting a team
    in -> (9Jj6S15O8ydfqkioZndc)
    out->  {
            "id": "9Jj6S15O8ydfqkioZndc",
            "name": "SSUI Final Project",
            "host": "D3DkBBnNQqYR9ywYkEbD6palHvs2",
            "driveFolderID":"1oSOBN4eBn3RLfAgxkv9y8p4dHLaHMAvP",
            "users": [
                { "id": "D3DkBBnNQqYR9ywYkEbD6palHvs2", "email": "victor.grajski@gmail.com" },
                { "id": "0kjQ6Rjv60PdCfFuEUX4JvV2yoQ2", "email": "karthicksh10@gmail.com", },
            ],
        },
*/
export async function getTeamData(teamId) {
    let res = await getTeamRef(teamId).get()
    return (res.exists) ? {...res.data(), "id":teamId}: false;
}


/*
function: [[createTeam]]
    creates a new Team and update's the user's firebase data to add it to their "teams" list
    input - name(String), userId
    output - teamData
    
    ex. 
    in -> ("TestTeam", "D3DkBBnNQqYR9ywYkEbD6palHvs2" )
    out-> {
            "id":"296ReqaQki50z4m7HRwl",
            "name": "TestTeam",
            "host": "D3DkBBnNQqYR9ywYkEbD6palHvs2",
            "driveFolderID":"1oSOBN4eBn3RLfAgxkv9y8p4dHLaHMAvP",
            "users": [
                { "id": "D3DkBBnNQqYR9ywYkEbD6palHvs2", "email": "victor.grajski@gmail.com" },
                 { "id": "0kjQ6Rjv60PdCfFuEUX4JvV2yoQ2", "email": "karthicksh10@gmail.com", },
            ],
        },
*/
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
    return {...res, "id":res.id};
}


/*
function: [[updateTeam]]
    updates a Team 
    input -  teamId, data(map)
    output - null
    ex. Adding a new member to a team
    in -> ("296ReqaQki50z4m7HRwl", {"users": [
                { "id": "D3DkBBnNQqYR9ywYkEbD6palHvs2", "email": "victor.grajski@gmail.com" },
            ],} )
    out-> null
*/
export async function updateTeam(teamId, data) {
    await getTeamRef(teamId).update(data);
}



/*
function: [[deleteTeam]]
    if user is host, it deletes team and removes it from everyone's list, 
    else it removes team from individual users list
    
    input -  teamId, userId
    output - null
    ex. deleting team
    in -> ("296ReqaQki50z4m7HRwl", "pR6gztaQjRyAduMynrPA")
    out-> null
*/
export async function deleteTeam(teamId, userId) {
    
    let teamData = await getTeamData(teamId);

    if (userId === teamData.host) {
    //let promises =[];
        for (const teamUserData of teamData.users) {
            let userData= await getUserData(teamUserData.id);
            await updateUserData(teamUserData.id, {"teams": userData.teams.filter(team => team !== teamId)});
        }
        await _deleteTeamSubcollections(teamId);
        await getTeamRef(teamId).delete();
    } 
    else{
        let userData= await getUserData(userId);
        await updateUserData(userId, {"teams": userData.teams.filter(team => team !== teamId)});
    }
    
   return null;

}



async function _deleteTeamSubcollections(teamId) {

    await getTeamRef(teamId).collection("folders").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            doc.ref.delete();
        });
    });
    await getTeamRef(teamId).collection("links").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            doc.ref.delete();
        });
    });
    return;
}


/*

Folders

*/



/*
function: [[getFolderData]]
    gets link data
    input -  teamId, folderId
    output - null
    ex. 
    in -> ("BF8zK1dN8W3ShXaXcQyH", "296ReqaQki50z4m7HRwl")
    out -> {
        {
            "id":"296ReqaQki50z4m7HRwl",
            "teamId":"BF8zK1dN8W3ShXaXcQyH"
            "name": "Chatbot",
            "links": ["5YttJMBlL6vmiakDFu9p"]
         
        },
    }
*/
export async function getFolderData(teamId, folderId) {
    let res = await getFolderRef(teamId, folderId).get()
    return (res.exists) ? {...res.data(), "id":res.id, "teamId":teamId} : false;
}



/*
function: [[createFolder]]
    creates a folder

    input -  teamId, 
             name,
             links =[]
    output - linkData
    ex. 
    in -> ("BF8zK1dN8W3ShXaXcQyH","ChatBot" )
    out -> 
         {
            "id": "296ReqaQki50z4m7HRwl",
            "teamId": "BF8zK1dN8W3ShXaXcQyH",
            "name": "Chatbot",
            "links": []
        }
    
*/
export async function createFolder(teamId, name, links=[]) {
    let res = await getTeamRef(teamId).collection('folders').add({
        "name":name,
        "links":links,
        "pinned":false,
    });
    return (res.exists) ? {...res.data(), "id":res.id, "teamId":teamId} : false;
}

/*
function: [[updateFolder]]
    updates a Folder
    input -  teamId, folderId, data(map)
    output - null
    ex. updating link
    in -> ("296ReqaQki50z4m7HRwl", {
        "links": [
                "5YttJMBlL6vmiakDFu9p",
                "BF8zK1dN8W3ShXaXcQyH",
            ]}, )
    out-> null
*/
export async function updateFolder(teamId, folderId, data) {
  return await getFolderRef(teamId, folderId).update(data);
        
}


/*
function: [[deleteFolder]]
    deletes a folder

    input -  teamId, folderId
    output - null
    ex. 
    in -> ("BF8zK1dN8W3ShXaXcQyH", "5YttJMBlL6vmiakDFu9p")
    out -> 
*/
// TODO delete links within folder
export async function deleteFolder(teamId, folderId) {
    await getFolderRef(teamId, folderId).delete();
}



/*

LINKS

*/

/*
function: [[getLinkData]]
    gets link data
    input -  teamId, linkId
    output - null
    ex. 
    in -> ("BF8zK1dN8W3ShXaXcQyH", "296ReqaQki50z4m7HRwl")
    out -> {
        {
            "id":"296ReqaQki50z4m7HRwl",
            "teamId":"BF8zK1dN8W3ShXaXcQyH"
            "linkType": "figma",
            "name": "SSUI Project",
            "createdDate": "2020-011-03T07:22Z",
            "link": "https://www.figma.com/file/SLqyt8cQoYxRzY5XBoLOxN/SSUI-Project?node-id=42%3A2",
            "pinned": false
        },
    }
*/
export async function getLinkData(teamId, linkId) {
    let res = await getLinkRef(teamId,linkId).get()
    return (res.exists) ? {...res.data(), "id":linkId, "teamId":teamId} : false;
}


/*
function: [[createLink]]
    creates link and updates folder to add it to folder

    input -  teamId, 
             folderId, 
             linktype - [figma, resource, googleDoc, googleSheet, googleSlide], 
             name, 
             url - undefined if is googleDoc/Sheet/slide since it gets generated on the back end

    output - linkData
    ex. 
    in -> ("BF8zK1dN8W3ShXaXcQyH", "5YttJMBlL6vmiakDFu9p", "figma", "Our File",""https://www.figma.com/file/SLqyt8cQoYxRzY5XBoLOxN/SSUI-Project?node-id=42%3A2"" )
    out -> {
        {
            "id":"296ReqaQki50z4m7HRwl",
            "folderId":"BF8zK1dN8W3ShXaXcQyH"
            "teamId":"BF8zK1dN8W3ShXaXcQyH"
            "linkType": "figma",
            "name": "Our File",
            "createdDate": "2020-011-03T07:22Z",
            "link": "https://www.figma.com/file/SLqyt8cQoYxRzY5XBoLOxN/SSUI-Project?node-id=42%3A2",
            "pinned": false
        },
    }
*/
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
        let folderData = await getFolderData(teamId, folderId);
        let linkRes = await getTeamRef(teamId).collection('links').add(linkData);
        console.log(linkRes);
        await updateFolder(teamId, folderId, { "links": [...folderData.links, linkRes.id] })
        return {...linkData, "id":linkRes.id, "teamId":teamId, "folderId":folderId};
    }

}

/*
function: [[updateTeam]]
    updates a Team 
    input -  teamId, data(map)
    output - null
    ex. Adding a new member to a team
    in -> ("296ReqaQki50z4m7HRwl", {
        "users": [
            { 
                    "id": "D3DkBBnNQqYR9ywYkEbD6palHvs2", 
                "email": "victor.grajski@gmail.com" 
            },
            ],
        } 
    )
    out-> null
*/
export async function updateLink(teamId, linkId, data) {
    await getLinkRef(teamId, linkId).update(data);
}



/*
function: [[deleteLink]]
    deletes link and removes it's id from the the folder list
    
    input -  teamId, userId, linkId
    output - null
    ex. deleting link
    in -> ("296ReqaQki50z4m7HRwl", "pR6gztaQjRyAduMynrPA")
    out-> null
*/
export async function deleteLink(teamId, folderId, linkId) {
    await getLinkRef(teamId, linkId).delete();
    let res = await getFolderData(teamId, folderId);
    let links = res.links;
    let index = links.indexOf(linkId);
    links.splice(index, 1);
    await updateFolder(teamId, folderId,{ "links": links });
}


