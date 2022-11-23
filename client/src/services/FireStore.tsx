import { firestore } from '../services/fireBaseInit';
import firebase from 'firebase/compat/app';

export const checkOrAddUIDToContest = async (uid: any) => {
  const BEUrl = 'https://us-central1-trinity-f4908.cloudfunctions.net/checkUID';
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000'
    },
    body: JSON.stringify({ uid })
  };
  const response = await fetch(BEUrl, config);
  const { res } = await response.json();
  return res;
};

export const nftMintReq = async (url: string, wallet: string, uid: string) => {
  const BEUrl =
    'https://us-central1-trinity-f4908.cloudfunctions.net/nftMintReq';
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000'
    },
    body: JSON.stringify({ url: url, wallet: wallet, uid: uid })
  };
  const response = await fetch(BEUrl, config);
  const { res } = await response.json();
  return res;
};

export const getUserStats = async (uid: string) => {
  const result = await firestore.collection('users').doc(uid).get();
  const stats = await result.data();
  return stats;
};

export const createUserStats = async (uid: string) => {
  const usersRef = firestore.collection('users');
  usersRef.doc(uid).set({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    X: 0
  });
};

export const updateUserStats = async (uid: string, score: number | 'x') => {
  const userRef = firestore.collection('users').doc(uid);
  await userRef.update({
    [score]: firebase.firestore.FieldValue.increment(1)
  });
};

export const fetchContest = async (
  setContest: React.Dispatch<
    React.SetStateAction<firebase.firestore.DocumentData>
  >
) => {
  setContest([]);
  await firestore
    .collection('currentContest')
    .orderBy('expirationDate', 'desc')
    .limit(1)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((element) => {
        let data = element.data();
        data.contestId = element.id;
        setContest(data);
        const contestId = JSON.parse(localStorage.getItem('id') as string);
        if (contestId !== data.contestId) {
          localStorage.clear();
          localStorage.setItem('id', JSON.stringify(data.contestId));
        }
      });
    });
};
