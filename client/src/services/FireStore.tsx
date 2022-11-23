import { firestore } from '../services/fireBaseInit';
import firebase from 'firebase/compat/app';

export const fetchImages = async (
  setImages: React.Dispatch<
    React.SetStateAction<firebase.firestore.DocumentData[]>
  >
) => {
  setImages([]);
  await firestore
    .collection('images')
    .orderBy('likesReceived', 'desc')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((element) => {
        let data = element.data();
        data.imageId = element.id;
        setImages((arr) => [...arr, data]);
      });
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

export const nftMintReq = async ( url: string, prompt: string, wallet: string, uid: string ) => {
  const BEUrl = 'https://us-central1-trinity-f4908.cloudfunctions.net/nftMintReq';
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'no-cors'
    },
    body: JSON.stringify({url: url, prompt: prompt, wallet: wallet, uid: uid})
  };
  const response = await fetch(BEUrl, config);
  const { res } = await response.json();
  return res;
};
