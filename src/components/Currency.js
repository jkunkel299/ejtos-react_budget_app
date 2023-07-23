import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Currency = () => {
    const {dispatch} = useContext(AppContext);

    //setting action to update the currency values across the application when the Currency is changed
    const changeCurrency = (val) => {
        dispatch({
            type: 'CHG_CURRENCY',
            payload: val,
        })
    }

    return(
        <label className='alert alert-success'>Currency {Currency} {
            <select class="btn btn-success dropdown-toggle" name="Currency" id="Currency" onChange={(event) => changeCurrency(event.target.value)}>
                <option value="$">$ Dollar</option>
                <option value="£">£ Pound</option>
                <option value="€">€ Euro</option>
                <option value="₹">₹ Rupee</option>
            </select>
            }
        </label>
    );
};

export default Currency;