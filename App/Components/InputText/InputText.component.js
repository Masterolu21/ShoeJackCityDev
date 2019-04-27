import React from 'react';
import { View, Text, TextInput } from 'react-native';

import { commonStyles } from '../../screens/styles/styles';

const InputText = props => {
  const {
    placeholder,
    value,
    onChangeText,
    style,
    secureTextEntry,
    autoCapitalize
  } = props;
  return (
    <View style={[commonStyles.logoContainer]}>
      <TextInput
        placeholderTextColor="black"
        underlineColorAndroid="transparent"
        returnKeyType={'next'}
        style={[commonStyles.inputbar, style]}
        autoCapitalize={autoCapitalize}
        placeholder={placeholder}
        value={value}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default InputText;
