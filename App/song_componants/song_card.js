import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useColorScheme } from 'react-native';
import { getSample } from '../../api/api'; // Import the API function for getting song details
import { RatingDisplay } from '../song_details/ratingDisplay';
import { getStyles } from '../../styles/styles';

/**
 * SongCard is a presentational component that renders a card view for a song item.
 * It displays the song name, release date, and a rating component.
 * It initiates an API call to fetch song details upon mounting or when the songId changes.
 *
 * @param {Object} props - The props passed to the component.
 * @param {number} props.songId - The unique identifier for the song.
 * @returns {React.ReactElement} The rendered song card component.
 */
const SongCard = ({ songId }) => {
  const [songDetails, setSongDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const colorScheme = useColorScheme(); // Determines the color scheme of the device.
  const styles = getStyles(colorScheme); // Retrieves the styles corresponding to the current color scheme.

  // Effect hook to fetch song details based on songId.
  useEffect(() => {
    // API call to fetch song details and handle loading state.
    getSample(songId)
      .then((data) => {
        setSongDetails(data); // Updates state with the fetched song details.
        setIsLoading(false); // Sets loading state to false upon data reception.
      })
      .catch((error) => {
        console.error('Error fetching song details:', error);
        setIsLoading(false); // Sets loading state to false upon error.
      });
  }, [songId]); // Dependency array to trigger re-fetching when songId changes.

  // Parses and extracts the date from song details datetime string.
  const datePart = songDetails ? songDetails.datetime.split('T')[0] : '';

  return (
    <View style={styles.songCardContainer}>
      {!isLoading && songDetails ? (
        <>
          <View style={styles.songInfo}>
            <Text style={styles.songName}>{songDetails.name}</Text>
            <Text style={styles.songDate}>{datePart}</Text>
          </View>
          <View style={styles.ratingDisplay}>
            <RatingDisplay songId={songId} />
          </View>
        </>
      ) : (
        // Conditional rendering based on isLoading state.
        isLoading ? <Text style={styles.loadingText}>Loading song details...</Text> : null
      )}
    </View>
  );
};

export default SongCard;
