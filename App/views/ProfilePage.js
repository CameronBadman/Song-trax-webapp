import React, { useState, useEffect } from 'react';
import { useProfile } from '../components/AppProvider';
import { View, Text, TextInput, TouchableOpacity, Image, useColorScheme, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../styles/colors';
import { getStyles } from '../styles/styles';

/**
 * Represents the profile page component for editing user profile information.
 *
 * @returns {JSX.Element} The ProfilePage component.
 */
function ProfilePage() {
  const { profile, updateProfile } = useProfile();
  // Get the current color scheme
  const scheme = useColorScheme();
  const styles = getStyles(scheme); // pass the scheme to getStyles

  const [image, setImage] = useState(null);
  const [name, setName] = useState('');

  /**
   * Saves the user's profile changes, including name and image.
   *
   * @returns {void}
   */
  const saveProfileChanges = () => {
    // Call updateProfile to save the changes
    updateProfile({ name, image });
  };

  /**
   * Opens the image picker to select or capture a profile photo.
   *
   * @returns {void}
   */
  const pickImage = async () => {
    const result = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (result.granted) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    } else {
      alert('Sorry, we need camera roll permissions to make this work!');
    }
  };

  const imageBoxStyle = image ? styles.photoFullImage : styles.photoEmptyView;

  return (
    <View style={styles.profileContainer}>
      <Text style={styles.heading}>Edit Profile</Text>
      <Text style={styles.subHeading}>Mirror mirror on the wall</Text>
      <TouchableOpacity onPress={pickImage} style={styles.photoEmptyView}>
        {image ? (
          <Image source={{ uri: image }} style={{ width: '100%', height: '100%' }} />
        ) : (
          <Text style={styles.addPhotoText}>Add Photo</Text>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        placeholderTextColor={colors[scheme].fgColorLighter}
        value={name}
        onChangeText={setName}
      />

      <Button title="Save Changes" onPress={saveProfileChanges} color={colors[scheme].primary} />
    </View>
  );
}

export default ProfilePage;
