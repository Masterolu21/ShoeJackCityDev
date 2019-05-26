import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import * as firebase from 'firebase';
import { firebaseConfig } from './config.js';
import {Provider, connect} from 'react-redux';
import RootStack from './RootStack';
import configureStore from "./App/reducers/configureStore";

firebase.initializeApp(firebaseConfig);
const store = configureStore();

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Provider store={store}>
          <RootStack />
        </Provider>
      </View>
    );
  }
}
