import React, { createContext, useReducer } from 'react';

// 5. The reducer - this is used to update the state, based on the action
export const AppReducer = (state, action) => {
    let budget = 0; //initialize budget variable
    
    //setting action types for changes to state
    switch (action.type) {
        //currentExp is the value of the allocated budget for each department, and is changed upon any action related to the expenses
        
        //to increase a department's expenses/allocated budget
        case 'ADD_EXPENSE':
            let total_budget = 0;
            
            total_budget = state.expenses.reduce(
                (previousExp, currentExp) => {
                    return previousExp + currentExp.cost //setting total budget equal to previous expenses plus cost of current expenses
                },0
            );
            
            total_budget = total_budget + action.payload.cost; //adding cost associated with action (type:'ADD_EXPENSE') to the total budget
            action.type = "DONE";
            
            //if total expenses (previous expenses plus current expenses, total_budget) <= budget, allow update of currentExp (current expenses)
            if(total_budget <= state.budget) {
                total_budget = 0;

                state.expenses.map((currentExp)=> { //array state.expenses(function to update currentExp.cost with the cost associated with the action, return currentExp and state)
                    if(currentExp.name === action.payload.name) {
                        currentExp.cost = action.payload.cost + currentExp.cost;
                    }
                    return currentExp
                });
                return {
                    ...state,
                };
            } else {
                //setting alert for budget limit - cannot allocate funds over budget
                alert("Cannot increase the allocation! Out of funds");
                return {
                    ...state
                }
            }
        
        //to reduce a department's expenses/allocated budget    
        case 'RED_EXPENSE':
                const red_expenses = state.expenses.map((currentExp)=> {
                    //if the name of currentExp equals name associated with action and currentExp cost is greater than the cost associated with the action
                    if (currentExp.name === action.payload.name && currentExp.cost - action.payload.cost >= 0) {
                        currentExp.cost =  currentExp.cost - action.payload.cost;
                        budget = state.budget + action.payload.cost //updating budget object with a new state, adding the amount back to the pool that was taken from whichever department
                    }
                    return currentExp
                })
                action.type = "DONE";
                return {
                    ...state,
                    expenses: [...red_expenses],
                };
        
        //to delete a department's expenses completely - set equal to zero
        case 'DELETE_EXPENSE':
            action.type = "DONE";
            state.expenses.map((currentExp)=> {
                if (currentExp.name === action.payload) {
                    budget = state.budget + currentExp.cost //updating budget to add the amount back to the pool
                    currentExp.cost =  0;//setting allocated budget value equal to zero
                }
                return currentExp
            })
            action.type = "DONE";
            return {
                ...state,
                budget
            };
        
        //to set the budget - to be used with customizable budget value    
        case 'SET_BUDGET':
            action.type = "DONE";
            state.budget = action.payload;
            //setting budget value to the current state??
            //budget = state.budget;
            return {
                ...state,                
            };
        
        //to set the currency - to be used with customizable currency type
        case 'CHG_CURRENCY':
            action.type = "DONE";
            state.Currency = action.payload;
            return {
                ...state
            }

        default:
            return state;
    }
};

// 1. Sets the initial state when the app loads
const initialState = {
    budget: 2000,
    expenses: [
        { id: "Marketing", name: 'Marketing', cost: 50 },
        { id: "Finance", name: 'Finance', cost: 300 },
        { id: "Sales", name: 'Sales', cost: 70 },
        { id: "Human Resource", name: 'Human Resource', cost: 40 },
        { id: "IT", name: 'IT', cost: 500 },
    ],
    Currency: '$'
};

// 2. Creates the context this is the thing our components import and use to get the state
export const AppContext = createContext();

// 3. Provider component - wraps the components we want to give access to the state
// Accepts the children, which are the nested(wrapped) components
export const AppProvider = (props) => {
    // 4. Sets up the app state. takes a reducer, and an initial state
    const [state, dispatch] = useReducer(AppReducer, initialState);
    let remaining = 0;

    if (state.expenses) {
            const totalExpenses = state.expenses.reduce((total, item) => {
            return (total = total + item.cost);
        }, 0);
        remaining = state.budget - totalExpenses;
    }

    return (
        <AppContext.Provider
            value={{
                expenses: state.expenses,
                budget: state.budget,
                remaining: remaining,
                dispatch,
                Currency: state.Currency
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};
