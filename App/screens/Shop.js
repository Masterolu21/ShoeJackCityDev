import React from 'react';
import { Icon, Badge, Tab, Tabs } from 'native-base';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  FlatList,
  SafeAreaView,
  Dimensions,
  ScrollView
} from 'react-native';
import image from '../assets/Images/ShoeJackCityLogo.png';
import { commonStyles } from './styles/styles';
import SignInScreen from "./SignInScreen";
import Footer from "../Components/Footer";
import SignUp from "./SignUp";
import { ifIphoneX } from 'react-native-iphone-x-helper';
import Modal from 'react-native-modal';
import ShopItems from "./ShopItems";
import ShopAttack from "./ShopAttack";
import ShopDefend from "./ShopDefend";
import { SHOP } from '../utils/constants';


const { width, height } = Dimensions.get("window");

class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
items: [
  {
  Eventname: 'Air Force 1 Low Off-White Volt'
},
  {
  Eventname: 'Air Force 1 Low Off-White Volt'
  },
  {
    Eventname: 'Air Force 1 Low Off-White Volt'
  },
  {
    Eventname: 'Air Force 1 Low Off-White Volt'
  },
  {
    Eventname: 'Air Force 1 Low Off-White Volt'
  },
  {
    Eventname: 'Air Force 1 Low Off-White Volt'
  },
  {
    Eventname: 'Air Force 1 Low Off-White Volt'
  },
]


    };
  }

  render() {
    const {
      navigation: { navigate }
    } = this.props;

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#000000'}}>
      <Tabs
        tabContainerStyle={[
          commonStyles.elevation0,
        ]}
        tabBarUnderlineStyle={[
          commonStyles.tabBarstyle,
          commonStyles.marginTop15,
        ]}
      >
        <Tab
          heading="Attack"
          tabStyle={[commonStyles.tabBackgroundcolor]}
          textStyle={[
            commonStyles.textBold,
            commonStyles.fontsize16,
            commonStyles.tabtextcolor
          ]}
          activeTabStyle={[commonStyles.tabBackgroundcolor]}
          activeTextStyle={[
            commonStyles.fontsize16,
            commonStyles.tabactivetextcolor
          ]}
        >
          <ShopAttack {...this.props} />
        </Tab>
        <Tab
          heading="Defend"
          tabStyle={[commonStyles.tabBackgroundcolor]}
          textStyle={[
            commonStyles.fontsize16,
            commonStyles.textBold,
            commonStyles.tabtextcolor
          ]}
          activeTabStyle={[commonStyles.tabBackgroundcolor]}
          activeTextStyle={[
            commonStyles.fontsize16,
            commonStyles.tabactivetextcolor
          ]}
        >
          <ShopDefend {...this.props} />
        </Tab>
        <Tab
          heading="Items"
          tabStyle={[commonStyles.tabBackgroundcolor]}
          textStyle={[
            commonStyles.fontsize16,
            commonStyles.textBold,
            commonStyles.tabtextcolor
          ]}
          activeTabStyle={[commonStyles.tabBackgroundcolor]}
          activeTextStyle={[
            commonStyles.fontsize16,
            commonStyles.tabactivetextcolor
          ]}
        >
          <ShopItems {...this.props} />
        </Tab>
      </Tabs>
      <Footer navigation={this.props.navigation} activeTab={SHOP} />
    </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

export default Shop;
