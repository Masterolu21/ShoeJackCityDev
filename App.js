import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import * as firebase from 'firebase';
import { firebaseConfig } from './config.js';
import {Provider, connect} from 'react-redux';
import RootStack from './RootStack';
import configureStore from "./App/reducers/configureStore";

firebase.initializeApp(firebaseConfig);
// create store from redux
const store = configureStore();

export default class App extends React.Component {
    // Render the app container component with the provider around it
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
