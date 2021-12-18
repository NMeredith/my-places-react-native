import { Ionicons } from '@expo/vector-icons';
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { COLORS } from '../assets/Constants';
import globalStyles from '../assets/styles';
import CustomHeaderButton from "../components/CustomHeaderButton";
import FontText from '../components/FontText';
import ImagePicker from '../components/ImagePicker';
import { addPlace } from '../store/actions';

const AddPlaceScreen = ({navigation}) => {
    const [title, setTitle] = React.useState('');
    const [image, applyImage] = React.useState(null);
    React.useEffect(() => {
        navigation.setParams({name:title, image})
    }, [title]);

    return (
        <ScrollView style={globalStyles.margin8}>
           <View style={styles.titleContainer}>
                <FontText style={{...globalStyles.font24, ...globalStyles.bold, ...styles.text}}>Title</FontText>
                <View style={styles.editTitleView}>
                    <TextInput id='title' 
                                title={'Title'}
                                onChangeText={setTitle}
                                value={title}
                                style={{
                                    ...globalStyles.font24,
                                    ...globalStyles.paddingHorizontal5
                                }}
                                returnKeyType={'next'}
                                placeholder="Enter your title"/>
                </View>
           </View>
           <ImagePicker applyImage={applyImage}/>
        </ScrollView>
    )
}

const SavePlaceButton = ({onPress, value, ...props}) => {
    const dispatch = useDispatch();
    const press = () => {
        dispatch(addPlace(value));
        setTimeout(() => onPress(), 150)
    }
    return (
        <CustomHeaderButton {...props} title='Save place' onPress={press}>
            <Ionicons name='save-outline' 
                      size={30} 
                      color={Platform.OS  === 'android' ? COLORS.color3 : COLORS.main}/>
        </CustomHeaderButton>
    )
}

export const AddPlaceOptions = ({ route, navigation }) => {
    return {
        headerRight: (props) => (
            <SavePlaceButton {...props} 
                             value={route?.params}
                             onPress={() => navigation.navigate({name: 'list'})} />
        ),
        headerTitle: 'Add new place'
  }
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 20

    },
    text: {
        color: COLORS.accent
    },
    editTitleView: {
        flex: 1,
        marginHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.main,
    },
    
})

export default AddPlaceScreen;