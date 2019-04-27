import React from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert
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
    this.state = {
      email: '',
      password: '',
      name: ''
    };
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
    const {  width } = Dimensions.get('window');
    const {
      navigation: { navigate }
    } = this.props;

    return (
      <View style={[commonStyles.flex1, { backgroundColor: '#FFFFFF' }]}>
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
          <Image
            resizeMode={'contain'}
            style={{ height: 150, width: 150 }}
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
            placeholder="Username"
            autoCapitalize="none"
            value={this.state.name}
            onChangeText={name => this.setState({ name })}
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
            placeholder="Email Address"
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
                  backgroundColor: '#f70000',
                  width: width * 0.9
                }
              ]}
            >
              <Text style={[commonStyles.logintextbutton, commonStyles.white]}>
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

export default SignUp;
