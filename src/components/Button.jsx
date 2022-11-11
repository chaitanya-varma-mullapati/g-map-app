import React, {Children} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const Button = ({children, onClick = () => {}}) => {
  return (
    <TouchableOpacity style={styles.loginBtn}>
      <Text style={styles.loginText} onPress={onClick}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#FF1493',
  },
});
