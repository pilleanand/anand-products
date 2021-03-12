
import { all } from 'redux-saga/effects';
import ProductSagas from '../sagas/ProductSaga';
import commonSaga from './CommonSaga';

export default function* () {
  yield all([
    ...commonSaga,
    ...ProductSagas
  ]);
}