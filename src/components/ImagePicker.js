import * as ImagePickerExpo from 'expo-image-picker';
import React from "react";
import { Alert, Button, Image, StyleSheet, View } from "react-native";
import { COLORS } from '../assets/Constants';
import FontText from './FontText';

const ImagePicker = ({applyImage}) => {
    const [status, requestPermission] = ImagePickerExpo.useCameraPermissions();

    const [image, setImage] = React.useState(null);
    const onPress = async () => {
        if (!status?.granted) {
            const result = await requestPermission();
            if (!result?.granted) Alert.alert(
                "No access to camera",
                "To take photo, you should grant permissions to camera",
                [

                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );
        }
        else {
            const result = await ImagePickerExpo.launchCameraAsync({
                allowsEditing: true,
                quality: 0.4,
                aspect: [16, 9],
            })
            if (!result.cancelled) {
                setImage(result?.uri);
                applyImage(result?.uri);
            }
        }
    }
    return (
        <View style={styles.mainContainer}>
            {image ? 
                <Image source={{uri:image}} style={styles.image}/>
                :
                <View style={styles.previewContainer}>
                    <FontText>No image selected</FontText>
                </View>
            }
            
            <Button title={'Take photo'} onPress={onPress} style={styles.button}
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

export default ImagePicker