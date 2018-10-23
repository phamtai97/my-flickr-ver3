import {tagConstants} from '../constants/tagConstants';

const initialState = {
    hasMore: true,
    elements: [],
    numberPage: 1,
};

export default function tagReducers(state = initialState, actions){
    switch(actions.type){
        case tagConstants.TAG_LOADMORE:
            return{
                ...state,
                hasMore: actions.payload.hasMore,
                elements: state.elements.concat(actions.payload.elements),
                numberPage: actions.payload.numberPage,
            };
        case tagConstants.TAG_RESET:
            return{
                ...state,
                elements: [],
            }
        default:
            return state;
    }
}
