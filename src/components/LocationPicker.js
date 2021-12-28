import * as Location from 'expo-location';
import React from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { COLORS } from '../assets/Constants';
import FontText from './FontText';

const LocationPicker = ({applyLocation}) => {
    const [status, requestPermission] = Location.useForegroundPermissions()

    const [location, setLocation] = React.useState(null);
    const onPress = async () => {
        if (!status?.granted) {
            const result = await requestPermission();
            if (!result?.granted) Alert.alert(
                "No access to location",
                "To get location data, you should grant permissions to location",
                [

                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );
        }
        else {
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            applyLocation(location)
        }
    }
    return (
        <View style={styles.mainContainer}>
            {location ? 
                <Text>Location selected</Text>
                :
                <View style={styles.previewContainer}>
                    <FontText>No location selected</FontText>
                </View>
            }
            
            <Button title={'Get location'} onPress={onPress} style={styles.button}
                    color={COLORS.main}/>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        margin: 10,
        borderWidth: 2,
        borderColor: COLORS.accent,
        borderStyle: 'solid',
        padding: 10,
        borderRadius: 4,
        alignItems: 'center'

    },
    previewContainer: {
        height: 200,
        justifyContent: 'center'
    },
    button: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        
    },
    image: {
        margin: 10,
        height: 200,
        width: '100%'
    }
});

export default LocationPicker