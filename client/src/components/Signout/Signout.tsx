import { auth } from '../../services/fireBaseInit';
import { Button } from '@chakra-ui/react';

const SignOut: React.FC = () => {
  return (
    auth.currentUser && <Button onClick={() => auth.signOut()}>Sign Out</Button>
  );
};

export default SignOut;
