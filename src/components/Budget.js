//importing React and useContext Hook
import React, { useContext } from 'react';
//importing AppContext from AppContext.js
import { AppContext } from '../context/AppContext';
import totalExpenses from './ExpenseTotal';

const Budget = () => {
    const {budget, dispatch, Currency} = useContext(AppContext); 

    const budgetChange = (e) => {    
        let newBudget = e.target.value;

        if (newBudget>20000){
            alert(`The budget cannot exceed ${Currency}20,000`);
            return
        } 
        
        if (newBudget<totalExpenses){
            alert("You cannot reduce the budget value lower than the spending");
            return
        }

            dispatch({
                type: "SET_BUDGET",
                payload: newBudget,
            });
    };

    return (
        <div className='alert alert-secondary'>
            <form>
               <label>
               Budget: {Currency}<input type="number" step="10" name="budgetinput" id="budgetinput"  defaultValue={budget} onChange={budgetChange}></input>
                </label> 
            </form>
            
            {/*<span>Budget: £{budget}</span>*/}
        </div>
    );
};

//Here, you are using the Bootstrap Alert classes to give a nice gray background by adding some text and hard coding a value.

export default Budget;