import React from 'react';
import {ActivityIndicator} from 'react-native-paper';

const Activity = ({size = 'small'}) => {
  return <ActivityIndicator size={size} color="#0000ff" />;
};

export default Activity;
