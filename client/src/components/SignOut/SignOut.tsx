import { auth } from '../../services/fireBaseInit';
import { Button } from '@chakra-ui/react';

const SignOut: React.FC = () => {
  return (
    auth.currentUser && <Button color="black" backgroundColor="lightgray" marginRight="10px" colorScheme='gray' onClick={() => auth.signOut()}>Sign Out</Button>
  );
};

export default SignOut;
