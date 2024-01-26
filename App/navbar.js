import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import MapPage from '../views/MapPage';
import ProfilePage from '../views/ProfilePage';
import SongStack from './song_details/SongStack';

import { colors } from '../styles/colors';
import { getStyles } from '../styles/styles'; 

import mapIcon from '../assets/tab-map-white.png';
import songTraxIcon from '../assets/logo-white.png';
import profileIcon from '../assets/tab-profile-white.png';

const styles = getStyles('light');

const Tab = createBottomTabNavigator();

/**
 * Custom button for the tab navigator.
 * 
 * @param {Object} props - The properties passed to the tab button.
 * @param {Function} props.onPress - Handler for the press event.
 * @param {React.ReactNode} props.children - The child nodes to be rendered inside the button.
 * @param {string} props.label - The label for the button, used to determine button width.
 * @param {boolean} props.isFocused - Indicates if the tab is currently focused.
 * @returns {React.ReactElement} A custom styled tab button.
 */
function CustomTabButton({ onPress, children, label, isFocused }) {
    const backgroundColor = isFocused ? colors.purpleDark : colors.purpleLight;
    const buttonWidth = label === 'SongTrax' ? '40%' : '30%';
    
    return (
        <TouchableOpacity
            style={[
                styles.customTabButton,
                { backgroundColor, width: buttonWidth }
            ]}
            onPress={onPress}
        >
            {children}
        </TouchableOpacity>
    );
}

/**
 * Renders the icon for a tab within the navigator.
 * 
 * @param {Object} props - The properties passed to the tab icon.
 * @param {string} props.name - The name of the icon, which determines which image to use.
 * @param {boolean} props.focused - Indicates if the tab is currently focused.
 * @returns {React.ReactElement} An image element with the correct icon.
 */
function TabIcon({ name, focused }) { 
    let sourceImage;
    let iconSize = { width: 35, height: 35 };  // Default icon size

    switch (name) {
      case 'map-outline':
      case 'map':
        sourceImage = mapIcon;
        break;
      case 'person-circle-outline':
      case 'person-circle':
        sourceImage = profileIcon;
        break;
      case 'songtrax':
        sourceImage = songTraxIcon;
        iconSize = { width: 70, height: 70 };  // Larger icon size for SongTrax
        break;
    }

    return <Image source={sourceImage} style={iconSize} resizeMode="contain" />;
}

/**
 * BottomTabNavigator is the main tab bar navigation component.
 * It sets up the bottom tabs and their associated screens, customizing the tab bar's appearance and behavior.
 *
 * @returns {React.ReactElement} The tab navigator with three defined routes.
 */
function BottomTabNavigator() {
    return (
        <Tab.Navigator
          initialRouteName="Map"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
              let iconName;
              if (route.name === 'Map') {
                iconName = focused ? 'map-outline' : 'map';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person-circle-outline' : 'person-circle';
              } else if (route.name === 'SongTrax') {
                iconName = 'songtrax';
              }
              // Returns the icon component based on the route and focus status.
              return <TabIcon name={iconName} focused={focused} />;
            },
            tabBarShowLabel: false, // Hides the tab label.
            tabBarActiveTintColor: colors.purpleDark, // Color of the active tab icon.
            tabBarInactiveTintColor: colors.purpleLight, // Color of the inactive tab icon.
            tabBarStyle: {
              backgroundColor: 'white', // Background color of the tab bar.
            },
          })}
        >
          <Tab.Screen
            name="Map"
            component={MapPage}
            options={{
              tabBarButton: (props) => (
                <CustomTabButton {...props} label="Map" isFocused={props.accessibilityState.selected} />
              ),
              headerShown: false, // Hides the header for this tab.
            }}
          />
          <Tab.Screen
            name="SongTrax"
            component={SongStack}
            options={{
              tabBarButton: (props) => (
                <CustomTabButton {...props} label="SongTrax" isFocused={props.accessibilityState.selected} />
              ),
              headerShown: false, 
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfilePage}
            options={{
              tabBarButton: (props) => (
                <CustomTabButton {...props} label="Profile" isFocused={props.accessibilityState.selected} />
              ),
              headerShown: false, 
            }}
          />
        </Tab.Navigator>
    );
}
  
export default BottomTabNavigator;
