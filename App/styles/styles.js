import { colors } from "./colors";
import { Dimensions } from 'react-native';

const { height } = Dimensions.get("window");

export const getStyles = (mode) => ({
    customTabButton: {
        backgroundColor: colors.purpleColorLighter,
        paddingVertical: 6,  
        paddingHorizontal: 10, 
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',  
        height: 60,  
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
      },
      
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.text,
      },
    
    mapContainer: {
        flex: 1,
        backgroundColor: colors[mode].bgColor,
      },
    map: {
        flex: 1,
        ...(mode === 'dark' && { customMapStyle: darkModeMapStyle }),
      },

    nearbyAndPlayContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 10,
        backgroundColor: colors[mode].bgColor
    },
    heading: {
        fontSize: 30,
        fontWeight: "bold",
        color: colors[mode].fgColor,
        paddingBottom: 0
    },
    subHeading: {
        fontSize: 14,
        color: colors[mode].fgColor,
        paddingBottom: 25
    },
    songName: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors[mode].fgColor,
        paddingBottom: 0
    },
    location: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center", 
    },
    locationHeading: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors[mode].fgColor,
        paddingBottom: 6
    },
    playButton: {
        backgroundColor: colors[mode].fgColor,
        color: colors[mode].bgColor,
        fontWeight: "bold",
        padding: 10,
        borderRadius: 10,
        textAlign: "center",
    },
    locationIcon: {
        width: 35,
        height: 105,
    },
    currentLocation: {
        marginBottom: 10
    }, 
    ratingComponent: {
        paddingTop: 15,
    },
    profileContainer: {
        padding: 20,
        backgroundColor: colors[mode].bgColor,
        flex: 1
    },
    input: {
        marginTop: 20,
        backgroundColor: colors[mode].fgColorLighter,
        color: colors[mode].fgColor,
        borderRadius: 5,
        textAlign: "center",
        height: 40
    },
    photoEmptyView: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: colors[mode].fgColorLighter,
        borderStyle: "dashed",
        height: height / 1.7
    },
    photoFullImage: {
        width: "100%",
        borderRadius: 10
    },
    addPhoto: {
        backgroundColor: colors[mode].fgColor,
        color: colors[mode].bgColor,
        fontWeight: "bold",
        padding: 10,
        borderRadius: 10,
        textAlign: "center",
        width: "50%",
        marginLeft: "25%",
        marginTop: -(height / 3.25)
    },
    changePhoto: {
        backgroundColor: colors[mode].fgColor,
        color: colors[mode].bgColor,
        fontWeight: "bold",
        padding: 10,
        borderRadius: 10,
        textAlign: "center",
        width: "50%",
        marginLeft: "25%",
        marginTop: -(height / 12)
    },

    homeContainer: { // renamed from 'container' to 'homeContainer' for uniqueness
        flex: 1,
        backgroundColor: colors[mode].bgColor, 
    },
    homeText: { // renamed from 'text' to 'homeText'
        color: colors[mode].fgColor, 
    },
    homeLocationContainer: { 
        marginVertical: 10,
        padding: 10,
        backgroundColor: colors[mode].secondaryBgColor, 
        borderRadius: 8,
    },

    songCardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors[mode].dividerColor,
      },
      songInfo: {
        flex: 1,
        justifyContent: 'flex-start',
      },
      songName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors[mode].fgColor,
      },
      songDate: {
        color: colors[mode].fgColor,
      },
      ratingDisplay: { 
        flexDirection: 'row',
        justifyContent: 'flex-end',
      },

      profileImageContainer: {
        width: 80, 
        height: 80,
        borderRadius: 40, 
        overflow: 'hidden',
        marginRight: 10, 
        borderColor: colors[mode].fgColorLighter, 
        borderWidth: 2, 
      },
      profileImage: {
        width: '100%',
        height: '100%',
      },
      profileNameText: {
        fontSize: 24,
        fontWeight: 'bold', 
        flex: 1, 
        color: colors[mode].fgColor, 
        
      },
      profileSection: {
        flexDirection: 'row', 
        alignItems: 'center', 
        alignSelf: 'flex-start', 
    },
    profileText: {
        marginLeft: 10,
        fontSize: 18, 
        color: colors[mode].fgColor, 
        
    },

    profileLocationContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
        backgroundColor: colors[mode].bgColor, 
    },

    addPhotoText: {
        color: colors[mode].fgColor, 
        fontSize: 20, 
        backgroundColor: colors[mode].bgColor, 
        padding: 10, 
        borderRadius: 5, 
        textAlign: 'center', 
        marginTop: 10,
      },

}); 

export const darkModeMapStyle = [
    { "elementType": "geometry", "stylers": [{ "color": "#212121" }] },
    { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
    { "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
    { "elementType": "labels.text.stroke", "stylers": [{ "color": "#212121" }] },
    { "featureType": "administrative", "elementType": "geometry", "stylers": [{ "color": "#757575" }] },
    { "featureType": "administrative.country", "elementType": "labels.text.fill", "stylers": [{ "color": "#9e9e9e" }] },
    { "featureType": "administrative.land_parcel", "stylers": [{ "visibility": "off" }] },
    { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [{ "color": "#bdbdbd" }] },
    { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
    { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#181818" }] },
    { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{ "color": "#616161" }] },
    { "featureType": "poi.park", "elementType": "labels.text.stroke", "stylers": [{ "color": "#1b1b1b" }] },
    { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "color": "#2c2c2c" }] },
    { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#8a8a8a" }] },
    { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#373737" }] },
    { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#3c3c3c" }] },
    { "featureType": "road.highway.controlled_access", "elementType": "geometry", "stylers": [{ "color": "#4e4e4e" }] },
    { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [{ "color": "#616161" }] },
    { "featureType": "transit", "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
    { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#000000" }] },
]



