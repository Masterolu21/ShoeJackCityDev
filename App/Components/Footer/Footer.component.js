import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Footer, FooterTab, Button } from 'native-base';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { commonStyles } from '../../screens/styles/styles';
import { HOME, SEARCH, TOURNAMENT, SHOP, ACCOUNT } from '../../utils/constants';
import { isIphoneX } from 'react-native-iphone-x-helper';

class AppFooterComponent extends React.Component {
  render() {
    const { onChangeTab, activeTab } = this.props;
    return (
      <View style={{
        backgroundColor: 'black',
        height: isIphoneX() ? 80 : 50,
        paddingBottom: isIphoneX() ? 18 : 0,
      }} >
        <FooterTab style={[styles.container]}>
          <Button
            style={[
              activeTab === HOME, //What is this doing?
            ]}
            onPress={activeTab === HOME ? () => { } : () => onChangeTab(HOME)}
          >

            <Icon
              type="MaterialIcons"
              name="home"
              style={
                activeTab === HOME
                  ? styles.IconColor //if it is clicked make the Icon red
                  : styles.defaultColor // if it is not clicked make the Icon color grey
              }
            />

            <Text
              style={[activeTab === HOME
                ? styles.IconColor
                : styles.defaultColor,
              styles.Text]}
            >
              Home
              </Text>
          </Button>

          <Button
            style={[activeTab === SEARCH]}
            onPress={activeTab === SEARCH
              ? () => { }
              : () => onChangeTab(SEARCH)}
          >

            <Icon
              type="MaterialIcons"
              name="search"
              style={[{ marginTop: 8 },
              activeTab === SEARCH
                ? styles.IconColor
                : styles.defaultColor]}
            />

            <Text
              style={[{ width: 80, textAlign: 'center' },
              activeTab === SEARCH //What is this activeTab
                ? styles.IconColor
                : styles.defaultColor,
              styles.Text]}
            >
              Search
              </Text>
          </Button>

          <Button
            style={[activeTab === TOURNAMENT]}
            onPress={activeTab === TOURNAMENT
              ? () => { }
              : () => onChangeTab(TOURNAMENT)}
          >

            <Icon
              type="MaterialIcons"
              name="videogame-asset"
              style={[{ marginTop: 8 },
              activeTab === TOURNAMENT
                ? styles.IconColor
                : styles.defaultColor]}
            />

            <Text
              style={[{ width: 80, textAlign: 'center' },
              activeTab === TOURNAMENT //What is this activeTab
                ? styles.IconColor
                : styles.defaultColor,
              styles.Text]}
            >
              Tournament
            </Text>
          </Button>

          <Button
            style={[activeTab === ACCOUNT
              ? styles.backgroundRed
              : styles.backgroundWhite,
            styles.br0]}
            onPress={activeTab === ACCOUNT ? () => { } : () => onChangeTab(ACCOUNT)}
          >
            <Icon
              type="MaterialIcons"
              name="person"
              style={[activeTab === ACCOUNT
                ? styles.IconColor
                : styles.defaultColor]}
            />

            <Text
              style={[activeTab === ACCOUNT
                ? styles.IconColor
                : styles.defaultColor,
              styles.Text]}
            >
              Account
          </Text>
          </Button>
        </FooterTab>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000'
  },
  br0: {
    borderRadius: 0
  },
  IconColor: {
    color: '#FF9A00'
  },
  defaultColor: {
    color: '#A9A9A9'
  },
  Text: {
    fontSize: 10,
  }

});

export default AppFooterComponent;
