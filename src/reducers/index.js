import { combineReducers } from 'redux';
import CommonReducer from "./CommonReducer";
import ProductReducers from './ProductReducers';

export default combineReducers({
  common: CommonReducer,
  product: ProductReducers
});