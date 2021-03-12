import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import configureStore from './StoreSetup';
import { showToastMessage } from '../util/ToastUtility';
import MyProducts from '../screens/products/MyProducts';

export const store = configureStore();

function AppContainer(props) {

  React.useEffect(() => {
    setTimeout(() => {
      checkNetworkStatus();
    }, 500);
  }, []);

  const checkNetworkStatus = () => {
    NetInfo.addEventListener(connectionInfo => {
      connectionInfo.isConnected ?
        showToastMessage('Connected to Internet')
        : showToastMessage('No Internet');
    });
  }

  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <MyProducts />
      </SafeAreaView>
    </Provider>
  );
}

export default AppContainer;
