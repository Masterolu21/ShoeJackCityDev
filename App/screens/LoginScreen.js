import React from 'react';
import {
    View,
    Image,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Alert,
    TextInput
  } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import { Tab, Tabs, Header } from 'native-base';
import { commonStyles } from './styles/styles';
import { FontAwesome as Icon } from '@expo/vector-icons';
import FBSDK, { LoginManager } from 'react-native-fbsdk';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import firebase from 'firebase';
import { AppAuth } from 'expo';
import { Google } from 'expo';
import InputText from '../Components/InputText';
import image from '../assets/Images/logo_02_four_color.png';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Footer from '../Components/Footer';
import * as userActions from '../reducers/user/Actions';

// import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import {
    EMAIL_REGIX, //What is this EMAIL_REGIX?
    EMAIL_ALERT,
    PASSWORD_ALERT,
    PASSWORD_MESSAGE,
    FB_ALERT,
    ACCOUNT,
    FORGOT,
    SIGNUP
} from '../utils/constants';
// import SignInScreen from './SignInScreen';
// import SignUp from './SignUp';

const { width, height } = Dimensions.get('window');
const { Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  Extrapolate } = Animated;

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };

  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease)
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock)
    ]),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position
  ]);
}

class LoginScreen extends React.Component {

  constructor(props) {
      super(props);
      // this.spinValue = new Animated.Value(0);
      // this.state = {
      //     email: '',
      //     password: ''
      // };
      this.buttonOpacity = new Value(1);
      this.onStateChange = event([
        {
        nativeEvent: ({ state }) =>
        block([cond(eq(state, State.END), set(this.buttonOpacity, runTiming(new Clock(), 1, 0))
        )
      ])
      }
  ]);
    this.butttonY = interpolate(this.buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [100, 0],
    //extrapolate: Extrapolate.CLAMP
    });

    this.bgY = interpolate(this.buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [-height / 3, 0],
    //extrapolate: Extrapolate.CLAMP
    });
    console.log(Animated);
  }

render() {
  const {
      navigation: { navigate }
  } = this.props;
  return (
      <View style={styles.container}>
        <Animated.View
        style={{ ...StyleSheet.absoluteFill,
        transform: [{ translateY: this.bgY }] }}
        >
        <Image
          source={require('../assets/Images/TemplatePic.jpg')}
          style={{ flex: 1, height: null, width: null }}
          resizeMode="cover"
        />
        </Animated.View>
        <View style={{ height: height / 3 }} />
        <TouchableOpacity>
          <TapGestureHandler onHandlerStateChange={this.onStateChange}>
          <Animated.View
            style={[

              styles.signupbutton,
              commonStyles.alignSelfcenter,

              {
                opacity: this.buttonOpacity,
                transform: [{ translateY: this.buttonY }],
                width: width * 0.73
              }
            ]}
          >
            <Text style={[styles.signuptextbutton]}>Sign Up</Text>
          </Animated.View>
          </TapGestureHandler>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSubmit()}>
          <TapGestureHandler onHandlerStateChange>
          <Animated.View
            style={[
              styles.loginbutton,
              commonStyles.alignSelfcenter,

              {
                opacity: this.buttonOpacity,
                transform: [{ translateY: this.buttonY }],
                width: width * 0.73
              }
            ]}
          >
            <Text style={[styles.logintextbutton]}>Log In</Text>
          </Animated.View>
          </TapGestureHandler>
        </TouchableOpacity>
      </View>

  );
}
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center'
  },
  loginbutton: {
    height: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 20,
    marginBottom: 10
  },
  signupbutton: {
    height: 60,
    backgroundColor: 'rgb(72, 244, 255)',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 20,
    marginBottom: 10
  },
  logintextbutton: {
    fontSize: 16,
    textAlign: 'center',
    justifyContent: 'center',
    color: 'black',
    fontFamily: 'Helvetica-Bold'
  },
  signuptextbutton: {
    fontSize: 16,
    textAlign: 'center',
    justifyContent: 'center',
    color: 'white',
    fontFamily: 'Helvetica-Bold'
  }
});

export default LoginScreen;
