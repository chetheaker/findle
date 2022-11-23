import { randomWordAPI } from './randomWordAPI';
import firebase from 'firebase/compat';
import { firestore } from './fireBaseInit';

export const createNewContest1 = async () => {
  const contestsRef = firestore.collection('contests');
  let rand2Words = await randomWordAPI();
  let rand2WordsFlat = rand2Words.flat();
  console.log('2 words in create contest: ', rand2WordsFlat);
  await contestsRef.add({
    random2Words: rand2WordsFlat,
    expirationDate: firebase.firestore.Timestamp.now().toMillis() + 8.64e7,
    createdAt: firebase.firestore.Timestamp.now().toMillis()
    // id: firebase.firestore.DocumentReference()
  });
  console.log('new contest created successfully!');
};

