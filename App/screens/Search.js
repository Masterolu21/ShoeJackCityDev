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
import AppImage from '../Components/AppImage';
import { SEARCH } from '../utils/constants';
import firebase from 'firebase'

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isloading: true,
      datasource: null,
      searchBarFocused: false,
      items: [],
      search: '',
      allItems: []
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
    const items = []
    for (const product in products) {
      items.push(products[product])
    }
    this.setState({
      items,
      allItems: items
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

  onChangeSearchText = (searchInput) => {
    const { allItems } = this.state
    // if empty search string then show all items
    if (searchInput === '') {
      this.setState({
        items: allItems,
        search: searchInput
      })
    } else {
      const filteredProducts = allItems.filter((product) => {
        if (product.name.includes(searchInput)) {
          return true
        }
      })
      this.setState({
        items: filteredProducts,
        search: searchInput
      })
    }
  }

  render() {
    const { height, width } = Dimensions.get('window');
    const { search, items } = this.state;
    const {
      navigation: { navigate }
    } = this.props;
    return (
      <View style={[commonStyles.flex1, { backgroundColor: '#FFFFFF' }]}>
        <View style={[styles.Header, { height: height * 0.1, ...ifIphoneX({ marginTop: 50 }, { marginTop: 30 }) }]}>
          <View styles={styles.flexDirection}>
            <Animatable.View
              animation="slideInRight" duration={500} style={[styles.SearchBar, styles.SearchBarText,
              { height: height * 0.05 }]}>
              <Animatable.View animation={this.state.searchBarFocused ? 'fadeInLeft' : 'fadeInRight'} duration={400}>
                <Icon name={this.state.searchBarFocused ? 'md-arrow-back' : 'search'} style={{ marginLeft: 10, fontSize: 24 }} />
              </Animatable.View>
              <TextInput
                placeholder="Search"
                style={{ fontSize: 16, marginLeft: 10, flex: 1 }}
                value={search}
                onChangeText={(input) => this.onChangeSearchText(input)}
              />
            </Animatable.View>
            <Icon
              name="tune"
              type="MaterialIcons"
              style={[
                commonStyles.font26,
                styles.TextColor,
                {
                  position: 'absolute',
                  right: 10,
                  top: 10
                }
              ]}
            />
          </View>
        </View>
        <FlatList
          style={{ /* backgroundColor: this.state.searchBarFocused ? 'rgba(0,0,0,0.3)' : 'white',*/ }} //If this.state.searchBarFocused is focused set the background color is black if not set to white.
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={items}
          keyExtractor={(product) => product.name}
          renderItem={product => (
            <TouchableOpacity onPress={() => navigate('TournamentRsvp', { product:product.item })} style={{ width: '50%', height: 150 }}>
              <View style={{ padding: 10, flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                <AppImage
                  source={{ uri: product.item.imageSource || `${product.item.imageSource}_small.jpg` }}
                  imageStyle={{ width: '100%', height: 100 }}
                />
                <View style={{ height: 30, flexDirection: 'column', justifyContent: 'center' }}>
                  <Text style={{ fontWeight: 'bold', textAlign: 'center', color: 'black', fontSize: 10 }}>{product.item.name}</Text>
                  <Text style={{ textAlign: 'center', color: 'black', fontSize: 10, color: '#444444' }}>${product.item.price}</Text>
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
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  SearchBar: {
    backgroundColor: '#f5f5f5',
    borderRadius: 20
  },
  flexDirection: {
    flexDirection: 'row',
  },
  SearchBarText: {
    padding: 5,
    flexDirection: 'row',
    //fontFamily: 'Helvetica',
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
