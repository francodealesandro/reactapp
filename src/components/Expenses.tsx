import React, { useRef, useState } from 'react';
import './Expenses.css';
import { firebaseApp, firestore } from '../firebase/FirebaseContext';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Expense from './Expense';

export default function Expenses(props) {
    const uid = props.user.uid;
    const dummy = useRef();
    const expensesRef = firestore.collection('expenses');
    const query = expensesRef.where('uid', '==', uid).orderBy('createdAt').limit(25);
  
    const [expenses] = useCollectionData(query, { idField: 'id' });
  
    const [amount, setAmount] = useState(0.0);
  
    const addExpense = async (e) => {
      e.preventDefault();
  
      await expensesRef.add({
        amount,
        createdAt: firebaseApp.firestore.FieldValue.serverTimestamp(),
        uid
      })
  
      setAmount(0.0);
      dummy.current.scrollIntoView({ behavior: 'smooth' });
    }
  
    return (<>
      <main>
        {expenses && expenses.map(ex => <Expense expense={ex} />)}
        <span ref={dummy}></span>
      </main>
  
      <form onSubmit={addExpense}>
        <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.0" />
        <button type="submit" disabled={!amount}>➕</button>
      </form>
    </>)
  }