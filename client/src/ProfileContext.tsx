import { DocumentData } from 'firebase/firestore';
import { createContext } from 'react';

type ProfileContextType = [DocumentData | boolean, React.Dispatch<any>];

const ProfileContext = createContext<ProfileContextType>([{}, () => {}]);

export default ProfileContext;
