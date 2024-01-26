import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Appearance, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getSampleToLocation } from '../../api/api';
import SongCard from './song_card';
import { locationPageStyles } from "../../styles/locationpageStyles";

const iconPinDarkPurple = require('../../assets/icon-pin-darkpurple.png');
const iconPinLightPurple = require('../../assets/icon-pin-lightpurple.png');

/**
 * Location component displays information about a specific location and a list of songs related to it.
 * It allows navigation to a song's detailed view on press of a song card.
 *
 * @param {Object} props - Component props.
 * @param {string} props.locationName - The name of the location to display.
 * @param {number|string} props.locationId - The ID of the location used to fetch related songs.
 * @returns {React.ReactElement} A React Element representing the location and its related songs.
 */
const Location = ({ locationName, locationId }) => {
  const colorScheme = useColorScheme();
  const styles = locationPageStyles(colorScheme); // Dynamic styling based on the color scheme.
  const navigation = useNavigation(); // React Navigation hook for navigation.
  const [locationData, setLocationData] = useState([]);

  // Fetch location data on component mount or when locationId changes
  useEffect(() => {
    getSampleToLocation(locationId)
      .then((data) => {
        // Filter data specifically for the given locationId
        const filteredData = data.filter((location) => location.location_id === locationId);
        setLocationData(filteredData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [locationId]);

  // Determine pin icon based on the current color scheme
  const iconSource = colorScheme === 'light' ? iconPinDarkPurple : iconPinLightPurple;

  /**
   * Handles the press on a SongCard by navigating to the Song screen with parameters.
   *
   * @param {number|string} sampleId - The ID of the selected song.
   * @param {string} locationName - The name of the location the song is associated with.
   */
  const handleSongCardPress = (sampleId, locationName) => {
    navigation.navigate('Song', { songID: sampleId, location: locationName });
  };

  return (
    <View style={styles.locationContainer}>
      {/* Location Header with Icon and Name */}
      <View style={styles.horizontalContainer}>
        <Image source={iconSource} style={styles.icon} resizeMode="contain" />
        <Text style={styles.locationName}>{locationName}</Text>
      </View>
      {/* List of Song Cards related to the location */}
      <View style={styles.songCardContainer}>
        {locationData.map((location, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleSongCardPress(location.sample_id, locationName)}
          >
            <SongCard songId={location.sample_id} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Location;
