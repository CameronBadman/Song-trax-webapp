import React, { useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, Appearance, View, SafeAreaView, Text, useColorScheme } from 'react-native';
import MapView, { Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { getDistance } from 'geolib';
import { getLocations, deleteAllLocations } from '../api/api';
import { AppContext } from '../components/AppProvider';
import { getStyles, darkModeMapStyle } from '../styles/styles';

// used code for the map comp2140 tutorial 

/**
 * Renders a nearby location component.
 *
 * @param {object} props - The props for the NearbyLocation component.
 * @param {string} props.location - The name of the nearby location.
 * @param {object} props.distance - The distance information for the nearby location.
 * @param {boolean} props.distance.nearby - Indicates if the location is within 100 meters.
 * @returns {JSX.Element|null} The NearbyLocation component or null if props.location is undefined.
 */
function NearbyLocation(props) {
  if (typeof props.location !== 'undefined') {
    return (
      <SafeAreaView style={styles.nearbyLocationSafeAreaView}>
        <View style={styles.nearbyLocationView}>
          <Text style={styles.nearbyLocationText}>{props.location}</Text>
          {props.distance?.nearby && (
            <Text
              style={{
                ...styles.nearbyLocationText,
                fontWeight: 'bold',
              }}
            >
              Within 100 Metres!
            </Text>
          )}
        </View>
      </SafeAreaView>
    );
  }
  return null; // Ensure we return null if props.location is undefined
}

/**
 * Fetches and formats locations from the API.
 *
 * @async
 * @returns {Promise<Array<object>>} A promise that resolves to an array of formatted locations.
 */
async function fetchAndFormatLocations() {
  let data = await getLocations()
    .then(apiData => {
      const formattedLocations = apiData.map(apiLocation => ({
        id: apiLocation.id,
        location: apiLocation.name,
        coordinates: {
          latitude: parseFloat(apiLocation.latitude),
          longitude: parseFloat(apiLocation.longitude),
        },
        isshared: apiLocation.sharing,
      }));
      return formattedLocations;
    })
    .catch(error => {
      console.error('Error fetching and formatting locations:', error);
      return [];
    });

  return data;
}

/**
 * Component for displaying the map and nearby locations.
 */
export default function ShowMap() {
  const scheme = useColorScheme();
  const styles = getStyles(scheme);
  const [mapState, setMapState] = useState({
    locationPermission: false,
    locations: [],
    userLocation: {
      latitude: -27.5263381,
      longitude: 153.0954163,
    },
    nearbyLocation: [],
  });

  const { nearbyLocations, updateNearbyLocations } = useContext(AppContext);

  const locationSubscription = useRef();

  useEffect(() => {
    let isMounted = true;

    async function fetchLocations() {
      const locations = await fetchAndFormatLocations();
      if (isMounted) {
        setMapState(prevState => ({
          ...prevState,
          locations,
        }));
      }
    }

    fetchLocations();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true; // Flag to track mounted state

    async function requestLocationPermission() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted' && isMounted) {
        setMapState(prevState => ({
          ...prevState,
          locationPermission: true,
        }));
      }
    }

    requestLocationPermission();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (mapState.locationPermission) {
      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 10, // in meters
        },
        newLocation => {
          setMapState(prevState => {
            const userLocation = {
              latitude: newLocation.coords.latitude,
              longitude: newLocation.coords.longitude,
            };
            const nearbyLocation = calculateDistance(prevState.locations, userLocation);

            updateNearbyLocations(nearbyLocation);
            return {
              ...prevState,
              userLocation,
              nearbyLocation,
            };
          });
        }
      ).then(subscription => {
        locationSubscription.current = subscription;
      });
    }

    // Cleanup function
    return () => {
      if (locationSubscription.current) {
        locationSubscription.current.remove();
      }
    };
  }, [mapState.locationPermission, updateNearbyLocations]);

  /**
   * Calculates the distance between user location and nearby locations.
   *
   * @param {Array<object>} locations - An array of locations.
   * @param {object} userLocation - The user's current location.
   * @returns {Array<object>} An array of nearby locations.
   */
  function calculateDistance(locations, userLocation) {
    // Filter the locations to include only those within 100 meters
    const nearbyLocations = locations
      .map(location => {
        const metres = getDistance(userLocation, location.coordinates);
        return {
          ...location,
          distance: {
            metres,
            nearby: metres <= 100,
          },
        };
      })
      .filter(location => location.distance.nearby); // Keep only the locations that are nearby

    return nearbyLocations; // Return an array of all nearby locations
  }

  // Get light or dark mode
  const colorScheme = Appearance.getColorScheme();

  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        customMapStyle={scheme === 'dark' ? darkModeMapStyle : []}
        camera={{
          center: mapState.userLocation,
          pitch: 0,
          heading: 0,
          altitude: 3000,
          zoom: 15,
        }}
        showsUserLocation={mapState.locationPermission}
        provider={PROVIDER_GOOGLE}
      >
        {mapState.locations.map(location => (
          <Circle
            key={location.id}
            center={location.coordinates}
            radius={100}
            strokeWidth={3}
            strokeColor='#A42DE8'
            fillColor={colorScheme === 'dark' ? 'rgba(127, 45, 164, 0.3)' : 'rgba(231, 164, 228, 0.3)'}
          />
        ))}
      </MapView>

      <NearbyLocation location={mapState.nearbyLocation?.location} distance={mapState.nearbyLocation?.distance} />
    </View>
  );
}
