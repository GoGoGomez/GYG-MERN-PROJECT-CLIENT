import store from '../store'

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState) {
            return JSON.parse(serializedState);
        } else {
            let newState = {
                order: []
            }
            localStorage.setItem('state', JSON.stringify(newState))
            return newState
        }
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (err) {
        // Ignore write errors.
    }
}