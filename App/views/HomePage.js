import React, { useContext } from 'react';
import { View, ScrollView, useColorScheme } from 'react-native';
import { AppContext } from '../components/AppProvider';
import LocationSongs from '../components/song_componants/location';
import { getStyles } from '../styles/styles';

/**
 * Represents the home page component.
 *
 * @returns {JSX.Element} The HomePage component.
 */
const HomePage = () => {
  const { nearbyLocations } = useContext(AppContext);
  const colorScheme = useColorScheme(); // This will be 'light' or 'dark'
  const styles = getStyles(colorScheme); // Passing the current color scheme to getStyles function

  return (
    <ScrollView style={styles.homeContainer}>
      {nearbyLocations.map((location, index) => (
        <View key={location.id.toString()} style={styles.homeLocationContainer}>
          <LocationSongs locationName={location.location} locationId={location.id} />
        </View>
      ))}
    </ScrollView>
  );
};

export default HomePage;
