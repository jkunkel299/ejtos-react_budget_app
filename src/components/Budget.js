//importing React and useContext Hook
import React, { useContext } from 'react';
//importing AppContext from AppContext.js
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const {budget} = useContext(AppContext);
    return (
        <div className='alert alert-secondary'>
            <span>Budget: ${budget}</span>
        </div>
    );
};

//Here, you are using the Bootstrap Alert classes to give a nice gray background by adding some text and hard coding a value.

export default Budget;