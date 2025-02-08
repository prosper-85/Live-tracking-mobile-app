import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Geolocation, {
  GeolocationResponse,
  GeolocationError,
} from '@react-native-community/geolocation';
import MapView, {Marker} from 'react-native-maps';
import axios from 'axios';
import io from 'socket.io-client';

const BACKEND_API_URL = 'https://managements-api.onrender.com/api/location';
const SOCKET_URL = 'wss://managements-api.onrender.com/api';

type Location = {
  latitude: number;
  longitude: number;
};

const socket = io(SOCKET_URL, {
  transports: ['websocket'],
});

function App(): React.JSX.Element {
  const [location, setLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });

  const driverId = '12345';

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission denied');
        return;
      }
    } else if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization(); // Request permission for iOS
    }

    const watchId = Geolocation.watchPosition(
      async (position: GeolocationResponse) => {
        const {latitude, longitude} = position.coords;
        setLocation({latitude, longitude});

        await axios.post(BACKEND_API_URL, {
          driverId,
          latitude,
          longitude,
        });

        socket.emit('send-location', {driverId, latitude, longitude});
      },
      (error: GeolocationError) => console.error(error),
      {enableHighAccuracy: true, distanceFilter: 10},
    );

    return () => {
      Geolocation.clearWatch(watchId);
    };
  };

  useEffect(() => {
    requestLocationPermission();

    socket.on(`location-update-${driverId}`, data => {
      console.log('Live location update received:', data);
      setLocation({latitude: data.latitude, longitude: data.longitude});
    });

    return () => {
      socket.off(`location-update-${driverId}`);
      socket.disconnect();
    };
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="light-content" />
      <MapView
        style={{flex: 1}}
        initialRegion={{
          latitude: location.latitude || 0,
          longitude: location.longitude || 0,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}>
        <Marker coordinate={location} title="Prosper's Location" />
      </MapView>
    </SafeAreaView>
  );
}

export default App;
