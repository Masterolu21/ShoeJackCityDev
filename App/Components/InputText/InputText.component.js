import React from 'react';
import { View } from 'react-native';
//import native-base
import { Item, Input, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
//import styles
import { commonStyles } from '../../screens/styles/styles';

const InputText = props => {
  const {
    placeholder,
    value,
    onChangeText,
     secureTextEntry,
    icon,
    autoCapitalize
  } = props;

  return (
    <View style={[commonStyles.flexDirectionrow]}>
      <View style={[commonStyles.flex1, commonStyles.marginHorizontal50]}>
        <Item style={{ borderColor: '#d6d6e2', borderBottomWidth: 1.5 }}>
          <MaterialIcons
            style={[commonStyles.fontsize16, commonStyles.placeholdercolor]}
            active
            name={icon}
          />
          <Input
            style={[commonStyles.right5, commonStyles.placeholdercolor]}
            placeholderTextColor="#d6d6e2"
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            onChangeText={onChangeText}
            value={value}
            autoCorrect={false}
            autoCapitalize={autoCapitalize}
          />
        </Item>
      </View>
    </View>
  );
};

export default InputText;
