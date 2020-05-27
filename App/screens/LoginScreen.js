import React from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Alert,
    TextInput
  } from 'react-native';
import Svg, { Image, Circle, ClipPath } from 'react-native-svg';
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
  Extrapolate,
  concat } = Animated;

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

  this.onCloseState = event([
    {
    nativeEvent: ({ state }) =>
    block([cond(eq(state, State.END), set(this.buttonOpacity, runTiming(new Clock(), 0, 1))
    )
  ])
  }
]);


    this.buttonY = interpolate(this.buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [100, 0],
    extrapolate: Extrapolate.CLAMP
    });


    this.bgY = interpolate(this.buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [-height / 3, 0],
    extrapolate: Extrapolate.CLAMP
    });

    this.textInputZIndex = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, -1],
      extrapolate: Extrapolate.CLAMP
    });

    this.textInputY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP
    });
    this.textInputOpacity = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP
    });
    this.rotateCross = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [180, 360],
      extrapolate: Extrapolate.CLAMP
    });
  }

render() {
  console.log(this.buttonY, '-----******');
  const {
      navigation: { navigate }
  } = this.props;

  return (
      <View style={styles.container}>
        <Animated.View
        style={{ ...StyleSheet.absoluteFill,
        transform: [{ translateY: this.bgY }] }}
        >
        <Svg height={height} width={width}>
        <Image
          href={require('../assets/Images/TemplatePic.jpg')}
          width={width}
          height={height}
        />
        </Svg>
        </Animated.View>
        <View style={{ height: height / 3 }} />
        <TouchableOpacity>
          <TapGestureHandler onHandlerStateChange={this.onStateChange} >
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
          <TouchableOpacity>
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
        </TouchableOpacity>
        <Animated.View
          style={{
            zIndex: this.textInputZindex,
            opacity: this.textInputOpacity,
            transform: [{ translateY: this.textInputY }],
            height: height / 3,
          ...StyleSheet.absoluteFill,
          top: null,
          justifyContent: 'center' }}
        >
        <TapGestureHandler onHandlerStateChange={this.onCloseState}>
          <Animated.View style={styles.closeButton}>
            <Animated.Text
              style={{ fontSize: 15,
              transform: [{ rotate: concat(this.rotateCross, 'deg') }]
            }}
            >
            X
            </Animated.Text>
          </Animated.View>
        </TapGestureHandler>
        <TextInput
        style={styles.inputText}
        icon="email"
        placeholder="Email"
        autoCapitalize="none"
        //value={this.state.email}
        //onChangeText={email => this.setState({ email })}
        />
        <TextInput
        style={styles.inputText}
        icon="lock"
        placeholder="Password"
        autoCapitalize="none"
        //value={this.state.password}
        //onChangeText={password => this.setState({ password })}
        secureTextEntry
        />
        <Animated.View style={styles.button}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          SignUp
          </Text>
        </Animated.View>
          </Animated.View>

      </View>

  );
}
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
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
  },
  button: {
    backgroundColor: 'white',
    height: 70,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowColor: 'black'
  },
  closeButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -20,
    left: ((width / 2) - 20),
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowColor: 'black'
  },
  inputText: {
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 10,
    marginTop: 5,
    borderColor: 'rgba(0,0,0,0.2)',

  },
});

export default LoginScreen;
