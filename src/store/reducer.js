import { ADD_PLACE_ACTION } from './constants';

const defaultState = {
    places: []
};


const reducer = (state = defaultState, action) => {
    switch(action.type) {

        case ADD_PLACE_ACTION:
            console.log(action.place)
            return {...state, places: [...state.places, action.place]}
        default:
            return state;
    }
};

export default reducer;