import React from 'react';
import { Icon } from 'native-base';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { commonStyles } from './styles/styles';
import Footer from '../Components/Footer';
import { INVENTORY, SETTING } from '../utils/constants';
import { ifIphoneX } from 'react-native-iphone-x-helper';


class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  Alert = () => { //What is this doing?
    Alert.alert(
      'Alert',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => this.props.navigation.navigate('SignInScreen')
        }
      ],
      { cancelable: false }
    );
  };

  render() {
    const {
      navigation: { navigate }
    } = this.props;
    return (
      <View style={[commonStyles.flex1, { backgroundColor: '#000000' }]}>
        <View
style={[commonStyles.alignSelfcenter, {
            ...ifIphoneX(
              {
                marginTop: 50
              },
              {
                marginTop: 30
              }
            )
          }]}
        >
          <Text
            style={[
              styles.TextColor,
              commonStyles.font18,
              commonStyles.textBold
            ]}
          >
            My Account
          </Text>
        </View>
        <View style={[commonStyles.alignSelfcenter, commonStyles.mt20]} />
        <View style={[commonStyles.alignSelfcenter, commonStyles.mt20]}>
          <Text
            style={[
              commonStyles.textWhite,
              commonStyles.font16,
              commonStyles.textBold
            ]}
          >
            Hussnain_sarwar
          </Text>
        </View>
        <View style={[commonStyles.flex1, commonStyles.mt20]}>
          <TouchableOpacity onPress={() => navigate(INVENTORY)}>
            <View
              style={[
                commonStyles.mr20,
                commonStyles.ml20,
                commonStyles.bbc,
                commonStyles.bbw
              ]}
            >
              <Text
                style={[
                  commonStyles.mb5,
                  styles.TextColor,
                  commonStyles.ml5
                ]}
              >
                Inventory
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate(SETTING)}>
            <View
              style={[
                commonStyles.bbc,
                commonStyles.bbw,
                commonStyles.ml20,
                commonStyles.mr20,
                commonStyles.mt20
              ]}
            >
              <Text
                style={[
                  commonStyles.mb5,
                  styles.TextColor,
                  commonStyles.ml5
                ]}
              >
                Settings
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={this.Alert}>
          <View
            style={{
              marginBottom: 20
            }}
          >
            <Icon
              type="MaterialIcons"
              name="power-settings-new"
              style={[
                commonStyles.textwhite,
                commonStyles.font18,
                commonStyles.ml30
              ]}
            />
            <Text style={[styles.TextColor, commonStyles.ml18]}>
              Logout
            </Text>
          </View>
        </TouchableOpacity>
        <Footer navigation={this.props.navigation} activeTab={'Account'} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  TextColor: {
    color: '#1562D0'
  },
  mr20: {
    marginRight: 20
  },

});

export default Account;
