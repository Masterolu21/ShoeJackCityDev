import React from 'react';
import {MaterialIcons as Icon} from '@expo/vector-icons';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { commonStyles } from './styles/styles';
import Footer from '../Components/Footer';
import { INVENTORY, SETTING } from '../utils/constants';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../reducers/user/Actions';


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
          onPress: () => {
              this.props.setUserID('');
              this.props.navigation.navigate('SignInScreen');
          }
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
      <View style={[commonStyles.flex1, { backgroundColor: '#FFFFFF' }]}>
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
              styles.TextColor,
              styles.HeaderStyle,
              commonStyles.textBold
            ]}
          >
            {this.props.user.username}
          </Text>
        </View>
        <View style={[commonStyles.flex1, commonStyles.mt20]}>
          <TouchableOpacity onPress={() => navigate(INVENTORY)}>
            <View
              style={[
                commonStyles.mr20,
                commonStyles.ml20,
                styles.borderStyle
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
                styles.borderStyle,
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
        <TouchableOpacity
        onPress={this.Alert}
        >
          <View
            style={[
              styles.row,
              styles.borderStyle,
              commonStyles.ml20,
              commonStyles.mr20,
              commonStyles.mt20
            ]}
          >
            <Text>
            <Icon
              type="MaterialIcons"
              name="power-settings-new"
              style={[
                styles.logoutColor,
                styles.ml20,
                styles.iconSize

              ]}
              />
              </Text>
              <Text style={[styles.logOutText, styles.ml10, styles.mb5, styles.fontStyle]}>
              LOG OUT
              </Text>
          </View>
        </TouchableOpacity>
        </View>
        <Footer navigation={this.props.navigation} activeTab={'Account'} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  TextColor: {
    color: 'black',
    fontFamily: 'Helvetica',
    fontSize: 16
  },
  tabText: {
    color: 'black',
    fontFamily: 'Helvetica',
    fontSize: 18,
    marginLeft: 20
  },
  logOutText: {
    fontSize: 18,
    color: 'red',
    fontFamily: 'Helvetica',
    fontSize: 18,
    marginRight: 10
  },
  HeaderStyle: {
    fontSize: 24,
    color: 'black'
  },
  logoutColor: {
    color: 'red',
  },
  row: {
    flexDirection: 'row',
  },
  iconSize: {
    fontSize: 20,
    paddingLeft: 10
  },
  borderStyle: {
    borderBottomWidth: 1,
    color: 'grey'
  },
  mr20: {
    marginRight: 20
  },
  mr10: {
    marginRight: 10
  },
  ml10: {
    marginLeft: 10
  },
  mb5: {
    marginBottom: 5
  },
  fontStyle: {
    fontFamily: 'Helvetica',
    alignItems: 'center',
    justifyContent: 'center'
  },

});

function mapStateToProps(state, ownProps) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setUserID: bindActionCreators(userActions.setUserID, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);
