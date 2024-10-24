import './App.css';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import SignIn from './componets/auth/SignIn';
import SignOut from './componets/auth/SignOut';
import ChatRoom from './componets/chat/ChatRoom';
import SignUp from './componets/auth/SignUp';
import { useState } from 'react';
import ParentComponent from './componets/ParentComponent ';

function App() {
  const [user] = useAuthState(auth);
  const [showSignUp, setShowSignUp] = useState(false);

  const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
  };

  return (
    <ParentComponent>
      <div className="App">
            <header>
              <h1>💬</h1>
              <SignOut />
            </header>

            <section>
              {user ? <ChatRoom /> : (
                <>
                  <button onClick={toggleSignUp}>
                    {showSignUp ? 'Cambiar a  Inicio de sección' : 'Cambiar a Registro de usuario'}
                  </button>
                  {showSignUp ? <SignUp /> : <SignIn />}
                </>
              )}
            </section>
      </div>
    </ParentComponent>   
  );
}

export default App;
