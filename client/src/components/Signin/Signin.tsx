import firebase from "firebase/compat";
import './style.css'

type Props = {
    auth:any
}

const SignIn:React.FC<Props> = ({auth}) => {
    const signInWithGoogle = async () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      await auth.signInWithPopup(provider);
    };
  
    return (
      <>
        <div className="signInDiv">
          <button className="signInButton" onClick={signInWithGoogle}>
            {' '}
            Sign in with Google{' '}
          </button>
        </div>
      </>
    );
  }