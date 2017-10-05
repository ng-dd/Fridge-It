const initialState = {
    clicked: false,
    error: null
}

const graphReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'TOGGLE_BUTTON_CLICKED': {
            return Object.assign({}, state, {clicked: true});
        }
    }
    return state;
}

export default graphReducer;