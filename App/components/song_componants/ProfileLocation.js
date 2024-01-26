import React from 'react';
import { View, Text, Image, useColorScheme } from 'react-native';
import { getStyles } from '../../styles/styles';
import { useAppContext } from '../AppProvider';

/**
 * ProfileLocation component displays the profile information of the current user and
 * indicates that there are other users at the same location. It adapts its appearance
 * based on the active color scheme.
 *
 * @returns {React.ReactElement} The ProfileLocation component with user's profile and others indication.
 */
const ProfileLocation = () => {
  // Determines the color scheme of the device (light or dark).
  const scheme = useColorScheme();

  // Retrieves the styles corresponding to the active color scheme.
  const styles = getStyles(scheme);

  // Uses the application context to obtain the current user's profile.
  const { profile } = useAppContext();
  
  // Destructures the image and name from the profile state.
  const { image, name } = profile;

  // Determines the icon source based on the active color scheme.
  const iconSource = scheme === 'dark' 
    ? require('../../assets/icon-smiley-lightpurple.png') // Icon for dark scheme
    : require('../../assets/icon-smiley-darkpurple.png'); // Icon for light scheme

  // Provides a default display name if no name is set in the profile.
  const displayName = name || 'Guest';

  // Chooses between the user's image or a default icon if no image is provided.
  const displayImage = image ? { uri: image } : iconSource;

  return (
    <View style={styles.profileLocationContainer}>
      <Text style={styles.heading}>Currently at this Location</Text>
      <View style={styles.profileSection}>
        <View style={styles.profileImageContainer}>
          <Image source={displayImage} style={styles.profileImage} />
        </View>
        <Text style={styles.profileText}>{displayName}</Text>
      </View>
      <View style={styles.profileSection}>
        <View style={styles.profileImageContainer}>
          <Image source={iconSource} style={styles.profileImage} />
        </View>
        <Text style={styles.profileText}>And Others...</Text>
      </View>
    </View>
  );
};

export default ProfileLocation;
