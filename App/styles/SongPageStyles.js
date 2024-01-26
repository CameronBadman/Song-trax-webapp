// styles.js
import { StyleSheet, Dimensions } from 'react-native';
import { colors } from './colors';

const { height } = Dimensions.get('window');

export const getStyles = (mode) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors[mode].bgColor,
  },
  webViewContainer: {
    overflow: 'hidden',
  },
  webView: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  horizontalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  locationTextContainer: {
    flex: 1,
  },
  locationName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors[mode].fgColor,
    textAlign: 'right',
  },
  locationInfoContainer: {
    marginTop: 10,
    width: '100%',
  },
  songName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors[mode].fgColor,
    textAlign: 'left',
  },
  dateTextStyle: {
    fontSize: 20,
    color: mode === 'dark' ? colors.whiteTranslucent : colors.blackTranslucentLess,
    textAlign: 'left',
  },
  startPlaybackButton: {
    backgroundColor: colors.blueDark,
    width: '100%',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startPlaybackButtonText: {
    color: colors.white,
    fontSize: 28,
  },
  stopPlaybackButton: {
    backgroundColor: colors.blackTranslucentMore,
    width: '100%',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopPlaybackButtonText: {
    color: colors.white,
    fontSize: 28,
  },
});

export default getStyles;