//importing React and useContext Hook
import React, { useContext, useState } from 'react';
//importing AppContext from AppContext.js
import { AppContext } from '../context/AppContext';

//here you are adding form tags, adding a label/input for name, cost, and action field, and adding values for various departments
const AllocationForm = (props) => {
    const { dispatch, remaining, Currency } = useContext(AppContext);

    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [action, setAction] = useState('');

    const submitEvent = () => {
        if(cost > remaining) {
            alert(`The value cannot exceed remaining funds ${Currency}`+remaining);
            setCost("");
            return;
        }

        const expense = {
            name: name,
            cost: parseInt(cost),
        };

        if(action === "Reduce"){
            dispatch({
                type: 'RED_EXPENSE',
                payload: expense,
            });
        } else {
            dispatch({
                type: 'ADD_EXPENSE',
                payload: expense,
            });
        }
    };

    return(
        <div>
            <div className='row'>
                <div className="input-group mb-3" style={{marginLeft: '2rem'}}>
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Department</label>
                    </div>
                    
                    <select className="custom-select" id="inputGroupSelect01" onChange={(event) => setName(event.target.value)}>
                        <option defaultValue>Choose...</option>
                        <option value="Marketing" name="marketing">Marketing</option>
                        <option value="Sales" name="sales">Sales</option>
                        <option value="Finanace" name="finance">Finance</option>
                        <option value="HR" name="hr">HR</option>
                        <option value="IT" name="it">IT</option>
                        <option value="Admin" name="admin">Admin</option>
                    </select>

                    <div className="input-group-prepend" style={{marginLeft:'2rem'}}>
                        <label className="input-group-text" htmlFor="inputGroupSelect02">Allocation</label>
                    </div>

                    <select className="custom-select" id="inputGroupSelect02"  onChange={(event) => setAction(event.target.value)}>
                        <option defaultValue value="Add" name="Add">Add</option>
                        <option value="Reduce" name="Reduce">Reduce</option>
                    </select>

                    {/* added pounds label - will need updated when currency becomes a customizable value */}
                    <div className="input-group-prepend" style={{marginLeft:'2rem'}}>
                        <label className="input-group-text">{Currency}</label>
                    </div>
                    {/* added onKeyPress to ensure only numbers can be entered as input values */}
                    <input
                        required='required'
                        type='number'
                        id='cost'
                        value={cost}
                        style={{marginLeft:'2rem', size:10}}
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                        onChange={(event) => setCost(event.target.value)}>
                    </input>
                    <button className="btn btn-primary" onClick={submitEvent} style={{marginLeft:'2rem'}}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default AllocationForm;