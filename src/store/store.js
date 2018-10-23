import {createStore} from 'redux';
import rootReducer from '../reducers/rootReducer.js'

export const store = createStore(rootReducer);
window.store = store;
