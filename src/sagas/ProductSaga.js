import { takeEvery, call, put } from "redux-saga/effects";
import {
  fetchCategoriesRequestFailureAction,
  fetchCategoriesRequestSuccessAction,
  fetchProductsWithPaginationRequestFailAction,
  fetchProductsWithPaginationRequestSuccessAction } from "../actions/ProductActions";
import { fetchAllCategoriesApi, fetchProducstWithPaginationApi } from "../apis/ProductsAPi";
import { FETCH_CATEGORIES_REQUEST, FETCH_PRODUCTS_PAGINATION_REQUEST } from "../constants/ProductActionTypes";
import { showToastMessage } from '../util/ToastUtility';

const productSaga = [
  takeEvery(FETCH_PRODUCTS_PAGINATION_REQUEST, fetchProductsWithPaginationSaga),
  takeEvery(FETCH_CATEGORIES_REQUEST, fetchCategoriesSaga)
];

function* fetchProductsWithPaginationSaga(action){
  const pageNumber = action.payload;
  let response = yield call(fetchProducstWithPaginationApi, pageNumber);
  if(response){
    yield put(fetchProductsWithPaginationRequestSuccessAction(response.data, pageNumber))
  }else {
    showToastMessage('Something went wrong, Please try again later');
    yield put(fetchProductsWithPaginationRequestFailAction())
  }
}

function* fetchCategoriesSaga(){
  let response = yield call(fetchAllCategoriesApi);
  if(response){
    yield put(fetchCategoriesRequestSuccessAction(response.data))
  }else {
    showToastMessage('Something went wrong, Please try again later or refresh');
    yield put(fetchCategoriesRequestFailureAction())
  }
}

export default productSaga;