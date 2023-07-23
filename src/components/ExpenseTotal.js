//importing React and useContext Hook
import React, { useContext } from 'react';
//importing AppContext from AppContext.js
import { AppContext } from '../context/AppContext';

const ExpenseTotal = () => {
    const { expenses, Currency } = useContext(AppContext);
    
    //using the reduce function to get a total of all the costs, assigning this to totalExpenses, and displaying this variable in the JSX return()
    const totalExpenses = expenses.reduce((total, item) => {
        return (total += item.cost);
    }, 0);

    return(
        <div className='alert alert-primary'>
            <span>Spent so far: {Currency}{totalExpenses}</span>
        </div>
    );
};

//whenever the user adds an expense, this causes the state to update, which will cause all components connected to the context to re-render and update themselves with new values

export default ExpenseTotal;