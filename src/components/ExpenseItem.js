import React, { useContext } from 'react';
import { TiDelete } from 'react-icons/ti';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppContext } from '../context/AppContext';
import {BsDashCircleFill, BsFillPlusCircleFill} from 'react-icons/bs';

//here, you are dispatching an action. Your action contains the type (so the reducer knows how to update the state) and the payload. In this case, passing the ID of this expense (which you get from props when you render the ExpenseList)
const ExpenseItem = (props) => {
    const { dispatch, Currency } = useContext(AppContext);

    const handleDeleteExpense = () => {
        dispatch({
            type: 'DELETE_EXPENSE',
            payload: props.id,
        });
    };

    const increaseAllocation = (name) => {
        const expense = {
            name: name,
            cost: 10,
        };

        dispatch({
            type: 'ADD_EXPENSE',
            payload: expense
        });
    }

    const decreaseAllocation = (name) => {
        const expense = {
            name: name,
            cost: 10,
        };

        dispatch({
            type: 'RED_EXPENSE',
            payload: expense
        });
    }
//button type="button" class="btn btn-success rounded-circle" class="btn btn-danger rounded-circle"
    return(
        <tr>
            <td>{props.name}</td>
            <td>{Currency}{props.cost}</td>
            <td><BsFillPlusCircleFill color='green' size='2.5em' onClick={event => increaseAllocation(props.name)}></BsFillPlusCircleFill></td>
            <td><BsDashCircleFill color='red' size='2.5em' onClick={event => decreaseAllocation(props.name)}></BsDashCircleFill></td>
            <td><TiDelete size='1.5em' onClick={handleDeleteExpense}></TiDelete></td>
        </tr>
    );
};

export default ExpenseItem;