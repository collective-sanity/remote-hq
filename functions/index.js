const functions = require('firebase-functions');
const { google } = require('googleapis');



const admin = require('firebase-admin');
admin.initializeApp();

//const db = admin.firestore();

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

/*
On Create Link
*/

exports.createLink = functions.firestore
    .document('rooms/{roomId}/{linksCollectionId}/{linkId}')
    .onCreate((snap, context) => {
        let teamID = context.params.userId;
        let roomID = context.params.roomId;
        let linkID = context.params.linkId;
        let data = snap.data();

        /*
        First want to see what type of link it is
        */
        if (data.type === "googleDoc") {
            // If type is google doc, create metadata
            let name = data.name;
            var fileMetadata = {
                name: name,
                mimeType: 'application/vnd.google-apps.document',
                parents: [SHARED_FOLDER_ID],
            };
            var media = {
                mimeType: 'text/plain',
                body: '',
            };
            // authenticate google client
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
                    //
                    console.log(t.data);
                    let fileID = t.data.id;
                   // let f = functions.firestore.document(`teams/${teamID}/rooms/${roomID}/links/${linkID}`);
                    let ref = admin.firestore().collection("teams")
                                    .doc(teamID).collection("rooms")
                                    .doc(roomID).collection("links")
                                    .doc(linkID);
                    console.log(ref);
                    ref.update({
                        "url":fileID
                    }).then((t)=>{}).catch((e)=>{});
                }).catch((e) => {
                    console.log(e);
                });
            });
        }
        else if (data.type === "figma") {

        }
    });


    //  //