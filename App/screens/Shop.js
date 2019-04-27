import React from 'react';
import { Icon, Badge } from 'native-base';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  FlatList
} from 'react-native';
import image from '../assets/Images/ShoeJackCityLogo.png';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import Modal from 'react-native-modal';

class Shop extends React.Component {
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

export default Shop;
