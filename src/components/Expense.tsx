import './Expense.css';

export default function ChatMessage(props) {
    const { amount } = props.expense;
    const expenseClass = amount > 0 ? 'income' : 'expense';
  
    return (<>
      <div className={`record ${expenseClass}`}>
        <h2>$ {amount}</h2>
      </div>
    </>)
  }
  
  