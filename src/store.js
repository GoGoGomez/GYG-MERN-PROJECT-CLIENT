import { createStore } from 'redux'

const initialState = {
    heat: '',
    order: []
}




//Define reducers
const reducer = (state, action) => {
    //Accepts current state and an action and returns the new state
    switch (action.type) {
        case 'set_order_item':
        return {...state, order: action.order}
    default:
        console.log(`Redux reducer: Action ${action.type} does not exist.`)
        return state
    }
}

export default createStore(reducer, initialState) 