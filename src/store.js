import { createStore } from 'redux'
import { loadState } from './components/LocalStorage'


const initialState = {
    order: []
}




//Define reducers
const reducer = (state, action) => {
    //Accepts current state and an action and returns the new state
    switch (action.type) {
        case 'set_order_item':
        return {...state, order: action.order}
        case 'update_item_quantity':
        return {...state, order: action.update}
        case 'delete_item':
        return {...state, order: action.delete}
    default:
        console.log(`Redux reducer: Action ${action.type} does not exist.`)
        return state
    }
}
const persistedState = loadState()



export default createStore(reducer, persistedState) 