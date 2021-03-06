import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import configureStore from './StoreSetup';
import { showToastMessage } from '../util/ToastUtility';
import MyProducts from '../screens/products/MyProducts';
import { APP_THEME_COLOR } from '../constants/Colors';

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const store = configureStore();

function AppContainer(props) {

  React.useEffect(() => {
    setTimeout(() => {
      checkNetworkStatus();
    }, 500);
  }, []);

  const checkNetworkStatus = () => {
    // simple effort to just to show coonected to internet or not
    //  to show user when internet is jumbled
    NetInfo.addEventListener(connectionInfo => {
      connectionInfo.isConnected ?
        showToastMessage('Connected to Internet')
        : showToastMessage('No Internet');
    });
  }

  const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  );

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <MyStatusBar backgroundColor={APP_THEME_COLOR} barStyle="light-content" />
        <MyProducts />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});

export default AppContainer;
