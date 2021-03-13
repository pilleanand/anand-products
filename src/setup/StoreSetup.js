import { createStore, applyMiddleware, compose } from 'redux';
import devTools from 'remote-redux-devtools';
import createSagaMiddleware from 'redux-saga';
import AsyncStorage from '@react-native-community/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import sagas from '../sagas';
import reducers from '../reducers';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const enhancer = compose(
    applyMiddleware(sagaMiddleware),
    devTools({
      name: 'my_products',
      realtime: true
    })
  );

  const persistConfig = {
    key: 'root',
    storage: AsyncStorage
  };

  // not using the persist store in this project
  const persistedReducer = persistReducer(persistConfig, reducers);
  let store = createStore(reducers, enhancer);
  persistStore(store, null, () => {
  });
  sagaMiddleware.run(sagas);
  return store;
};

export default configureStore;
