import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions, StyleSheet, Text } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { COLORS } from "../assets/Constants";
import CustomHeaderButton from "../components/CustomHeaderButton";
import ScreenView from "../components/ScreenView";

const MapScreen = ({navigation}) => {

    const [latLong, setLangLong] = React.useState({
        latitude: 37.78825,
        longitude: -122.4324,
    })

    const onPick = ({ nativeEvent}) => {
        setLangLong(nativeEvent.coordinate);
    }

    React.useEffect(() => {
        navigation.setParams(latLong)
    }, [latLong]);

    const region = {
        latitude: latLong?.latitude ?? 37.78825,
        longitude: latLong.longitude ?? -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }
      
    return (
        <ScreenView>
            <MapView style={styles.map} initialRegion={region} onPress={onPick}>
                <Marker
                    coordinate={latLong}
                    title={'Picked location'}
                />
            </MapView>
        </ScreenView>
    )
}

const ReturnLocationButton = (props) => {
    const {value} = props;
    const navigation = useNavigation();
    const press = () => navigation.navigate('add', {location: value})
    return (
        <CustomHeaderButton {...props} title='Add place' 
                            onPress={press} >
            <Text style={styles.buttonHeader}>
                Save
            </Text>
        </CustomHeaderButton>
       
    )
}


export const MapOptions = ({ route, navigation }) => {
    return {
        headerRight: (props) => (
            <ReturnLocationButton {...props} 
                                  value={route?.params}/>
        ),
        headerTitle: 'Pick a location'
  }
}


const styles = StyleSheet.create({
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    buttonHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingTop: 6,
        color: Platform.OS  === 'android' ? COLORS.color3 : COLORS.main,
    }
});


export default MapScreen;