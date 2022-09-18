import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

import styles from '../styles/componentStyles';

export default function CommonButton({
  title,
  onPress,
  buttonStyles,
  textStyles,
  disabled,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, buttonStyles]}
      disabled={disabled}>
      <Text style={[styles.innerText, textStyles]}>{title}</Text>
    </TouchableOpacity>
  );
}
