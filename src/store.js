import { createStore } from 'redux'

const initialState = {
    heat: '',
    order: [],
    items: []
}

//Define reducers
const reducer = (state, action) => {
    //Accepts current state and an action and returns the new state
    switch (action.type) {
        case 'set_items':
        return {...state, items: action.items}
    default:
        console.log(`Redux reducer: Action ${action.type} does not exist.`)
        return state
    }
}

export default createStore(reducer, initialState) 