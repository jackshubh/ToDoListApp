import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import styles from '../styles/componentStyles';

const BackButton = ({goBack, listingOrSearchPage, isLoading}) => (
  <TouchableOpacity
    onPress={goBack}
    style={
      listingOrSearchPage && isLoading ? {left: 10, top: 4} : styles.container
    }>
    <MaterialCommunityIcons size={28} name="arrow-left" color="#000" />
  </TouchableOpacity>
);

export default BackButton;
