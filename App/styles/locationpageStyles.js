import { StyleSheet, Dimensions } from 'react-native';
import { colors } from './colors'; 

const { height } = Dimensions.get("window");

export const locationPageStyles = (mode) => StyleSheet.create({
  locationContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors[mode].bgColor,
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
  locationName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors[mode].fgColor,
    textAlign: 'right',
    flex: 1,
  },
  songCardContainer: {
    marginTop: 10,
    width: '100%',
  },
});
