import * as functions from "firebase-functions";
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

// exports.writeToFirestore = functions.firestore
//   .document('tests/lRJ5ACFaE8sFUA0RyVeh')
//   .onWrite((change, context) => {
//     const contestsRef = db.collection('pendingContests');
//     contestsRef.add({
//       expirationDate: 123123,
//       createdAt: 123123,
//     });
//     //db.doc('tests/8SagYk5CTcYctNlppQO2').set({test:'accessed'});
//   });


  exports.scheduledFunction = functions.pubsub.schedule('every 5 minutes')
  .onRun((context) => {
    console.log('This will be run every 5 minutes!');
    const pendingContestsRef = db.collection('pendingContests');
    pendingContestsRef.add({
      expirationDate: Date.now() + 8.64e7,
      createdAt: Date.now(),
    })
    return null;
  });

  exports.createContest = functions.https.onRequest((request, response) => {
    const contestsRef = db.collection('pendingContests');
      const result = contestsRef.add({
      expirationDate: request.body.test,
      createdAt: 123123,
        })
    response.send(result);
      });




// import * as functions from "firebase-functions";

// exports.scheduledFunction = functions.pubsub.schedule('every 2 minutes')
// .onRun((context) => {
//   async function test ():Promise<void>  {
// functions.firestore.document('contests/ZA6QG481d7aPIWvyamXx').onUpdate((change,context)=>{})
//   const mocks_images = ['a','b','c','d','e'];
//   const mocks_keywords = [
//     {
//       type: 'a',
//       word: 'b'
//     },{
//       type: 'a',
//       word: 'b'
//     },{
//       type: 'a',
//       word: 'b'
//     },{
//       type: 'a',
//       word: 'b'
//     },{
//       type: 'a',
//       word: 'b'
//     }
//   ]

//   await contestsRef.add({
//     expirationDate: 321,
//     createdAt: 123,
//     images: mocks_images,
//     keywords: mocks_keywords,
//     solutionPrompt: 'test'
//   });
//   console.log('Created new contest');
// };
// test()
//   return null;
