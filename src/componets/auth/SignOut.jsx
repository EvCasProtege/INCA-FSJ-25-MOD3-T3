import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

const SignOut = () => {
  return auth.currentUser && (
    <button onClick={() => signOut(auth)}>Sign Out</button>
  );
};

export default SignOut;
