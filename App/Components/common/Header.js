// Import a library to help create a component
import React from 'react';
import { Text, View } from 'react-native';

//Make a registerComponent

const Header = (props) => {
  const { textStyle, viewStyle } = styles;
  return (
  <View style={viewStyle}>
    <Text style={textStyle}>{props.headerText}</Text>;
  </View>
  );
};

const styles = {
  viewStyle: {
    justifyContent: 'center', //vertical
    alignItems: 'center', //horizontal
    height: 60,
    paddingTop: 15,
    backgroundColor: '#F8F8F8',
    shadowColor: 'black', //color of shadow
    shadowOffset: { width: 0, height: 2 }, //defines the dimensions of the shadow
    shadowOpacity: 0.2, //how dark or how heavy the shadow is
    elevation: 2,
    position: 'relative'

  },
  textStyle: {
    fontSize: 20
  }
};
//Make component available to other parts of the App
export  { Header };
