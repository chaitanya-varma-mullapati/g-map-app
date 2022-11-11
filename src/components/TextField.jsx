import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const TextField = ({
  onchange = () => {},
  placeholder = '',
  secureTextEntry = false,
}) => {
  return (
    <TextInput
      style={styles.textInput}
      placeholder={placeholder}
      placeholderTextColor="#003f5c"
      onChangeText={text => onchange(text)}
      secureTextEntry={secureTextEntry}
    />
  );
};

export default TextField;

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
});
