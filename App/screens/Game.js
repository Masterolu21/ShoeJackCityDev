import React from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  TextInput,
  Keyboard
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import { SearchBar } from 'react-native-elements';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import {MaterialIcons as Icon} from '@expo/vector-icons';
import { commonStyles } from './styles/styles';
import image from '../assets/Images/Air_Force_1_Low_Off-White_Volt.png';
import Footer from '../Components/Footer';
import { GAME } from '../utils/constants';


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
 }
    render () {
      const {
        navigation: { navigate }
      } = this.props;
      return (
            <View style={styles.container}>
                        <Footer navigation={this.props.navigation} activeTab={GAME} />
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

    // return (
    //   <View style={styles.container}>
    //       <Text style={styles.title}>
    //         You have no active games available
    //       </Text>
    //       <Footer navigation={this.props.navigation} activeTab={GAME} />
    //     </View>

//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   title: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   }
// });
//
// export default Game;
