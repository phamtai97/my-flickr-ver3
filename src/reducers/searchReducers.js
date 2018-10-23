import {searchConstaints} from '../constants/searchConstants.js';

const initialState = {
  item: '',
};

export default function exploreReducers(state = initialState, actions){
  switch(actions.type){
      case searchConstaints.SEARCH_ITEM:
          return{
              ...state,
              item: actions.payload.item,
          };
      default:
          return state;
  }
}
