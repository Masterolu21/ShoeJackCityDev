import React from 'react';
import { View, Text, Dimensions, TouchableOpacity, Image } from 'react-native';
import {MaterialIcons as Icon} from '@expo/vector-icons';
import Rating from 'react-native-easy-rating';
import { commonStyles } from './styles/styles';
import image from '../assets/Images/Air_Force_1_Low_Off-White_Volt.png';
import ColorPalette from 'react-native-color-palette';
import { ifIphoneX } from 'react-native-iphone-x-helper';

class TournamentRsvp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: ''
    };
  }
  render() {
    let selectedColor = '#C0392B';
    const { height, width } = Dimensions.get('window');
    const {
      navigation: { goBack }
    } = this.props;
    const uri =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVuX0uaDPSwnfS_Rue4cKqk7EhmXDqzpKl9MYeEWZiK9k6NtepIg';
    return (
      <View style={[commonStyles.flex1, { backgroundColor: '#FFFFFF' }]}>
        <View
style={{ flexDirection: 'row',
...ifIphoneX(
                  {
                    marginTop: 40
                  },
                  {
                    marginTop: 20
                  }
                )
               }}
        >
          <Icon
            onPress={() => {
              goBack();
            }}
            name="arrow-back"
            type="MaterialIcons"
            style={[commonStyles.font28, commonStyles.ml10, { color: 'black' }]}
          />
          <View style={[commonStyles.flex1, commonStyles.alignEnd, commonStyles.mr10,]}>
            <Icon
              name="drag-handle"
              type="MaterialIcons"
              style={[commonStyles.font28, commonStyles.ml5, { color: 'black' }]}
            />
          </View>
        </View>
        <View style={[commonStyles.mt10]}>
          <Image
            source={image}
            resizeMode={'contain'}
            style={[
              commonStyles.alignSelfcenter,
              {
                height: height * 0.3,
                width: width * 2.0
              }
            ]}
          />
        </View>
        <View style={{ marginLeft: 30 }}>
          <Text
            style={[commonStyles.textBold, commonStyles.font20, {color: 'black'}, {

              width: 200,

            }]}
          >
            Air Force 1 Low Off-White Volt
          </Text>
          <Text style={[commonStyles.mt10, { color: 'black' }]}>
            COLORWAY: VOLT/HYPER JADE-CONE-BLACK{' '}
          </Text>
          <Rating
            rating={Math.round(this.state.rating)}
            max={5}
            iconWidth={20}
            iconHeight={20}
          />
          <Text style={[commonStyles.mt30, { color: 'black' }]}>
            Be more lit than a lightning bolt while wearing Nike and Virgil’s Air Force 1 Low Off-White Volt. This AF1 comes with a volt upper, black Nike “Swoosh”, volt midsole, and volt sole.
          </Text>
          <Text style={[commonStyles.mt10, { color: 'black' }]}>Color Avalible</Text>

        </View>
        <View style={{ top: 20 }}>
        <ColorPalette
            onChange={color => (selectedColor = color)}
            value={selectedColor}
            colors={['#C0392B', '#E74C3C', '#9B59B6', '#8E44AD']}
            text={<Text>✔</Text>}
        />
          </View>
        <View
style={{ flexDirection: 'row',
alignItems: 'flex-end',
flex: 1,
...ifIphoneX(
                  {
                    marginBottom: 15
                  },
                  {
                    marginBottom: 0
                  }
                ) }}
        >
          <TouchableOpacity>
            <View
              style={[
                commonStyles.rsvpbutton,
                commonStyles.row,
                commonStyles.alignItemscenter,
                commonStyles.justifyCenter,
                {

                  borderTopRightRadius: 15,

                }
              ]}
            >
              <Text style={[commonStyles.rsvpbuttonText]}>RSVP</Text>
              <Icon
                name="arrow-forward"
                type="MaterialIcons"
                style={[
                  commonStyles.fontsize22,
                  commonStyles.ml10,
                  commonStyles.textwhite

                ]}
              />
            </View>
          </TouchableOpacity>
          <View
            style={[
              commonStyles.rsvpbutton2,
              commonStyles.alignCenter,
              commonStyles.justifyCenter,

            ]}
          >
            <Text
              style={[commonStyles.textBold, commonStyles.font20, commonStyles.textAligncenter, { color: 'black' },]}
            >
              $ 165.00
            </Text>
            <Text style={[{ color: 'black' }, commonStyles.font10]}>*Free Shipping</Text>
          </View>
        </View>
      </View>
    );
  }
}
export default TournamentRsvp;
