const functions = require('firebase-functions');
const { google } = require('googleapis');



const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
// TODO Return Promise

/*
Need Listener on link
//https://stackoverflow.com/questions/50299329/node-js-firebase-service-account-private-key-wont-parse
create events rather than figma files
*/
const CONFIG_PRIVATE_KEY_ID = functions.config().serviceaccount.private_key_id;
const CONFIG_PRIVATE_KEY = functions.config().serviceaccount.private_key.replace(/\\n/g, '\n');
const CONFIG_CLIENT_EMAIL = functions.config().serviceaccount.client_email;
const SHARED_FOLDER_ID = "1oqA_hVthtNjntFnDavFneTtorouDvlcN";
//let serviceAccount = require("./credentials.json");

const credentials = {
    "type": "service_account",
    "project_id": "remote-hq",
    "private_key_id": CONFIG_PRIVATE_KEY_ID,
    "private_key": CONFIG_PRIVATE_KEY,
    "client_email": CONFIG_CLIENT_EMAIL,
    "client_id": "107209589558037635867",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/main-account%40remote-hq.iam.gserviceaccount.com"
}

const mimeTypes = {
    "googleDoc": 'application/vnd.google-apps.document',
    "googleSheet": 'application/vnd.google-apps.spreadsheet',
    "googleSlides": 'application/vnd.google-apps.presentation'
}

const toURL = {
    "googleDoc": (id)=>`https://docs.google.com/document/d/${id}/edit`,
    "googleSheet": (id)=>`https://docs.google.com/spreadsheets/d/${id}/edit`,
    "googleSlides": (id)=>`https://docs.google.com/presentation/d/${id}/edit`
}

/*
On Create Team
*/
exports.createTeam = functions.firestore
    .document('teams/{teamId}')
    .onCreate((snap, context) => {
        let teamID = context.params.teamId;
        let data = snap.data();
        var fileMetadata = {
            'name': teamID,
            'mimeType': 'application/vnd.google-apps.folder',
            parents: [SHARED_FOLDER_ID],
        };
        google.auth.getClient({
            credentials,
            scopes: 'https://www.googleapis.com/auth/drive.file',
        }).then((client) => {
            let drive = google.drive({
                version: 'v3',
                auth: client,
            });
            drive.files.create({
                resource: fileMetadata,
                fields: 'id'
            }).then((res) => {

                console.log('Folder Id: ', res.data);
                const promises = []
                // now add permissions
                const userList = data.users;
                console.log(userList);
                userList.map((userData) => {
                    console.log(userData);
                    // In the below line, two things happen.
                    // 1. We are calling the async function (timeout()). So at this point the async function has started and enters the 'pending' state.
                    // 2. We are pushing the pending promise to an array.
                    promises.push(
                        new Promise((resolve, reject) => {
                            const userPermission = {
                                'type': 'user',
                                'role': 'writer',
                                'emailAddress': userData.email
                            };
                            drive.permissions.create({
                                resource: userPermission,
                                fileId: res.data.id,
                                fields: 'id',
                            }).then(() => resolve('Changed permissions')).catch((e) => reject('Failed permissions'));

                        })
                    );
                });
                Promise.all(promises);

            }).catch((e1) => { })

        });


    });





exports.createLink = functions.firestore
    .document('teams/{teamId}/{linksCollectionId}/{linkId}')
    .onCreate((snap, context) => {
        console.log(snap);
        console.log(context);
        let teamID = context.params.teamId;
        let linkID = context.params.linkId;
        let data = snap.data();
        /*
        First want to see what type of link it is
        */
       if(!data.type.includes("google")){return false;}
       const teamsPromise = new Promise((resolve, reject) => {
            db.doc(`teams/${teamID}`).get().then((teamData) => resolve(teamData.data().driveFolderID)).catch((e) => reject('Failed permissions'));
        });
        teamsPromise.then((val)=>{
            let name = data.name;
                var fileMetadata = {
                    name: name,
                    mimeType: mimeTypes[data.type],
                    parents: [val],
                };
                var media = { mimeType: 'text/plain', body: '', };
             
                google.auth.getClient({
                    credentials,
                    scopes: 'https://www.googleapis.com/auth/drive.file',
                }).then((client) => {
                    let drive = google.drive({
                        version: 'v3',
                        auth: client,
                    });
                    // create file
                    drive.files.create({
                        requestBody: fileMetadata,
                        media: media,
                    }).then((t) => {
                        console.log(t.data);
                        let fileID = t.data.id;
                        let ref = admin.firestore().collection("teams")
                            .doc(teamID).collection("links")
                            .doc(linkID);
                        console.log(ref);
                        ref.update({
                            "url": toURL[data.type](fileID)
                        }).then((t) => { }).catch((e) => { });
                    }).catch((e) => { console.log(e); });
                });
            });
               
    });
   