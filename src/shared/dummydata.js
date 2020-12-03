




export const dummydata = {
    "users": {
        "uid1": {
            "username": "connor",
            "email": "conreshan@gmail.com",
            "displayName": "Connor Shannon",
            "photoUrl":"https://lh5.googleusercontent.com/-JQAFWa4C0iE/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucklRz2PpA4ZqvUEP2Bh6PDouB_hEA/s96-c/photo.jpg",
            "rooms": ["roomid1", "room2id"],

        },
        "uid2": {
            "username": "nathan",
            "displayName": "Nathan Jen",
            "email": "anonymousnathan@gmail.com",
            "photoUrl":"https://lh3.googleusercontent.com/a-/AOh14GhZFURtuuz-77wg8JU1PJuA-uqP0eKGMreiQLt9DA=s96-c",
            "rooms": ["roomid1"]
        },
        "uid3": {
            "username": "karthick",
            "displayName": "Karthick Shankar",
            "email": "karthicksh10@gmail.com",
            "rooms": ["roomid1", "roomid2"]
        },
        "uid4": {
            "username": "victor",
            "displayName": "Victor Grajski",
            "email": "victor.grajski@gmail.com",
            "rooms": ["roomid1", "roomid2"]
        }
    },
    "teams": {
        "MHCI": {
            "id": "MHCI",
            "name": "MHCI",
            "users": [
                { "userid": "uid1", "userName": "connor", },
                { "userid": "uid2", "userName": "connor", },
                { "userid": "uid3", "userName": "connor", },
                { "userid": "uid4", "userName": "connor", }
            ],
            "rooms": {
                "roomid1": {
                    "name": "SSUI Final Project",
                    "host": "uid1",
                    "users": [
                        { "userid": "uid1", "userName": "connor", "isActive": false, },
                        { "userid": "uid2", "userName": "connor", "isActive": false, },
                        { "userid": "uid3", "userName": "connor", "isActive": false, },
                        { "userid": "uid4", "userName": "connor", "isActive": false, }
                    ],
                    "folders": {
                        "folderid1": {
                            "name": "Chatbot",
                            "links": []
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
                            "connectedLinks": []
                        },
                        "linkid2": {
                            "linkType": "drive",
                            "name": "SSUI Project",
                            "description": "drive",
                            "createdDate": "2020-011-03T07:22Z",
                            "lastModifiedDate": "2020-11-19T07:22Z",
                            "link": "https://drive.google.com/drive/folders/1o42xhoveHJbLQN5FuGpFAcPVIUHP7bTq?usp=sharing",
                            "connectedLinks": ["linkid3"]
                        },
                        "linkid3": {
                            "linkType": "googledoc",
                            "name": "Proposal",
                            "description": "proposal",
                            "createdDate": "2020-011-03T07:22Z",
                            "lastModifiedDate": "2020-11-19T07:22Z",
                            "link": "https://docs.google.com/document/d/1QqmPSPdQtVxpHPOjabcbN3WaHFdbTPKBbwfVKuBSVWE/edit?usp=sharing",
                            "connectedLinks": ["linkid2", "linkid5", "linkid6"]
                        },
                        "linkid4": {
                            "linkType": "googledoc",
                            "name": "Proposal Notes",
                            "description": "",
                            "createdDate": "2020-011-03T07:22Z",
                            "lastModifiedDate": "2020-11-19T07:22Z",
                            "link": "https://docs.google.com/document/d/1AqYkYBaBsueyWFtj7IYqZLY3dQgvkVsBV7vnywYcF74/edit?usp=sharing",
                            "connectedLinks": ["linkid2"]
                        },
                        "linkid5": {
                            "linkType": "resource",
                            "name": "Dialogflow",
                            "description": "",
                            "createdDate": "2020-011-03T07:22Z",
                            "lastModifiedDate": "2020-11-19T07:22Z",
                            "link": "https://cloud.google.com/dialogflow",
                            "connectedLinks": ["linkid3"]
                        },
                        "linkid6": {
                            "linkType": "resource",
                            "description": "",
                            "name": "How to do paper prototyping, the UX tool you may be missing",
                            "createdDate": "2020-011-03T07:22Z",
                            "lastModifiedDate": "2020-11-19T07:22Z",
                            "link": "https://uxdesign.cc/how-to-do-paper-prototyping-719173215a7e",
                            "connectedLinks": ["linkid3"]
                        },
                        "linkid7": {
                            "linkType": "resource",
                            "isPinned": true,
                            "name": "Final Projects Requirements",
                            "description": "",
                            "createdDate": "2020-011-03T07:22Z",
                            "lastModifiedDate": "2020-11-19T07:22Z",
                            "link": "https://www.cs.cmu.edu/~bam/uicourse/05631fall2020/FinalProject/index.html"
                        },
                        "linkid8": {
                            "linkType": "resource",
                            "isPinned": true,
                            "name": "Firebase Project",
                            "description": "",
                            "createdDate": "2020-011-03T07:22Z",
                            "lastModifiedDate": "2020-11-19T07:22Z",
                            "link": "https://console.firebase.google.com/u/2/project/remote-hq/overview"
                        }
                    }
                },
                "roomid2": {
                    "name": "PUI",
                    "users": [
                        {
                            "userid": "uid1",
                            "userName": "connor",
                            "isActive": false
                        }
                    ]
                },

            }

        },
    
    "Work": {
            "id": "Work",
            "name": "Work",
            "users": [
                { "userid": "uid1", "userName": "connor", },
                { "userid": "uid2", "userName": "connor", },
            ],
            "rooms": {
                "roomid1": {
                    "name": "SSUI Final Project",
                    "host": "uid1",
                    "users": [
                        { "userid": "uid1", "userName": "connor", "isActive": false, },
                        { "userid": "uid2", "userName": "connor", "isActive": false, },
                        { "userid": "uid3", "userName": "connor", "isActive": false, },
                        { "userid": "uid4", "userName": "connor", "isActive": false, }
                    ],
                    "folders": {
                        "folderid1": {
                            "name": "Chatbot",
                            "links": []
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
                            "connectedLinks": []
                        },
                        "linkid2": {
                            "linkType": "drive",
                            "name": "SSUI Project",
                            "description": "drive",
                            "createdDate": "2020-011-03T07:22Z",
                            "lastModifiedDate": "2020-11-19T07:22Z",
                            "link": "https://drive.google.com/drive/folders/1o42xhoveHJbLQN5FuGpFAcPVIUHP7bTq?usp=sharing",
                            "connectedLinks": ["linkid3"]
                        },
                        "linkid3": {
                            "linkType": "googledoc",
                            "name": "Proposal",
                            "description": "proposal",
                            "createdDate": "2020-011-03T07:22Z",
                            "lastModifiedDate": "2020-11-19T07:22Z",
                            "link": "https://docs.google.com/document/d/1QqmPSPdQtVxpHPOjabcbN3WaHFdbTPKBbwfVKuBSVWE/edit?usp=sharing",
                            "connectedLinks": ["linkid2", "linkid5"]
                        },
                        "linkid4": {
                            "linkType": "googledoc",
                            "name": "Proposal Notes",
                            "description": "",
                            "createdDate": "2020-011-03T07:22Z",
                            "lastModifiedDate": "2020-11-19T07:22Z",
                            "link": "https://docs.google.com/document/d/1AqYkYBaBsueyWFtj7IYqZLY3dQgvkVsBV7vnywYcF74/edit?usp=sharing",
                            "connectedLinks": ["linkid2"]
                        },
                        "linkid5": {
                            "linkType": "resource",
                            "name": "Dialogflow",
                            "description": "",
                            "createdDate": "2020-011-03T07:22Z",
                            "lastModifiedDate": "2020-11-19T07:22Z",
                            "link": "https://cloud.google.com/dialogflow",
                            "connectedLinks": ["linkid3"]
                        },

                    }
                },

            }

        }
    }
}


