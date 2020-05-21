import React from 'react';
import { Badge } from 'native-base';
import {MaterialIcons as Icon} from '@expo/vector-icons';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  FlatList
} from 'react-native';
import image from '../assets/Images/ShoeJackCityLogo.png';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import Modal from 'react-native-modal';


import { commonStyles } from './styles/styles';

class ShopItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      isModalVisible: false,
      show: true,
      items: [
        {
          type: 'abc',
          Eventname: 'SUPER INCUBABTOR'
        },
        {
          type: 'abc',
          Eventname: 'SUPER INCUBABTOR'
        },
        {
          type: 'abc',
          Eventname: 'SUPER INCUBABTOR'
        },
        {
          type: 'abc',
          Eventname: 'SUPER INCUBABTOR'
        },
        {
          type: 'abc',
          Eventname: 'SUPER INCUBABTOR'
        },
        {
          type: 'abc',
          Eventname: 'SUPER INCUBABTOR'
        },
        {
          type: 'abc',
          Eventname: 'SUPER INCUBABTOR'
        },
        {
          type: 'abc',
          Eventname: 'SUPER INCUBABTOR'
        },
        {
          type: 'abc',
          Eventname: 'SUPER INCUBABTOR'
        }
      ]
    };
  }

  IncrementItem = () => {
    console.log(this.state.tempNum);
    if(this.state.tempNum){
          let sum = parseInt(this.state.counter) + parseInt(this.state.tempNum);
          if(sum >=1 && sum <=99){
              this.setState({ counter: sum, tempNum: '' });
          }else{
            console.log("Number should be between 1 and 99");
            this.setState({error:"Number should be between 1 and 99"})
          }
    }
  else{
    this.setState({ counter: this.state.counter + 1 });
  }
}
  DecrementItem = () => {
    this.setState({ counter: this.state.counter - 1 });
  }

  handleOnTextChange = (e) => {
         this.setState({tempNum: e.target.value})
         console.log(this.state.tempNum)
       }

  _toggleModal = () =>
  this.setState({ isModalVisible: !this.state.isModalVisible });


  render() {
    const {
      navigation: { goBack }
    } = this.props;
    const uri =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVuX0uaDPSwnfS_Rue4cKqk7EhmXDqzpKl9MYeEWZiK9k6NtepIg';

    const { height, width } = Dimensions.get('window');

    return (
        <View
          style={[
            commonStyles.flex1,
            { backgroundColor: '#FFFFFF', marginHorizontal: 5 }
          ]}
        >
          <View
            style={[

              commonStyles.zIndex,
              commonStyles.positionabsolute,
              commonStyles.right0,
              {
                width: 100,
                height: 20,
                backgroundColor: '#f70000',
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                ...ifIphoneX(
                  {
                    top: 60
                  },
                  {
                    top: 40
                  }
                )
              }
            ]}
          >
            <View style={[commonStyles.row]}>
              <Icon
                type="MaterialIcons"
                name="monetization-on"
                style={[
                  commonStyles.font16,
                  commonStyles.alignSelfcenter,
                  commonStyles.ml5,
                  {
                    color: '#C8A74D'
                  }
                ]}
              />

              <Text style={[commonStyles.ml5, { color: '#C8A74D' }]}>23</Text>
            </View>
          </View>

          <View
style={[commonStyles.ml10, { ...ifIphoneX(
                  {
                    paddingTop: 40
                  },
                  {
                    paddingTop: 20
                  }
                ) }]}
          >
            <Icon
              onPress={() => {
                goBack();
              }}
              type="MaterialIcons"
              name="arrow-back"
              style={[commonStyles.font18, commonStyles.textwhite]}
            />
            {/* <Text style={[commonStyles.textblack]}>Message</Text> */}
          </View>
          <Modal
            backdropOpacity={0.9}
            isVisible={this.state.isModalVisible}
            backdropColor={'#FFFFFF'}
          >
            <View
              style={[
                commonStyles.zIndex,
                commonStyles.positionabsolute,
                commonStyles.right0,
                commonStyles.top20,
                {
                  width: width * 0.15,
                  height: height * 0.025,
                  backgroundColor: '#f70000',
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10
                }
              ]}
            >
              <View style={[commonStyles.row]}>
                <Icon
                  type="MaterialIcons"
                  name="monetization-on"
                  style={[
                    commonStyles.font16,
                    commonStyles.alignSelfcenter,
                    commonStyles.ml5,
                    {
                      color: '#C8A74D'
                    }
                  ]}
                />
                <Text style={[commonStyles.ml5, { color: '#C8A74D' }]}>23</Text>
              </View>
            </View>
            <Badge
              onPress={this._toggleModal}
              style={[
                commonStyles.closeIcons,
                commonStyles.zIndex,
                commonStyles.positionabsolute,
                commonStyles.alignSelfcenter,
                commonStyles.justifyCenter,
                commonStyles.alignItemscenter,
                commonStyles.bottom0
              ]}
            >
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#87EFC7',
                  borderRadius: 25
                }}
              >
                <Icon
                  onPress={this._toggleModal}
                  type="MaterialIcons"
                  name="close"
                  style={[
                    commonStyles.font18,
                    commonStyles.margin5,
                    {
                      color: '#87EFC7'
                    }
                  ]}
                />
              </View>
            </Badge>
            <Image
              resizeMode={'contain'}
              style={[
                commonStyles.alignSelfcenter,
                commonStyles.zIndex,
                commonStyles.top15,
                {
                  height: 150,
                  width: 150
                }
              ]}
              source={image}
            />
            <View style={{ backgroundColor: 'white', borderRadius: 5 }}>
              <View style={[commonStyles.mt20, commonStyles.ml10]}>
                <Text style={[commonStyles.font16, commonStyles.textBold]}>
                  RUNE BLAST
                </Text>
                <Text style={[commonStyles.font14, commonStyles.mb20]}>
                  A standard move that delivers swift slash attacks.
                  Damage: 100
                  MP: 50
                </Text>
              </View>
              <View style={[commonStyles.mt10, commonStyles.mb20]}>
                <View style={[commonStyles.row, commonStyles.alignSelfcenter]}>
                  <TouchableOpacity onPress={this.IncrementItem}>

                    <View
                      style={[styles.counterButton]}
                    >
                    <Icon
                      type="MaterialIcons"
                      name="add"
                      size={40}
                      style={[
                        commonStyles.alignSelfcenter,
                        commonStyles.justifyCenter
                      ]}
                      />
                      <Text
                        style={[
                          commonStyles.inventrytextbutton,
                          commonStyles.white,
                          {}
                        ]}
                      >
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <View
                    style={[
                      styles.inventrybar,
                      styles.alignSelfcenter,
                      styles.row,
                    ]}
                  >
                    <Icon
                      type="MaterialIcons"
                      name="monetization-on"
                      style={[
                        commonStyles.font16,
                        commonStyles.alignSelfcenter,
                        commonStyles.ml15,
                        {
                          color: '#C8A74D'
                        }
                      ]}
                    />
                    <TextInput
                      keyboardType = 'numeric'
                      returnKeyType="done"
                      type="text"
                      name="tempNum"
                      value={this.state.tempNum}
                      onChangeText={(text) => this.setState({text})}
                      maxValue={99}
                      minValue={0}
                      style={[
                        commonStyles.inventrybartextbutton,
                        commonStyles.redText,
                        commonStyles.ml5
                      ]}
                      >
                    {this.state.counter}

                    </TextInput>
                  </View>
                  <TouchableOpacity onPress={this.DecrementItem}>
                    <View
                      style={[styles.counterButton]}
                    >
                    <Icon
                      type="MaterialIcons"
                      name="remove"
                      size={40}
                      style={[
                        commonStyles.alignItems,
                        commonStyles.justifyCenter
                      ]}
                      />
                      <Text
                        style={[
                          commonStyles.inventrytextbutton,
                          commonStyles.bl,
                          {}
                        ]}
                      >
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <View style={[commonStyles.row, commonStyles.mt5]}>
            <View
              style={[
                commonStyles.ml5,
                {
                  borderWidth: 0.5,
                  borderColor: 'grey',
                  height: 0,
                  width: width * 0.42
                }
              ]}
            />
            <Text
              style={[commonStyles.ml5, commonStyles.mr5, commonStyles.top10, { color: 'grey' }]}
            >
              ITEMS
            </Text>
            <View
              style={{
                borderWidth: 0.5,
                height: 0,
                borderColor: 'grey',
                width: width * 0.38
              }}
            />
          </View>

          <Badge
            style={[
              commonStyles.closeIcons,
              commonStyles.alignSelfcenter,
              commonStyles.justifyCenter,
              commonStyles.zIndex,
              commonStyles.positionabsolute,
              { ...ifIphoneX(
                {
                  bottom: 20
                },
                {
                  bottom: 10
                }
              ) }

            ]}
          >
            <View
              style={{
                borderWidth: 1,
                borderColor: '#87EFC7',
                borderRadius: 25
              }}
            >
              <Icon
                onPress={() => {
                  goBack();
                }}
                type="MaterialIcons"
                name="close"
                style={[
                  commonStyles.font18,
                  commonStyles.margin5,
                  {
                    color: '#87EFC7'
                  }
                ]}
              />
            </View>
          </Badge>
          <FlatList
            data={this.state.items}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            renderItem={item => (
              <View>
                <TouchableOpacity onPress={this._toggleModal}>
                  <View>
                    <Image
                      resizeMode={'contain'}
                      style={[{ height: height * 0.15, width: width * 0.49 }]}
                      source={image}
                    />

                    <Text style={[styles.modalTextBox]}>
                      RUNE ATTACK
                    </Text>
                  </View>
                </TouchableOpacity>
                <View
                  style={[
                    styles.ShopItems,
                    commonStyles.alignSelfcenter,
                    commonStyles.mt20,
                    commonStyles.mb20
                  ]}
                >
                  <View
                    style={[commonStyles.alignSelfcenter, commonStyles.row]}
                  >
                    <Icon
                      type="MaterialIcons"
                      name="monetization-on"
                      style={[
                        commonStyles.font18,
                        commonStyles.alignSelfcenter,
                        {
                          color: '#C8A74D'
                        }
                      ]}
                    />
                    <Text>abc</Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
    );
  }
}

const styles = StyleSheet.create ({
  counterButton: {
  width: 50,
  height:50,
  backgroundColor: '#5054AE',
  borderRadius: 40,
  borderColor: 'black',
  alignItems: 'center',
  justifyContent:'center',
  },
  inventrybutton: {
    width: 20,
    backgroundColor: '#937ce6',
    paddingVertical: 10,
    marginBottom: 5,
    borderRadius: 20,
    zIndex: 10,
    marginLeft: 20
  },
  inventrybar: {
    width: 100,
    paddingVertical: 15,
    marginBottom: 5,
    backgroundColor: '#d6d6e2',
    borderRadius: 10
  },
  row: {
    flexDirection: 'row'
  },
  alignSelfcenter: {
    alignSelf: 'center'
  },
  right10: {
    right: 10
  },
  black: {
    color: 'black'
  },
  ShopItems: {
    width: 75,
    backgroundColor: 'grey',
    borderRadius: 5,
    paddingVertical: 5
  },
  modalTextBox: {
      textAlign: 'center',
      color: 'black'
  },
});

export default ShopItems;
