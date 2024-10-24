import { useState, useRef } from 'react';
import { auth, firestore } from '../../firebase';
import { collection, query, orderBy, limit, addDoc, serverTimestamp } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const ChatRoom = () => {
  const dummy = useRef();
  const messagesRef = collection(firestore, 'messages');
  const q = query(messagesRef, orderBy('createdAt'), limit(25));

  const [messages] = useCollectionData(q, { idField: 'id' });

  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();
  
    const { uid, photoURL, email } = auth.currentUser;
  
    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
      email
    });
  
    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <main>
        {messages && messages.map(msg => <ChatMessage key={msg.createdAt} message={msg} />)}
        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Escribe aca" />
        <button type="submit">enviar</button>
      </form>
    </>
  );
};


const ChatMessage = (props) => {
  
  // eslint-disable-next-line react/prop-types
  const { text, uid, photoURL, email, createdAt } = props.message;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  // Formatear la fecha
  // eslint-disable-next-line react/prop-types
  const date = createdAt ? new Date(createdAt.seconds * 1000) : new Date();
  const time = `${date.getHours()}:${date.getMinutes()}`;

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://i.imgur.com/rFbS5ms.png'} alt="Avatar" />
      <div>
        <p><strong>{email}</strong> <span>{time}</span></p>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default ChatRoom;