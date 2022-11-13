import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, PermissionsAndroid, SafeAreaView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { AuthContext } from '../components/context';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const HomeScreen = ({ navigation, loginState = {} }) => {
  const { colors } = useTheme();
  const { signOut, setPositions } = useContext(AuthContext);
  const { positions } = loginState || {}

  const [hasLocationPermission, setHasLocationPermission] = useState(false)

  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'West Campus Maps',
          'message': 'West Campus Maps App access to your location '
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location")
        setHasLocationPermission(true)
      } else {
        console.log("location permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
  }

  const theme = useTheme();

  const setPositionValue = ({ longitude, latitude }) => {
    setPositions({ latitude, longitude })
  }
  const { longitude, latitude } = positions
  console.log(latitude, longitude)
  useEffect(() => {
    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
        (position) => {
          const { coords } = position || {}
          const { longitude, latitude } = coords || {}
          setPositionValue({ latitude, longitude })
        },
        (error) => {
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }
  }, [hasLocationPermission])

  useEffect(() => {
    requestLocationPermission()
  }, [])


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
      <View style={styles.search}>
        <GooglePlacesAutocomplete
          placeholder='Search'
          onPress={(data, details = null) => {
            console.log(data, details);
          }}
          query={{
            key: 'AIzaSyBKp6A5KMiP61R9yq9CT0SpC1MxG9GGf38',
            language: 'en',
          }}
          enableHighAccuracyLocation={true}
          debounce={100}
        />
      </View>
      {latitude && longitude ?
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        /> : null}
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
    justifyContent: 'space-between',
    marginBottom: 10
  },
  map: {
    flex: 1
  },
  search: {
    flex: 0.1,
    justifyContent: "center",
  }
});
