import React from "react";
import { View, Image, Dimensions, SafeAreaView, StyleSheet } from "react-native";
//using native base tabs
import { Tab, Tabs, Header } from "native-base";
import { commonStyles } from "./styles/styles";
// import shoejackcity image
import image from "../assets/Images/logo_02_four_color.png";
import SignInScreen from "./SignInScreen";
import SignUp from "./SignUp";

const { width, height } = Dimensions.get("window");
class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = {
    headerMode: 'none'
  }

  render() {
    return (
      // <SafeAreaView style={{flex: 1, backgroundColor: '#000000'}}>
      <View style={styles.styleView}>
      <Tabs
        tabContainerStyle={[
          commonStyles.elevation0,
          commonStyles.marginTop15,
          { borderBottomWidth: 0 }
        ]}
        tabBarUnderlineStyle={[
          commonStyles.tabBarstyle,
          { marginLeft: width * 0.23 }
        ]}
      >
        <Tab
          heading="Sign In"
          tabStyle={[styles.tabBackgroundcolor]}
          textStyle={[
            commonStyles.textBold,
            commonStyles.fontsize16,
            commonStyles.tabtextcolor
          ]}
          activeTabStyle={[styles.tabBackgroundcolor]}
          activeTextStyle={[
            commonStyles.fontsize16,
            commonStyles.tabactivetextcolor
          ]}
        >
          <SignInScreen {...this.props} />
        </Tab>
        <Tab
          heading="Sign Up"
          tabStyle={[styles.tabBackgroundcolor]}
          textStyle={[
            commonStyles.fontsize16,
            commonStyles.textBold,
            commonStyles.tabtextcolor
          ]}
          activeTabStyle={[styles.tabBackgroundcolor]}
          activeTextStyle={[
            commonStyles.fontsize16,
            commonStyles.tabactivetextcolor
          ]}
        >
          <SignUp {...this.props} />
        </Tab>
      </Tabs>
    </View>
    // </SafeAreaView>
  );
}
}

const styles = StyleSheet.create({
  styleView:{
    flex: 1,
    backgroundColor: 'rgb(72, 244, 255)'
  },
  tabBackgroundcolor: {
    backgroundColor: 'rgb(72, 244, 255)'
  },
});

export default LoginScreen;
