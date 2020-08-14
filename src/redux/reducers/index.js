// Imports: Dependencies
import { combineReducers } from 'redux';

// Imports: Reducers
import authen from './authen';
// Redux: Root Reducer
const rootReducer = combineReducers({
  authen: authen,
});

// Exports
export default rootReducer;