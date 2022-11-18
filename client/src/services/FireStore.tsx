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
    .collection('contests')
    .orderBy('expirationDate', 'desc')
    .limit(1)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((element) => {
        let data = element.data();
        data.contestId = element.id;
        setContest(data);
      });
    });
};
