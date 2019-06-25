import React from 'react';
import { Icon, Badge } from 'native-base';
import {
  View,
  Text,
  StyleSheet,

} from 'react-native';
import Footer from '../Components/Footer';
import { GAME } from '../utils/constants';
import image from '../assets/Images/ShoeJackCityLogo.png';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import Modal from 'react-native-modal';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.title}>
            You have no active games available
          </Text>
          <Footer navigation={this.props.navigation} activeTab={'Game'} />
        </View>
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

export default Game;
