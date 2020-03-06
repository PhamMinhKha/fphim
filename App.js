/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import HomeScreen from './src/Screens/HomeScreen';
import SettingScreen from './src/Screens/SettingScreen';
import VideoScreen from './src/Screens/VideoScreen';
import FolderFshare from './src/Screens/FolderFshare';

import rootReducer from './src/Redux/rootReducer';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';

import createSagaMiddleware from 'redux-saga';
import rootSaga from './src/Redux/Saga/rootSaga';
import {composeWithDevTools} from 'redux-devtools-extension';
import config from './src/Config/config';
import SplashScreen from 'react-native-splash-screen';
import {Navigation} from 'react-native-navigation';
import {
  HideNavigationBar,
  ShowNavigationBar,
} from 'react-native-navigation-bar-color';
import Orientation from 'react-native-orientation-locker';

global.config = config;
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);
sagaMiddleware.run(rootSaga);
Navigation.registerComponentWithRedux(
  `SettingScreen`,
  () => SettingScreen,
  Provider,
  store,
);
Navigation.registerComponentWithRedux(
  `VideoScreen`,
  () => VideoScreen,
  Provider,
  store,
);
Navigation.registerComponentWithRedux(
  `FolderFshare`,
  () => FolderFshare,
  Provider,
  store,
);

const App: () => React$Node = () => {
  SplashScreen.hide();
  Orientation.lockToLandscape();
  // HideNavigationBar();
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
