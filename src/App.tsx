import React from 'react';
import './App.css';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firebaseApp } from './firebase/FirebaseContext';
import Expenses from './components/Expenses';

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💰</h1>
        <SignOut user={user}/>
      </header>

      <section>
        {user ? <Expenses user={auth.currentUser} /> : <SignIn />}
      </section>
    </div>    
  );
}


function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebaseApp.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  // const signInWithApple = () => {
  //   const provider = new app.auth.OAuthProvider('apple.com');
  //   auth.signInWithPopup(provider);
  // }

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Ingresa con Google</button>
      {/* <button className="sign-in-Apple" onClick={signInWithApple}>Ingresa con Apple</button> */}
    </>
  )

}

function SignOut(props) {
  return auth.currentUser && (
    <div className="sign-out">
      <img src={ auth.currentUser?.photoURL || "http://www.gravatar.com/avatar/?d=identicon" } />
      <p>{ auth.currentUser?.displayName || "Error" }</p>
      <button onClick={() => auth.signOut()}>Cerrar Sesion</button>
    </div>
  )
}


export default App;
