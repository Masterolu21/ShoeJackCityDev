import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Footer, FooterTab, Button } from 'native-base';
import {MaterialIcons as Icon} from '@expo/vector-icons';
import { commonStyles } from '../../screens/styles/styles';
import { ACCOUNT, TOURNAMENT, SHOP, GAME } from '../../utils/constants';

class AppFooterComponent extends React.Component {
  render() {
    const { onChangeTab, activeTab } = this.props;
    return (
      <View>
        <Footer>
          <FooterTab style={[styles.container]}>
            <Button
              style={[
                activeTab === ACCOUNT, //What is this doing?
              ]}
              onPress={activeTab === ACCOUNT ? () => {} : () => onChangeTab(ACCOUNT)}
            >

              <Icon
                type="MaterialIcons"
                name="person"
                style={
                  activeTab === ACCOUNT
                    ? styles.IconColor //if it is clicked make the Icon red
                    : styles.defaultColor // if it is not clicked make the Icon color grey
                }
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

          <Button
            style={[activeTab === TOURNAMENT]}
            onPress={activeTab === TOURNAMENT
              ? () => {}
              : () => onChangeTab(TOURNAMENT)}
          >

            <Icon
              type="MaterialIcons"
              name="email"
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
            style={[activeTab === SHOP
              ? styles.backgroundRed
              : styles.backgroundWhite,
              styles.br0]}
              onPress={activeTab === SHOP ? () => {} : () => onChangeTab(SHOP)}
        >

          <Icon
            type="MaterialIcons"
            name="local-grocery-store"
            style={[activeTab === SHOP
              ? styles.IconColor
              : styles.defaultColor]}
          />

          <Text
            style={[activeTab === SHOP
              ? styles.IconColor
              : styles.defaultColor,
              styles.Text]}
          >
                Shop
          </Text>
        </Button>

        <Button
            style={[activeTab === GAME
              ? styles.backgroundRed
              : styles.backgroundWhite,
                styles.br0]}
            onPress={activeTab === GAME ? () => {} : () => onChangeTab(GAME)}
        >
          <Icon
            type="MaterialIcons"
            name="videogame-asset"
            style={[activeTab === GAME
              ? styles.IconColor
              : styles.defaultColor]}
          />

          <Text
            style={[activeTab === GAME
              ? styles.IconColor
              : styles.defaultColor,
                styles.Text]}
          >
            Game
          </Text>
        </Button>
      </FooterTab>
    </Footer>
  </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF'
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
