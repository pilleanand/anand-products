
import { all } from 'redux-saga/effects';
import ProductSagas from '../sagas/ProductSaga';

export default function* () {
  yield all([
    ...ProductSagas
  ]);
}