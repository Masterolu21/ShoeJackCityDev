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
import { TOURNAMENT } from '../utils/constants';
import AppImage from '../Components/AppImage';
import firebase from 'firebase'

class Tournament extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBarFocused: false,
      slots:[
        {
          time: '12AM'
        },
        {
          time: '1AM'
        },
        {
          time: '2AM'
        },
        {
          time: '3AM'
        },
        {
          time: '4AM'
        },
        {
          time: '5AM'
        },
        {
          time: '6AM'
        },
        {
          time: '7AM'
        },
        {
          time: '8AM'
        },
        {
          time: '9AM'
        },
        {
          time: '10AM'
        },
        {
          time: '11AM'
        },
        {
          time: '12PM'
        },
        {
          time: '1PM'
        },
        {
          time: '2PM'
        },
        {
          time: '3PM'
        },
        {
          time: '4PM'
        },
        {
          time: '5PM'
        },
        {
          time: '6PM'
        },
        {
          time: '7PM'
        },
        {
          time: '8PM'
        },
        {
          time: '9PM'
        },
        {
          time: '10PM'
        },
        {
          time: '11PM'
        }
      ],
      products:[],
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
 async componentDidMount() {
    const snapshot = await firebase.database().ref('products/').once('value')
    const products = snapshot.val()
    const items = []
    for (const product in products) {
      items.push(products[product])
    }
    this.setState({
      items,
      products: items
    })

    this.keyboardDidShow = Keyboard.addListener('keyboardDidShow',
      this.keyboardDidShow)
    this.keyboardWillShow = Keyboard.addListener('keyboardWillShow',
      this.keyboardWillShow)
    this.keyboardWillHide = Keyboard.addListener('keyboardWillHide',
      this.keyboardWillHide)
  }

  keyboardDidShow = () => {
    this.setState({ searchBarFocused: true })
  }

  keyboardWillShow = () => {
    //This does not work for android
    this.setState({ searchBarFocused: true })
  }

  keyboardWillHide = () => {
    this.setState({ searchBarFocused: false })
  }
  render() {
    const { height, width } = Dimensions.get('window');
    const { search, products } = this.state;
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
              animation="slideInRight"
              duration={500} style={[
                styles.SearchBar,
                styles.SearchBarText,
                {

                  height: height * 0.05
                }
              ]
              }
            >
              <Animatable.View animation={this.state.searchBarFocused ? "fadeInLeft" : "fadeInRight"} duration={400}>
                <Icon name={this.state.searchBarFocused ? "md-arrow-back" : "search"} style={{ marginLeft: 10, fontSize: 24 }} />
              </Animatable.View>
              <TextInput placeholder="Search" style={{ fontSize: 16, marginLeft: 10, flex: 1 }} />
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
          style={{ backgroundColor: this.state.searchBarFocused ? 'rgba(0,0,0,0.3)' : 'white' }} //If this.state.searchBarFocused is focused set the background color is black if not set to white.
          showsVerticalScrollIndicator={false}
          data={this.state.slots}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item:{time}}) => (
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
                  {time}
                </Text>
              </View>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={this.state.products}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <View
                    style={[
                      commonStyles.row,
                      commonStyles.ml20,
                      commonStyles.brw3
                    ]}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        navigate('TournamentRsvp', {time, product: item })
                      }}
                    >
                      <View>
                        <AppImage
                          source={{uri:item.imageSource}}
                          imageStyle={[
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
                            commonStyles.tournament,
                            commonStyles.alignSelfcenter,
                            commonStyles.mr20
                          ]}
                        >
                          <Text
                            style={[
                              commonStyles.tournamenttext,
                              commonStyles.alignSelfcenter,
                              { width: width * 0.31 }
                            ]}
                          >
                            {item.name}
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
        <Footer navigation={this.props.navigation} activeTab={TOURNAMENT} />
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
    borderRadius: 20,
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
  }
});

export default Tournament;
