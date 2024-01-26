import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, useColorScheme } from 'react-native';
import { WebView } from 'react-native-webview';
import { getSample } from '../api/api';

import ProfileLocation from '../components/song_componants/ProfileLocation';
import RatingsInterface from '../components/song_details/RatingInterface';
import getStyles from '../styles/SongPageStyles';

const iconPinDarkPurple = require('../assets/icon-pin-darkpurple.png');
const iconPinLightPurple = require('../assets/icon-pin-lightpurple.png');

/**
 * Transforms recording data to a specific structure.
 *
 * @param {Array} inputData - Array of recording data objects.
 * @returns {Array} - An array of objects with notes as keys and sequences as values.
 */
function transformRecordingData(inputData) {
  return inputData.map((item) => {
    const noteObject = {};
    noteObject[item.note] = item.sequence;
    return noteObject;
  });
}

/**
 * SongPage component that displays the details of a song and a WebView to interact with it.
 *
 * @param {Object} route - Route object containing the parameters passed to the component.
 * @returns {React.Component} - Renders the song's detail page.
 */
const SongPage = ({ route }) => {
  const songID = route.params.songID;
  const locationName = route.params.location;

  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);
  
  const [songDetails, setSongDetails] = useState(null);
  const [webViewState, setWebViewState] = useState({
    loaded: false,
    actioned: false,
    webViewVisible: true,
  });
  const webViewRef = useRef();
  
  const iconSource = colorScheme === 'light' ? iconPinDarkPurple : iconPinLightPurple;

  /**
   * Called when the WebView has finished loading.
   */
  function webViewLoaded() {
    setWebViewState(prevState => ({ ...prevState, loaded: true }));
  }

  /**
   * Handles user interaction for reloading the WebView content. FOR FUTURE DEV 
   */
  function handleReloadPress() {
    webViewRef.current?.reload();
  }

  /**
   * Effects that runs once on component mount to fetch song details.
   */
  useEffect(() => {
    getSample(songID)
      .then((response) => {
        webViewRef.current?.reload();
        response.recording_data = transformRecordingData(response.recording_data);
        setSongDetails(response);
      })
      .catch((error) => {
        console.error('Error fetching song details:', error);
      });
  }, [songID]);

  /**
   * Handles the press action on the play/stop button for controlling song playback.
   */
  function handleActionPress() {
    if (!webViewState.actioned) {
      const recordingData = JSON.stringify(songDetails.recording_data);
      const instrument = songDetails.type;
      webViewRef.current?.injectJavaScript(`preparePreview(${recordingData}, '${instrument}');`);
      webViewRef.current?.injectJavaScript('playPreview();');
    } else {
      webViewRef.current?.injectJavaScript('stopSong();');
    }

    setWebViewState(prevState => ({
      ...prevState,
      actioned: !prevState.actioned,
    }));
  }

  // Component rendering
  return (
    <View style={styles.container}>
      <View style={styles.horizontalContainer}>
        <Image source={iconSource} style={styles.icon} resizeMode="contain" />
        <View style={styles.locationTextContainer}>
          <Text style={styles.locationName}>{locationName}</Text>
        </View>
      </View>

      <View style={styles.webViewContainer}>
        {songDetails && (
          <>
            <Text style={styles.songName}>{songDetails.name}</Text>
            <Text style={styles.dateTextStyle}>Song Date: {songDetails.datetime.substring(0, 10)}</Text>
          </>
        )}
      </View>

      <View style={styles.webViewContainer}>
        {webViewState.webViewVisible && (
          <WebView
            ref={webViewRef}
            originWhitelist={['*']}
            source={{ uri: 'https://comp2140.uqcloud.net/static/samples/index.html' }}
            pullToRefreshEnabled={true}
            onLoad={webViewLoaded}
            style={styles.webView}
          />
        )}
      </View>

      {webViewState.loaded && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleActionPress}
            style={webViewState.actioned ? styles.stopPlaybackButton : styles.startPlaybackButton}
          >
            <Text style={webViewState.actioned ? styles.stopPlaybackButtonText : styles.startPlaybackButtonText}>
              {!webViewState.actioned ? 'Start Playback' : 'Stop Playback'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <RatingsInterface sample_ID={songID} />
      <ProfileLocation />
    </View>
  );
};

export default SongPage;
