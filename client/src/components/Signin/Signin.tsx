import firebase from 'firebase/compat/app';
import { auth } from '../../services/fireBaseInit';
import { Button } from '@chakra-ui/react';

const SignIn: React.FC = () => {
  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider);
  };

  return (
    <Button onClick={signInWithGoogle} color="black">
      Sign In
    </Button>
  );
};

export default SignIn;
