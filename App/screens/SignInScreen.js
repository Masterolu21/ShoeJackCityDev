import React from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FBSDK, { LoginManager } from 'react-native-fbsdk';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import firebase from 'firebase';
import { AppAuth } from 'expo';
import { Google } from 'expo';
import InputText from '../Components/InputText';
import { commonStyles } from './styles/styles';
import image from '../assets/Images/ShoeJackCityLogo.png';

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

class SignInScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  componentDidMount() {
    this.checkIfUserIsLoggedIn();
  }

  onLoginFacebook = () => {
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
      result => {
        if (result.iscancelled) {
          Alert.alert('Login Was Cancel');
        } else {
          console.log(
            `Login Was Successfully${result.grantedPermissions.toString()}`
          );
        }
      },
      error => {
        Alert.alert('Alert', FB_ALERT);
      }
    );
  };


  //signIn = async () => {

    // GoogleSignin.configure({
    //   scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    //   webClientId: '<FROM DEVELOPER CONSOLE>' // client ID of type WEB for your server (needed to verify user ID and offline access)
    // });

    // try {
    //   await GoogleSignin.hasPlayServices();
    //   const userInfo = await GoogleSignin.signIn();
    //   this.setState({ userInfo });
    // } catch (error) {
    //   if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //     // user cancelled the login flow
    //   } else if (error.code === statusCodes.IN_PROGRESS) {
    //     // operation (f.e. sign in) is in progress already
    //   } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //     // play services not available or outdated
    //   } else {
    //     // some other error happened
    //   }
    // }

  onSubmit = () => {
    const {
      navigation: { navigate }
    } = this.props;
    if (!EMAIL_REGIX.test(this.state.email)) {
      Alert.alert('Alert', EMAIL_ALERT);
    } else if (this.state.password.length < 6) {
      Alert.alert('Alert', PASSWORD_ALERT);
    } else if (this.state.password.length > 15) {
      Alert.alert('Alert', PASSWORD_MESSAGE);
    } else {
      navigate(ACCOUNT);
    }
  };

initAsync = async () => {
  try {
    await GoogleSignIn.initAsync({ clientId: '863761628819-q1laj1g0mia0pr6o5akfc66s1ia4qj6u.apps.googleusercontent.com' });
  } catch ({ message }) {
    alert(`GoogleSignIn.initAsync(): ${message}`);
  }
};

  signInWithGoogleAsync = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        //androidClientId: YOUR_CLIENT_ID_HERE,
        behavior: 'web',
        iosClientId: '863761628819-q1laj1g0mia0pr6o5akfc66s1ia4qj6u.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'scuccess') {
        return result.accessToken;
      }
        return { cancelled: true };
    } catch (e) {
      return { error: true };
    }
  };

  checkIfUserIsLoggedIn = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      this.props.navigation.navigate('Account');
    } else {
      this.props.navigation.navigate('SignInScreen');
    }
  });
  };

  render() {
    const { width } = Dimensions.get('window');
    const {
      navigation: { navigate }
    } = this.props;
    return (
      <View style={styles.container}>
        <View
style={[commonStyles.alignSelfcenter, {
            ...ifIphoneX( //what is this doing?
              {
                marginTop: 50
              },
              {
                marginTop: 30
              }
            )
          }]}
        >
          <Image
            resizeMode={'contain'} //What is this doing?
            style={{ height: 150, width: 150 }}
            source={image}
          />
        </View>
        <View>
          <InputText
            style={[styles.TextInput,
               {
                width: width * 0.9
              }
            ]}
            placeholder="Username or email"
            autoCapitalize="none"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />

          <InputText
            style={[styles.TextInput,
               {
                width: width * 0.9
              }
            ]}
            placeholder="Password"
            autoCapitalize="none"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            secureTextEntry
          />
        </View>
        <View style={[commonStyles.mt10]}>
          <TouchableOpacity onPress={this.onSubmit}>
            <View
              style={[
                commonStyles.loginbutton,
                commonStyles.alignSelfcenter,

                {
                  backgroundColor: '#000000',
                  width: width * 0.9
                }
              ]}
            >
              <Text style={[styles.logintextbutton, styles.buttonText]}>
                LOGIN
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigate(FORGOT)}>
          <View style={[commonStyles.alignSelfcenter, commonStyles.mt20]}>
            <Text style={[styles.ColorText]}>Forgot Password?</Text>
          </View>
        </TouchableOpacity>

        <View style={[commonStyles.mt20]}>
          <TouchableOpacity onPress={this.onLoginFacebook}>
            <View
              style={[
                commonStyles.fbbutton,
                commonStyles.alignSelfcenter,
                commonStyles.row,
                commonStyles.mb10,

                {
                  width: width * 0.9
                }
              ]}
            >
              <Icon
                name="facebook-f"
                size={30}
                color={'white'}
                style={[commonStyles.ml20]}
              />

              <View style={{ flex: 0.9 }}>
                <Text style={[commonStyles.fbbuttonText, commonStyles.font16]}>
                  Facebook
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            title="Sign In with Google"
            onPress={() => this.signInWithGoogleAsync()}
          >
            <View
              style={[
                styles.googlebutton,
                commonStyles.alignSelfcenter,
                commonStyles.row,
                {
                  width: width * 0.9
                }
              ]}
            >
              <Icon
                name="google"
                size={30}
                color={'white'}
                style={[commonStyles.ml20]}
              />

              <View style={{ flex: 0.85 }}>
                <Text style={[styles.buttonText]}>
                  Google
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[commonStyles.mt10]}>
          <TouchableOpacity onPress={() => navigate(SIGNUP)}>
            <View
              style={[
                commonStyles.loginbutton,
                commonStyles.alignSelfcenter,

                {
                  backgroundColor: '#000000',
                  width: width * 0.9
                }
              ]}
            >
              <Text style={[styles.logintextbutton, styles.buttonText]}>
                Sign Up
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginBottom: 20
  },
  TextInput: {
    marginTop: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#000000',
    fontSize: 16,
  },
  ColorText: {
    color: '#BA55D3'
  },
  logintextbutton: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000000'
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#C2CAE6',
    marginTop: 4
  },
  googlebutton: {
    width: 320,
    backgroundColor: '#5434E4',
    paddingVertical: 8,
    borderRadius: 10
  },
});

export default SignInScreen;
