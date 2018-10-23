import { combineReducers } from 'redux';
import exploreReducers from './exploreReducers.js';
import searchReducers from './searchReducers.js';
import photoReducers from './photoReducers.js';
import tagReducers from './tagReducers.js';


const rootReducer = combineReducers({
    exploreReducers,
    searchReducers,
    photoReducers,
    tagReducers
});

export default rootReducer;
