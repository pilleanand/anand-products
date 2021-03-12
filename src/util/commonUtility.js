import { Dimensions, Platform } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const platform = Platform.OS;

export const getDeviceWidth = () => {
  return deviceWidth;
}

export const getDeviceHeight = () => {
  return deviceHeight;
}

export const getPlatform = () => {
  return platform;
}