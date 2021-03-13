import { takeEvery, call, put } from "redux-saga/effects";
import {
  fetchProductsWithPaginationRequestFailAction,
  fetchProductsWithPaginationRequestSuccessAction } from "../actions/ProductActions";
import { fetchProducstWithPaginationApi } from "../apis/ProductsAPi";
import { FETCH_PRODUCTS_PAGINATION_REQUEST } from "../constants/ProductActionTypes";
import { showToastMessage } from '../util/ToastUtility';

const productSaga = [
  takeEvery(FETCH_PRODUCTS_PAGINATION_REQUEST, fetchProductsWithPaginationSaga)
];

function* fetchProductsWithPaginationSaga(action){
  const pageNumber = action.payload;
  console.log('pageNumber---',pageNumber);
  let response = yield call(fetchProducstWithPaginationApi, pageNumber);
  if(response){
    yield put(fetchProductsWithPaginationRequestSuccessAction(response.data, pageNumber))
  }else {
    showToastMessage('Something went wrong, Please try again later');
    yield put(fetchProductsWithPaginationRequestFailAction())
  }
}

export default productSaga;