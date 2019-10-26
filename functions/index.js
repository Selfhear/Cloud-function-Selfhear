const functions = require('firebase-functions');
const firebaseAdmin = require('firebase-admin');
firebaseAdmin.initializeApp(functions.config().firebase)
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
//alias firebase="`npm config get prefix`/bin/firebase"
//firebase deploy --only functions
const DataGainCol=firebaseAdmin.firestore().collection('DataGain')
const TDataGainCol=firebaseAdmin.firestore().collection('TestDataGain')
var db = firebaseAdmin.firestore()

exports.TCalMeann = functions.firestore.document('TestDataGain/{documentId}').onCreate((request, response) => {
    return new Promise(resolve => {
       TDataGainCol.doc('Meann').get().then(c=>{
           if (c.exists) {
               let oldco = c.data().countt
               TDataGainCol.doc('Meann').update({countt: oldco+1,
                   g1: ((oldco*(c.data().g1))+request.data().g1)/(oldco+1),
                   g2: ((oldco*(c.data().g2))+request.data().g2)/(oldco+1),
                   g3: ((oldco*(c.data().g3))+request.data().g3)/(oldco+1),
                   g4: ((oldco*(c.data().g4))+request.data().g4)/(oldco+1),
                   g5: ((oldco*(c.data().g5))+request.data().g5)/(oldco+1)
               })
           }
           //console.log("bere1")
           return
       }).catch(error => {
           console.error(error);
           res.error(500);
           //console.log("botcatch")
       });
       //console.log("bere2")
       //res.send(200)
       return
    })
   });

exports.CalMeann = functions.firestore.document('DataGain/{documentId}').onCreate((request, response) => {
 return new Promise(resolve => {
    DataGainCol.doc('Meann').get().then(c=>{
        if (c.exists) {
            let oldco = c.data().countt
            DataGainCol.doc('Meann').update({countt: oldco+1,
                g1: ((oldco*(c.data().g1))+request.data().g1)/(oldco+1),
                g2: ((oldco*(c.data().g2))+request.data().g2)/(oldco+1),
                g3: ((oldco*(c.data().g3))+request.data().g3)/(oldco+1),
                g4: ((oldco*(c.data().g4))+request.data().g4)/(oldco+1),
                g5: ((oldco*(c.data().g5))+request.data().g5)/(oldco+1)
            })
        }
        //console.log("bere1")
        return
    }).catch(error => {
        console.error(error);
        res.error(500);
        //console.log("botcatch")
    });
    //console.log("bere2")
    //res.send(200)
    return
 })
});

exports.helloWorld = functions.https.onRequest((req, res) => {
    res.status(200).send('Hello, World!');
  });

exports.showMean = functions.https.onRequest((req, res) => {
    DataGainCol.doc('Meann').get().then(c=>{
        if (c.exists) {
            let event=c.data()

                            res.send(`
                            <!doctype html>
                            <html>
                                <head>
                                    <title>Selfhear Mean</title>
                                </head>
                                <body>
                                    <p>g1 = ${event.g1}
                                    <br>g2 = ${event.g2}
                                    <br>g3 = ${event.g3}
                                    <br>g4 = ${event.g4}
                                    <br>g5 = ${event.g5}
                                    <br><br>
                                    Count = ${event.countt}</p>
                                </body>
                            </html>`
                            );

        } else {
            res.send(null)
        }
        return
    }).catch(error => {
        console.error(error);
        res.error(500);
    });
});

exports.TshowMean = functions.https.onRequest((req, res) => {
    TDataGainCol.doc('Meann').get().then(c=>{
        if (c.exists) {
            let event=c.data()

                            res.send(`
                            <!doctype html>
                            <html>
                                <head>
                                    <title>Selfhear Test Mean</title>
                                </head>
                                <body>
                                    <p>g1 = ${event.g1}
                                    <br>g2 = ${event.g2}
                                    <br>g3 = ${event.g3}
                                    <br>g4 = ${event.g4}
                                    <br>g5 = ${event.g5}
                                    <br><br>
                                    Count = ${event.countt}</p>
                                </body>
                            </html>`
                            );

        } else {
            res.send(null)
        }
        return
    }).catch(error => {
        console.error(error);
        res.error(500);
    });
});
