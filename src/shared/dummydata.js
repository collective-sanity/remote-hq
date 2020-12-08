const dummydata = {
    "users": {
        "uid1": {
            "username": "connor",
            "email": "conreshan@gmail.com",
            "displayName": "Connor Shannon",
            "photoUrl": "https://lh5.googleusercontent.com/-JQAFWa4C0iE/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucklRz2PpA4ZqvUEP2Bh6PDouB_hEA/s96-c/photo.jpg",
            "rooms": ["roomid1", "room2id"],
            "teams": ["teamid1", "teamid2", "teamid3", "teamid4"]
        },
        "uid2": {
            "username": "nathan",
            "displayName": "Nathan Jen",
            "email": "anonymousnathan@gmail.com",
            "photoUrl": "https://lh3.googleusercontent.com/a-/AOh14GhZFURtuuz-77wg8JU1PJuA-uqP0eKGMreiQLt9DA=s96-c",
            "rooms": ["roomid1"],
            "teams": ["teamid1"]
        },
        "uid3": {
            "username": "karthick",
            "displayName": "Karthick Shankar",
            "email": "karthicksh10@gmail.com",
            "rooms": ["roomid1", "roomid2"],
            "teams": ["teamid1"]
        },
        "uid4": {
            "username": "victor",
            "displayName": "Victor Grajski",
            "email": "victor.grajski@gmail.com",
            "rooms": ["roomid1", "roomid2"],
            "teams": ["teamid1"]
        }
    },

    "teams": {
        "teamid1": {
            "name": "SSUI Final Project",
            "host": "uid1",
            "driveFolderID":"",
            "users": [
                { "id": "uid1", "email": "conreshan@gmail.com" },
                { "id": "uid2", "email": "anonymousnathan@gmail.com" },
                { "id": "uid3", "email": "karthicksh10@gmail.com" },
                { "id": "uid4", "email": "victor.grajski@gmail.com" },
            ],
            "folders": {
                "folderid1": {
                    "name": "Chatbot",
                    "links": ["linkid1", "linkid2", "linkid3", "linkid4", "linkid5"]
                }
            },
            "links": {
                "linkid1": {
                    "linkType": "figma",
                    "name": "SSUI Project",
                    "description": "Figma for project",
                    "createdDate": "2020-011-03T07:22Z",
                    "lastModifiedDate": "2020-11-19T07:22Z",
                    "link": "https://www.figma.com/file/SLqyt8cQoYxRzY5XBoLOxN/SSUI-Project?node-id=42%3A2",
                    "connectedLinks": [],
                    "pinned": false
                },
                "linkid2": {
                    "linkType": "drive",
                    "name": "SSUI Project",
                    "description": "drive",
                    "createdDate": "2020-011-03T07:22Z",
                    "lastModifiedDate": "2020-11-19T07:22Z",
                    "link": "https://drive.google.com/drive/folders/1o42xhoveHJbLQN5FuGpFAcPVIUHP7bTq?usp=sharing",
                    "connectedLinks": ["linkid3"],
                    "pinned": true
                },
                "linkid3": {
                    "linkType": "googleDoc",
                    "name": "Proposal",
                    "description": "proposal",
                    "createdDate": "2020-011-03T07:22Z",
                    "lastModifiedDate": "2020-11-19T07:22Z",
                    "link": "https://docs.google.com/document/d/1QqmPSPdQtVxpHPOjabcbN3WaHFdbTPKBbwfVKuBSVWE/edit?usp=sharing",
                    "connectedLinks": ["linkid2", "linkid5", "linkid6"],
                    "pinned": false
                },
                "linkid4": {
                    "linkType": "googleDoc",
                    "name": "Proposal Notes",
                    "description": "",
                    "createdDate": "2020-011-03T07:22Z",
                    "lastModifiedDate": "2020-11-19T07:22Z",
                    "link": "https://docs.google.com/document/d/1AqYkYBaBsueyWFtj7IYqZLY3dQgvkVsBV7vnywYcF74/edit?usp=sharing",
                    "connectedLinks": ["linkid2"],
                    "pinned": false
                },
                "linkid5": {
                    "linkType": "resource",
                    "name": "Dialogflow",
                    "description": "",
                    "createdDate": "2020-011-03T07:22Z",
                    "lastModifiedDate": "2020-11-19T07:22Z",
                    "link": "https://cloud.google.com/dialogflow",
                    "connectedLinks": ["linkid3"],
                    "pinned": true
                },
            }
        },
        "teamid2": {
            "name": "PUI",
            "driveFolderID":"",
            "users": [{ "id": "uid1", "email": "conreshan@gmail.com" },
            { "id": "uid2", "email": "anonymousnathan@gmail.com" },]
        },
        "teamid3": {
            "name": "UCRE",
            "driveFolderID":"",
            "users": [{ "id": "uid1", "email": "conreshan@gmail.com" },
            { "id": "uid2", "email": "anonymousnathan@gmail.com" },],
            "links": {
                "linkid6": {
                    "linkType": "resource",
                    "description": "",
                    "name": "How to do paper prototyping, the UX tool you may be missing",
                    "createdDate": "2020-011-03T07:22Z",
                    "lastModifiedDate": "2020-11-19T07:22Z",
                    "link": "https://uxdesign.cc/how-to-do-paper-prototyping-719173215a7e",
                    "connectedLinks": ["linkid3"],
                    "pinned": false
                },
                "linkid7": {
                    "linkType": "resource",
                    "isPinned": true,
                    "name": "Final Projects Requirements",
                    "description": "",
                    "createdDate": "2020-011-03T07:22Z",
                    "lastModifiedDate": "2020-11-19T07:22Z",
                    "link": "https://www.cs.cmu.edu/~bam/uicourse/05631fall2020/FinalProject/index.html",
                    "pinned": false
                },
                "linkid8": {
                    "linkType": "resource",
                    "isPinned": true,
                    "name": "Firebase Project",
                    "description": "",
                    "createdDate": "2020-011-03T07:22Z",
                    "lastModifiedDate": "2020-11-19T07:22Z",
                    "link": "https://console.firebase.google.com/u/2/project/remote-hq/overview",
                    "pinned": false
                }
            }
        },
        "teamid4": {
            "name": "Pro Sem",
            "driveFolderID":"",
            "users": [
                { "id": "uid1", "email": "conreshan@gmail.com" },
                { "id": "uid2", "email": "anonymousnathan@gmail.com" },
            ],
            "folders": {
                "folderid1": {
                    "name": "Name"
                },
            },
            "links": {
                "links": {
                    "linkid6": {
                        "linkType": "resource",
                        "description": "",
                        "name": "How to do paper prototyping, the UX tool you may be missing",
                        "createdDate": "2020-011-03T07:22Z",
                        "lastModifiedDate": "2020-11-19T07:22Z",
                        "link": "https://uxdesign.cc/how-to-do-paper-prototyping-719173215a7e",
                        "connectedLinks": ["linkid3"],
                        "pinned": false
                    },
                    "linkid7": {
                        "linkType": "resource",
                        "isPinned": true,
                        "name": "Final Projects Requirements",
                        "description": "",
                        "createdDate": "2020-011-03T07:22Z",
                        "lastModifiedDate": "2020-11-19T07:22Z",
                        "link": "https://www.cs.cmu.edu/~bam/uicourse/05631fall2020/FinalProject/index.html",
                        "pinned": false
                    },
                    "linkid8": {
                        "linkType": "resource",
                        "isPinned": true,
                        "name": "Firebase Project",
                        "description": "",
                        "createdDate": "2020-011-03T07:22Z",
                        "lastModifiedDate": "2020-11-19T07:22Z",
                        "link": "https://console.firebase.google.com/u/2/project/remote-hq/overview",
                        "pinned": false
                    }
                }
            }
        },

    }

}


export default dummydata;