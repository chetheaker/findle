import './style.css'

type Props = {
    auth:any
}

const SignOut:React.FC<Props> = ({auth}) => {
    return (
      auth.currentUser && (
        <button className="signOutButton" onClick={() => auth.signOut()}>
          SignOut
        </button>
        )
    );
}

export default SignOut;