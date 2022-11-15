import { randomWordAPI } from './randomWordAPI'
import firebase from 'firebase/compat/app';
import { firestore } from './fireBaseInit'


export const createNewContest1 = async (props) => {
  const contestsRef = firestore.collection('contests');
    let rand2Words = await randomWordAPI()
    let rand2WordsFlat = rand2Words.flat()
    console.log(rand2WordsFlat);
    await contestsRef.add({
      random2Words: rand2WordsFlat,
      // expiration date: in 3 hours
      // expirationDate: firebase.firestore.Timestamp.now().toMillis() + 1.08e+7,
      // expiration date in: 5 minutes
      expirationDate: firebase.firestore.Timestamp.now().toMillis() + 6000000,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      // id: firebase.firestore.DocumentReference()
    })
    console.log('new contest created successfully!')
    window.location.reload(false);
}

/* export const createNewContest2 = async (time) => {
  console.log(time)
  const contestsRef = firestore.collection('contests');
  if (time.length && time < 0) {
    let rand3Words = await randomWordAPI()
    let rand3WordsFlat = rand3Words.flat()
    console.log(rand3WordsFlat);
    await contestsRef.add({
      random3Words: rand3WordsFlat,
      // expiration date: in 3 hours
      // expirationDate: firebase.firestore.Timestamp.now().toMillis() + 1.08e+7,
      // expiration date in: 10 minutes
      expirationDate: firebase.firestore.Timestamp.now().toMillis() + 600000,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    console.log('new contest created successfully!')
  } else console.log('current contest still on game on');
} */