import {exploreConstants} from '../constants/exploreConstants.js';

const initialState = {
    hasMore: true,
    elements: [],
    numberPage: 1,
};

export default function explore(state = initialState, actions){
    switch(actions.type){
        case exploreConstants.LOADMORE:
            return{
                ...state,
                hasMore: actions.payload.hasMore,
                elements: state.elements.concat(actions.payload.elements),
                numberPage: actions.payload.numberPage,
            };
        default:
            return state;
    }
}
