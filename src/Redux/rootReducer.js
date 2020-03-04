import {combineReducers} from 'redux';
import StoreReducer from './StoreReducer';
export default combineReducers({
  setting: StoreReducer,
});
