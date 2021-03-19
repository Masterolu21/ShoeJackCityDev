import React from 'react';
import { View, Text, Dimensions, TouchableOpacity, Image, FlatList } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import Rating from 'react-native-easy-rating';
import { commonStyles } from './styles/styles';
import image from '../assets/Images/Air_Force_1_Low_Off-White_Volt.png';
import ColorPalette from 'react-native-color-palette';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { showCustomAlert } from '../utils/index'
import { showMessage, hideMessage } from "react-native-flash-message";
import moment from 'moment'

const sizes = [
  '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5',
  '11', '11.5', '12', '12.5', '13', '13.5', '14', '14.5', '15', '15.5', '16'
]

class TournamentRsvp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSize: '5',
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

    const { time, product } = this.props.navigation.state.params
    const { selectedSize } = this.state
    return (
      <View style={[{ width, height, backgroundColor: '#FFFFFF' }]}>
        <View
          style={{
            flexDirection: 'row',
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
            // source={image}
            source={{
              uri: product.imageSource
            }}
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
            style={[commonStyles.textBold, commonStyles.font20, { color: 'black' }, {

              width: 200,

            }]}
          >{product.name}</Text>
          <Text style={[commonStyles.mt10, { marginBottom: product.colorway && 10, color: 'black' }]}>
            {product.colorway && `COLORWAY: ${product.colorway}` || ""}
          </Text>
          <Rating
            rating={Math.round(this.state.rating)}
            max={5}
            iconWidth={30}
            iconHeight={30}
          />
          <Text style={[commonStyles.mt30, { color: 'black', fontSize: 16 }]}>{product.description}</Text>
        </View>
        <TouchableOpacity
          style={commonStyles.rsvpbutton}
          onPress={() => {
            showCustomAlert(
              'Would you like to RSVP for this tournament.',
              '',
              "Yes",
              "No",
              () => { },
              () => {
                showMessage({
                  message: "Air Force 1 Low Off-White Volt",
                  description: `Tournament Starts at ${time}, ${moment().format('MMMM DD, YYYY')}`,
                  type: "success",
                });
              }
            )
          }}
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
        </TouchableOpacity>
        {/* <View style={{ marginTop: 30 }}></View> */}
        <View style={{ position: 'absolute', bottom: 30 }}>
          <FlatList
            style={{ backgroundColor: '#000000f2', }}
            showsHorizontalScrollIndicator={false}
            data={sizes}
            horizontal
            renderItem={({ item: size }) => (
              <TouchableOpacity
                style={{
                  paddingVertical: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 80,
                }}
                onPress={() => { this.setState({ selectedSize: size }) }}
              >
                <Text style={{
                  fontSize: 25,
                  color: selectedSize == size ? "white" : '#7f7d80',
                  fontWeight: selectedSize == size ? 'bold' : '400'
                }}>{size}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

      </View>
    );
  }
}
export default TournamentRsvp;
