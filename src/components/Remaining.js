//importing React and useContext Hook
import React, { useContext } from 'react';
//importing AppContext from AppContext.js
import { AppContext } from '../context/AppContext';

const Remaining = () => {
    const { expenses, budget } = useContext(AppContext);

    //using reduce function to get a total of all the costs, assigning this to a variable totalExpenses and displaying the variable in the JSX
    const totalExpenses = expenses.reduce((total, item) => { 
        return (total = total + item.cost);
    }, 0);
    //whenever the user adds an expense, this causes the state to update, which will cause all the components conected to the context to re-render and update themselves with the new values

    const alertType = totalExpenses > budget ? 'alert-danger' : 'alert-success';
    return(
        <div className={`alert ${alertType}`}>
            <span>Remaining: ${budget - totalExpenses}</span>
        </div>
    );
};

export default Remaining;