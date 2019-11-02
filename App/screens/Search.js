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


class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isloading: true,
      datasource: null,
      searchBarFocused: false,
      items: [
        {
          Eventname: 'Air Force 1 Low Off-White Volt' //What is this doing?
        },
        {
          Eventname: 'Air Force 1 Low Off-White Volt'
        },
        {
          Eventname: 'Air Force 1 Low Off-White Volt'
        },
        {
          Eventname: 'Air Force 1 Low Off-White Volt'
        }
      ],
      item: [ //What is this doing?
       {
         time: '11AM'
       },
        {
         time: '10AM'
        },
        {
         time: '21PM'
       },
       {
         time: '3AM'
       }
     ],
   };
 }
 componentDidMount() {
   return fetch('');
   this.keyboardDidShow = Keyboard.addListener('keyboardDidShow',
   this.keyboardDidShow);
   this.keyboardWillShow = Keyboard.addListener('keyboardWillShow',
   this.keyboardWillShow);
   this.keyboardWillHide = Keyboard.addListener('keyboardWillHide',
   this.keyboardWillHide);
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
    const { search } = this.state;
    const {
      navigation: { navigate }
    } = this.props;

    return (
      <View style={[commonStyles.flex1, { backgroundColor: '#FFFFFF' }]}>
        <View
            style={[styles.Header, {
              height: height * 0.1,
                ...ifIphoneX(
                  {
                    marginTop: 50
                  },
                  {
                    marginTop: 30
                  }
                )
              }
            ]
            }
        >
          <View styles={styles.flexDirection}>
          <Animatable.View
animation="slideInRight" duration={500} style={[styles.SearchBar, styles.SearchBarText, {
            height: height * 0.05
          }
        ]
      }
          >
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
          styles.TextColor
        ]}
      />
          </View>
        </View>
        <FlatList
          style={{ backgroundColor: this.state.searchBarFocused ? 'rgba(0,0,0,0.3)' : 'white' }} //If this.state.searchBarFocused is focused set the background color is black if not set to white.
          showsVerticalScrollIndicator={false}
          data={this.state.items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={item => (
            <View
              style={[commonStyles.row, commonStyles.bbw3, commonStyles.brw3]}
            >
              <View
                style={[
                  commonStyles.column,
                  commonStyles.justifyCenter,
                  {
                    width: width * 0.11,
                    height: height * 0.21,
                    backgroundColor: '#A9A9A9',

                    borderBottomRightRadius: 10,
                    borderTopRightRadius: 10
                  }
                ]}
              >
                <Icon
                  type="MaterialIcons"
                  name="alarm"
                  style={[
                    commonStyles.textwhite,
                    commonStyles.font18,
                    commonStyles.alignSelfcenter
                  ]}
                />
                <Text
                  style={[
                    commonStyles.textwhite,
                    commonStyles.fontsize12,
                    commonStyles.alignSelfcenter
                  ]}
                >
                  10PM
                </Text>
              </View>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={this.state.item}
                keyExtractor={(item, index) => index.toString()}
                renderItem={item => (
                  <View
                    style={[
                      commonStyles.row,
                      commonStyles.ml20,
                      commonStyles.brw3
                    ]}
                  >
                    <TouchableOpacity
                      onPress={() => navigate('TournamentRsvp')}
                    >
                      <View>
                        <Image
                          source={image}
                          resizeMode={'contain'}
                          style={[
                            commonStyles.mr20,
                            commonStyles.alignSelfcenter,
                            {
                              height: height * 0.15,
                              width: width * 0.3
                            }
                          ]}
                        />
                        <View
                          style={[
                            styles.search,
                            commonStyles.alignSelfcenter,
                            commonStyles.mr20
                          ]}
                        >
                          <Text
                            style={[
                              styles.Searchtext,
                              commonStyles.alignSelfcenter,
                              { width: width * 0.31 }
                            ]}
                          >
                            Air Force 1 Low Off-White Volt
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
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
