import React from "react";
import { View, Image, Dimensions, SafeAreaView } from "react-native";
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
      <SafeAreaView style={{flex: 1, backgroundColor: '#000000'}}>
      <View style={[commonStyles.flex1, commonStyles.backgroundBlack]}>
      <Tabs
        tabContainerStyle={[
          commonStyles.elevation0,
          { borderBottomWidth: 0 }
        ]}
        tabBarUnderlineStyle={[
          commonStyles.tabBarstyle,
          commonStyles.marginTop15,
          { marginLeft: width * 0.23 }
        ]}
      >
        <Tab
          heading="Sign In"
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
          <SignInScreen {...this.props} />
        </Tab>
        <Tab
          heading="Sign Up"
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
          <SignUp {...this.props} />
        </Tab>
      </Tabs>
    </View>
    </SafeAreaView>
  );
}
}

export default LoginScreen;
