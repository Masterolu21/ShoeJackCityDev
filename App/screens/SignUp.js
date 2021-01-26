import React from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
  Animated,
  Easing,
  StyleSheet
} from 'react-native';
import InputText from '../Components/InputText';
import {commonStyles } from './styles/styles';
import image from '../assets/Images/ShoeJackCityLogo.png';
import { EMAIL_REGIX } from '../utils/constants';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import {
  PASSWORD_ALERT,
  PASSWORD_MESSAGE,
  EMAIL_ALERT,
  USER_ALERT,
  USER_MESSAGE,
  SIGNUP_SUCCESSFULL,
  SIGNIN
} from '../utils/constants';

class SignUp extends React.Component {
  constructor(props) {
      super(props);
      this.spinValue = new Animated.Value(0)
      this.state = {
          email: '',
          password: '',
          firstname: '',
          lastname: '',
      };
  }

  componentDidMount() {
    this.spin();
  }
  spin() {
    this.spinValue.setValue(0)
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear
      }
    ).start(() => this.spin())
  }

  onSubmit = () => {
    if (this.state.name.match(/\d+/g) || this.state.name.length < 2) {
      Alert.alert('Alert', USER_MESSAGE);
    } else if (this.state.name.match(/\d+/g) || this.state.name.length > 25) {
      Alert.alert('Alert', USER_ALERT);
    } else if (!EMAIL_REGIX.test(this.state.email)) {
      Alert.alert('Alert', EMAIL_ALERT);
    } else if (this.state.password.length < 6) {
      Alert.alert('Alert', PASSWORD_ALERT);
    } else if (this.state.password.length > 15) {
      Alert.alert('Alert', PASSWORD_MESSAGE);
    } else {
      Alert.alert('Alert', SIGNUP_SUCCESSFULL);
    }
  };

  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })
    const {  width } = Dimensions.get('window');
    const {
      navigation: { navigate }
    } = this.props;

    return (
      <View style={[commonStyles.flex1, { backgroundColor: '#000000' }]}>
        <View style={[commonStyles.alignSelfcenter,{
            ...ifIphoneX(
              {
                marginTop: 50
              },
              {
                marginTop: 30
              }
            )
          }]}>
          <Animated.Image
              resizeMode={'contain'}
              style={{ transform: [{rotate: spin}], width: 200, height: 100}}
              source={image}
          />
        </View>
        <View>
          <InputText
            style={[
              commonStyles.font16,
              commonStyles.br12,
              commonStyles.mt20,

              {
                width: width * 0.9
              }
            ]}
            placeholder="FIRST NAME"
            autoCapitalize="none"
            value={this.state.firstname}
            onChangeText={name => this.setState({ firstname })}
          />
          <InputText
            style={[
              commonStyles.font16,
              commonStyles.br12,
              commonStyles.mt20,

              {
                width: width * 0.9
              }
            ]}
            placeholder="LAST NAME"
            autoCapitalize="none"
            value={this.state.lastname}
            onChangeText={name => this.setState({ lastname })}
          />
          <InputText
            style={[
              commonStyles.font16,
              commonStyles.br12,
              commonStyles.mt10,

              {
                width: width * 0.9
              }
            ]}
            placeholder="EMAIL ADDRESS"
            autoCapitalize="none"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />

          <InputText
            style={[
              commonStyles.mt10,
              commonStyles.br12,
              commonStyles.font16,

              {
                width: width * 0.9
              }
            ]}
            placeholder="PASSWORD"
            autoCapitalize="none"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            secureTextEntry
          />
          <InputText
            style={[
              commonStyles.mt10,
              commonStyles.br12,
              commonStyles.font16,

              {
                width: width * 0.9
              }
            ]}
            placeholder="Re-TypePASSWORD"
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
                styles.signUpButton,
                commonStyles.alignSelfcenter,

                {
                  backgroundColor: 'rgb(72, 244, 255)',
                  width: width * 0.73
                }
              ]}
            >
              <Text style={[styles.signUpTextButton]}>
                Sign Up
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[commonStyles.alignSelfcenter, commonStyles.mt30]}>
          <Text style={[commonStyles.textwhite]}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigate(SIGNIN)}>
            <Text
              style={[
                commonStyles.textwhite,
                commonStyles.textAligncenter,
                {textDecorationLine: 'underline' }
              ]}
            >
              Sign In
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    signUpButton: {
      width: 320,
      backgroundColor: 'rgb(72, 244, 255)',
      paddingVertical: 10,
      marginBottom: 5,
      borderRadius: 20
    },
    signUpTextButton: {
      fontSize: 16,
      textAlign: 'center',
      justifyContent: 'center',
      color: 'white',
      //fontFamily: 'Helvetica-Bold'
    }
  });

export default SignUp;
