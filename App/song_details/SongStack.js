import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../../views/HomePage';
import SongPage from '../../views/SongPage';

const Stack = createStackNavigator();

/**
 * SongStack sets up a stack navigator for the song-related screens.
 * It configures the navigation options such as header visibility, title, and styling.
 * The stack navigator manages the transition between the HomePage and the SongPage.
 *
 * @returns {React.ReactElement} A Stack Navigator with configured screens and navigation options.
 */
const SongStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false, // Hides the back button title (iOS)
        headerTitle: '', // Empty string for no title
        headerTransparent: true, // Makes header transparent
        headerTintColor: '#fff', // Adjusts the color of the back button
        
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomePage}
      />
      <Stack.Screen
        name="Song"
        component={SongPage}
      />
    </Stack.Navigator>
  );
};

export default SongStack;
