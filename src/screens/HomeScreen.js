import React, { useContext } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { AuthContext } from '../components/context';


const HomeScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { signOut } = useContext(AuthContext);

  const theme = useTheme();

  return (
    <View style={styles.container}>
      <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />
      <View style={styles.logoutContainer}>
        <View>
          <Text style={
            [styles.textSign, {
              color: colors.text
            }]}>West Campus Maps</Text>
        </View>
        <TouchableOpacity
          onPress={() => signOut()}
          style={[styles.signIn, {
            borderColor: '#009387',
            borderWidth: 1,
            marginTop: 10
          }]}
        >
          <Text
            style={[styles.textSign, {
              color: '#009387'
            }]}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  signIn: {
    width: '25%',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  textSign: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  logoutContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
