import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, PermissionsAndroid, SafeAreaView, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { AuthContext } from '../components/context';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const HomeScreen = ({ navigation, loginState = {} }) => {
  const { colors } = useTheme();
  const { signOut, setPositions } = useContext(AuthContext);
  const { positions } = loginState || {}
  const [region, setRegion] = useState({})
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
  const { longitude, latitude } = positions || {}

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

  useEffect(() => {
    const { longitude, latitude } = positions || {}
    if (longitude && latitude) {
      setRegion((prevData) => ({
        ...prevData,
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      }))
    }
  }, [positions])


  return (
    <View style={styles.container}>
      <View>
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
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.12, position: 'relative' }}>
          <GooglePlacesAutocomplete
            placeholder='Search'
            onPress={(data, details = null) => {
              const { lat, lng } = details.geometry.location;
              setPositionValue({ latitude: lat, longitude: lng })
            }}
            fetchDetails={true}
            query={{
              key: 'AIzaSyBKp6A5KMiP61R9yq9CT0SpC1MxG9GGf38',
              language: 'en',
            }}
            enableHighAccuracyLocation={true}
            debounce={100}
            enablePoweredByContainer={false}
            style={{
              position: 'absolute',
              top: 40,
              zIndex: 100
            }}
            disableScroll={false}
          />
        </View>
        {latitude && longitude ?
          <View style={{ flex: 1 }}>
            <MapView
              provider={PROVIDER_GOOGLE}
              showsUserLocation={true}
              style={styles.map}
              region={region}
            />
          </View>
          : null}
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
    justifyContent: 'center'
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
    justifyContent: "center",
  }
});
