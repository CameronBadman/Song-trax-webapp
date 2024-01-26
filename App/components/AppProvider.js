import React, { useState, createContext, useContext } from 'react';

/** 
 * Creates a Context object for the app's global state.
 */
export const AppContext = createContext();

/**
 * AppProvider is a component that wraps the app's components, providing them
 * access to the app's global state and functions to update it.
 *
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - Components to be rendered within the provider.
 * @returns {React.ReactElement} The provider-wrapped components.
 */
export const AppProvider = ({ children }) => {
  const [nearbyLocations, setNearbyLocations] = useState([]);
  const [profile, setProfile] = useState({ image: null, name: '' });

  /**
   * Updates the list of nearby locations in the global state.
   *
   * @param {Array} locations - New list of locations to be set.
   */
  const updateNearbyLocations = (locations) => {
    setNearbyLocations(locations);
  };

  /**
   * Updates the user's profile information in the global state.
   *
   * @param {Object} profileData - The new profile data.
   * @param {string} profileData.image - URL or URI to the user's profile image.
   * @param {string} profileData.name - The user's name.
   */
  const updateProfile = ({ image, name }) => {
    setProfile({ image, name });
  };

  // Prepare the context value to be passed to provider's consumers
  const value = {
    nearbyLocations,
    updateNearbyLocations,
    profile,
    updateProfile,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

/**
 * Custom hook to access the app's context.
 * @returns {Object} The app's context with state and updater functions.
 */
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

/**
 * Custom hook to access and update the user's profile state.
 * @returns {Object} The user's profile state and its updater function.
 */
export const useProfile = () => {
  const { profile, updateProfile } = useAppContext();
  return { profile, updateProfile };
};

/**
 * Custom hook to access and update the nearby locations state.
 * @returns {Object} The nearby locations state and its updater function.
 */
export const useNearbyLocations = () => {
  const { nearbyLocations, updateNearbyLocations } = useAppContext();
  return { nearbyLocations, updateNearbyLocations };
};
