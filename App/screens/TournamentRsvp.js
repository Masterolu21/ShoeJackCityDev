import React from 'react';
import { View, Text, Dimensions, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'native-base';
import Rating from 'react-native-easy-rating';
import { commonStyles } from './styles/styles';
import image from '../assets/Images/AF1OW_Volt.png';
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
            name="done"
            type="MaterialIcons"
            style={[commonStyles.font28, commonStyles.ml10, { color: 'white' }]}
          />
          <View style={[commonStyles.flex1, commonStyles.alignEnd, commonStyles.mr10,]}>
            <Icon
              name="drag-handle"
              type="MaterialIcons"
              style={[commonStyles.font28, commonStyles.ml5, commonStyles.textWhite]}
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
            style={[commonStyles.textBold, commonStyles.font20, commonStyles.textWhite, {

              width: 200,

            }]}
          >
            Nike Pegasus 35 Shield Mind by You
          </Text>
          <Text style={[commonStyles.mt10, commonStyles.textWhite]}>
            Women Running Shoes{' '}
          </Text>
          <Rating
            rating={Math.round(this.state.rating)}
            max={5}
            iconWidth={20}
            iconHeight={20}
          />
          <Text style={[commonStyles.mt30, commonStyles.textWhite]}>
            Nike Pegasus 35 Shield Mind by You is build to runner at every level
          </Text>
          <Text style={[commonStyles.mt10, commonStyles.textWhite]}>Color Avalible</Text>

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
                  commonStyles.textWhite

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
              style={[commonStyles.textBold, commonStyles.font20, commonStyles.textAligncenter, commonStyles.textWhite,]}
            >
              $ 165.00
            </Text>
            <Text style={[commonStyles.textWhite, commonStyles.font10]}>*Free Shipping</Text>
          </View>
        </View>
      </View>
    );
  }
}
export default TournamentRsvp;
