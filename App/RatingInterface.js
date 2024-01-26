import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Rating } from 'react-native-elements';
import { postSampleRating, getSampleRatings } from '../../api/api';
import { calculateAverageRating } from './ratingDisplay';




/**
 * Component for displaying and interacting with ratings.
 *
 * @param {string} sample_ID - The ID of the sample to associate the ratings with.
 */
const RatingsInterface = ({ sample_ID }) => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);


  const fetchAndSetAverageRating = async () => {
    setIsLoading(true);
    try {
      const ratingsData = await getSampleRatings(sample_ID);
      const filteredRatings = ratingsData.filter(data => data.sample_id === sample_ID);
      const averageRating = calculateAverageRating(filteredRatings);
      setSelectedRating(averageRating);
    } catch (error) {
      console.error('Failed to fetch or calculate average rating:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    

    fetchAndSetAverageRating();
  }, [sample_ID]);

  const handleRatingPress = async (rating) => {
    setSelectedRating(rating);
    try {
        console.log(sample_ID, rating)
      await postSampleRating(sample_ID, rating);
      // Re-fetch the ratings after submitting a new one
      fetchAndSetAverageRating();
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  // Using react-native-elements Rating component
  return (
    <View style={styles.container}>
      <Rating
        showRating
        type="star"
        fractions={1}
        startingValue={selectedRating}
        readonly={false}
        imageSize={40}
        onFinishRating={handleRatingPress}
        style={styles.rating}
      />
    </View>
  );
};

/**
 * Styles for the RatingsInterface component.
 */
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 10,
  },
  rating: {
    paddingVertical: 10,
  }
});

export default RatingsInterface;
