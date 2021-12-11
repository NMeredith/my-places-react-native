import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Platform } from 'react-native';
import { COLORS } from '../assets/Constants';
import AddPlaceScreen from '../screens/AddPlaceScreen';
import ListPlacesScreen from '../screens/ListPlacesScreen';
import MapScreen from '../screens/MapScreen';
import PlaceDetails from '../screens/PlaceDetails';

const basicNavigationOptions = {
    headerStyle: {
        backgroundColor: Platform.OS  === 'android' ? COLORS.main : 'white',
    },
    headerTintColor: COLORS.main,
    headerTitleStyle: {
      color: Platform.OS  === 'android' ? COLORS.textColorLight : COLORS.main,
      fontFamily: 'comfortaa',
      fontSize: 26
    },
    headerTitleAlign: 'center',
    headerBackTitleStyle: {
      fontFamily: 'comfortaa',
      fontSize: 18
    }
}
  
const Stack = createStackNavigator();


export const MainNavigator = ({}) => {
    return (
        <Stack.Navigator screenOptions={basicNavigationOptions} >
          <Stack.Screen name="list" component={ListPlacesScreen} options={{title: 'My places'}}/>
          <Stack.Screen name="map" component={MapScreen} />
          <Stack.Screen name="details" component={PlaceDetails} />
          <Stack.Screen name="add" component={AddPlaceScreen} />
        </Stack.Navigator>
    );
}