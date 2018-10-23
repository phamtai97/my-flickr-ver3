import {createStore} from 'redux';
import rootReducer from '../reducers/rootReducer.js'


const initialState = {
    hasMore: true,
    elements: [],
    numberPage: 1,
  };

// Create store
export const store = createStore(rootReducer, initialState);
