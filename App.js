import React from 'react';
import { View, Image, Dimensions, SafeAreaView, StyleSheet, Text } from 'react-native';
import { Provider, connect } from 'react-redux';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as firebase from 'firebase';
import { firebaseConfig } from './config.js';
import RootStack from './RootStack';
import LoginScreen from './App/screens/LoginScreen';
import configureStore from './App/reducers/configureStore';
import FlashMessage from "react-native-flash-message";

firebase.initializeApp(firebaseConfig);
// create store from redux
const store = configureStore();

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    }
    return Asset.fromModule(image).downloadAsync();
  });
}

export default class App extends React.Component {
  // Render the app container component with the provider around it
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require('./assets/images/TemplatePic.jpg'),
    ]);

    await Promise.all([...imageAssets]);
  }

  render() {
    //If the state is not ready then display the apploading oterwise display the app
    console.log(this.state.isReady, '****');
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    return (
      <View style={styles.background}>
        <Provider store={store}>
          {/* <LoginScreen navigation={{ navigate: () => {} }} /> */}
          <RootStack />
        </Provider>
        <FlashMessage position="top" />
      </View>
    );
  }
}

console.disableYellowBox = true
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    fontSize: 16
  },
  textStyle: {
  }
});
//   render() {
//     return (
//       <View style={{ flex: 1 }}>
//         <Provider store={store}>
//           <RootStack />
//         </Provider>
//       </View>
//     );
//   }
// }
