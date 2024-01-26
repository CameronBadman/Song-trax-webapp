import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { getSampleRatings } from '../../api/api';
import { Rating } from 'react-native-elements';

/**
 * Calculate the average rating from an array of rating objects.
 *
 * @param {Array} data - An array of rating objects.
 * @returns {number} - The average rating.
 */
export function calculateAverageRating(data) {
    if (!Array.isArray(data) || data.length === 0) {
        return 0;
    }
    const total = data.reduce((acc, obj) => acc + (obj.rating || 0), 0);
    return total / data.length;
}

/**
 * Component to display the average rating for a song.
 *
 * @param {string} songId - The ID of the song to fetch ratings for.
 */
export const RatingDisplay = ({ songId }) => {
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const ratings = (await getSampleRatings(songId)).filter(data => data.sample_id === songId);
        const averageRating = calculateAverageRating(ratings);
        setRating(averageRating);
      } catch (error) {
        console.error('Failed to fetch ratings:', error);
        setError('Failed to fetch ratings');
      } finally {
        setLoading(false);
      }
    };

    fetchRating();
  }, [songId]);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View>
      <Rating
        readonly
        type='star'
        ratingCount={5}
        imageSize={32}
        startingValue={rating}
        // For a more detailed customization you can add style props
      />
    </View>
  );
};
