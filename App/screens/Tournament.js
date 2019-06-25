import React from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import {MaterialIcons as Icon} from '@expo/vector-icons';
import { commonStyles } from './styles/styles';
import image from '../assets/Images/Air_Force_1_Low_Off-White_Volt.png';
import Footer from '../Components/Footer';
import { TOURNAMENT } from '../utils/constants';


class Tournament extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      ]
    };
  }

  render() {
    const { height, width } = Dimensions.get('window');
    const {
      navigation: { navigate }
    } = this.props;

    return (
      <View style={[commonStyles.flex1, { backgroundColor: '#000000' }]}>
        <View style={{ backgroundColor: '#000000', height: height * 0.15 }}>
          <Text
            style={[
              commonStyles.textAligncenter,
              commonStyles.font18,
              commonStyles.textwhite,
               {
                ...ifIphoneX(
                  {
                    marginTop: 50
                  },
                  {
                    marginTop: 30
                  }
                )
              }
            ]}
          >
            TOURNAMENT INDEX
          </Text>
          <View style={[commonStyles.flex1, commonStyles.alignEnd]}>
            <Icon
              name="tune"
              type="MaterialIcons"
              style={[
                commonStyles.font26,
                commonStyles.textwhite,
                { marginRight: 5 }
              ]}
            />
          </View>
        </View>
        <FlatList
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
        <Footer navigation={this.props.navigation} activeTab={TOURNAMENT} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  TextColor: {
    color: '#000000'
  },


});

export default Tournament;
