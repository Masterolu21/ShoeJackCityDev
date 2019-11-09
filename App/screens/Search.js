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
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { commonStyles } from './styles/styles';
import image from '../assets/Images/Air_Force_1_Low_Off-White_Volt.png';
import Footer from '../Components/Footer';
import { SEARCH } from '../utils/constants';
import firebase from 'firebase'

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isloading: true,
      datasource: null,
      searchBarFocused: false,
      items: []
   };
 }

  async componentDidMount() {
    this.keyboardDidShow = Keyboard.addListener('keyboardDidShow',
    this.keyboardDidShow);
    this.keyboardWillShow = Keyboard.addListener('keyboardWillShow',
    this.keyboardWillShow);
    this.keyboardWillHide = Keyboard.addListener('keyboardWillHide',
    this.keyboardWillHide);

    const snapshot = await firebase.database().ref('products/').once('value')
    const products = snapshot.val()
    console.log('products: ', products)
    const items = []
    for (const product in products) {
      items.push(products[product])
    }
    this.setState({
      items
    })
  }

  keyboardDidShow = () => {
    this.setState({ searchBarFocused: true });
  }

  keyboardWillShow = () => {
    //This does not work for android
    this.setState({ searchBarFocused: true });
  }

  keyboardWillHide = () => {
    this.setState({ searchBarFocused: false });
  }
  render() {
    const { height, width } = Dimensions.get('window');
    const { search, items } = this.state;
    const {
      navigation: { navigate }
    } = this.props;

    return (
      <View style={[commonStyles.flex1, { backgroundColor: '#FFFFFF' }]}>
        <View style={[styles.Header, { height: height * 0.1, ...ifIphoneX({ marginTop: 50 }, { marginTop: 30 })}]}>
          <View styles={styles.flexDirection}>
            <Animatable.View
              animation="slideInRight" duration={500} style={[styles.SearchBar, styles.SearchBarText,
              { height: height * 0.05 }]}>
              <Animatable.View animation={this.state.searchBarFocused ? 'fadeInLeft' : 'fadeInRight'} duration={400}>
                <Icon name={this.state.searchBarFocused ? 'md-arrow-back' : 'search'} style={{ fontSize: 24 }} />
              </Animatable.View>
              <TextInput placeholder="Search" style={{ fontSize: 16, marginLeft: 10, flex: 1 }} />
            </Animatable.View>
            <Icon
              name="tune"
              type="MaterialIcons"
              style={[
                commonStyles.font26,
                styles.TextColor]}
            />
          </View>
        </View>
        <FlatList
          style={{ backgroundColor: this.state.searchBarFocused ? 'rgba(0,0,0,0.3)' : 'white', height: 500 }} //If this.state.searchBarFocused is focused set the background color is black if not set to white.
          showsVerticalScrollIndicator={false}
          numColumns={3}
          data={items}
          keyExtractor={(product) => product.name}
          renderItem={product => (
              <TouchableOpacity onPress={() => navigate('TournamentRsvp')} style={{ width: '33%', height: 150, borderWidth: 1, borderColor: 'red' }}>
                <View style={{ padding: 10, flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                  <Image source={{ uri: product.item.imageSource }} resizeMode={'contain'} style={{ flex: 3 }} />
                  <View style={{ height: 30, backgroundColor: 'red', borderRadius: 8, flexDirection: 'column', justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', color: 'black', fontSize: 10, padding: 4 }}>{product.item.name}</Text>
                  </View>
                </View>
              </TouchableOpacity>
          )}
        />
        <Footer navigation={this.props.navigation} activeTab={SEARCH} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  TextColor: {
    color: '#000000'
  },
  Header: {
    backgroundColor: 'yellow',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  SearchBar: {
    backgroundColor: 'white',
    borderRadius: 20
  },
  flexDirection: {
    flexDirection: 'row',
},
  SearchBarText: {
    padding: 5,
    flexDirection: 'row',
    fontFamily: 'Helvetica',
    alignItems: 'center',
    fontSize: 16,
  },
  Searchtext: {
    fontSize: 12,
    textAlign: 'center',
    color: '#ffffff'
  },
  search: {
    width: 130,
    borderRadius: 25,
    backgroundColor: '#000000'
  },
});

export default Search;
