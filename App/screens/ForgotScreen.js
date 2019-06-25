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
import {  commonStyles } from './styles/styles';
import image from '../assets/Images/ShoeJackCityLogo.png';
import {
  EMAIL_REGIX,
  EMAIL_ALERT,
  EMAIL_SENT,
  SIGNUP
} from '../utils/constants';
import { ifIphoneX } from 'react-native-iphone-x-helper'


class ForgotScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
  }

  onSubmit = () => {

    if (!EMAIL_REGIX.test(this.state.email)) {
      Alert.alert('Alert', EMAIL_ALERT);
    } else {
      Alert.alert('Alert', EMAIL_SENT);
    }
  };

  render() {
    const { width } = Dimensions.get('window');
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
            placeholder="Email Address"
            autoCapitalize="none"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
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
                Submit
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[commonStyles.alignSelfcenter, commonStyles.mt30]}>
          <Text style={[commonStyles.textwhite]}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigate(SIGNUP)}>
            <Text
              style={[
                commonStyles.textwhite,
                commonStyles.textAlign,
                { textDecorationLine: 'underline' }
              ]}
            >
              Create new account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ForgotScreen;
