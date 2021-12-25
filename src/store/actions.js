import * as FileSystem from 'expo-file-system';
import moment from 'moment';
import { addPlacetoSql, getPlacesFromSql } from '../helper/db';
import Place from '../model/Place';
import { ADD_PLACE_ACTION, LOAD_PLACES } from './constants';

export const retrievePlaces = () => {
    return async dispatch => {
        const elements = await getPlacesFromSql();
        const result = elements?.rows?._array ?? [];
        dispatch({
            type: LOAD_PLACES,
            data: result.map(e => new Place(e.id, e?.title, e?.imageUri))
        })
    }
}

export const addPlace = ({name, image}) => {
    return async dispatch => {
        const fileName = image.split('/').pop();
        const newPath = `${FileSystem.documentDirectory}${fileName}`;
        try {
            await FileSystem.moveAsync({
                from: image,
                to: newPath
            });
        }
        catch(e) {
            console.log(e);
        }
        const result = await addPlacetoSql(name, newPath)
        dispatch({
            type: ADD_PLACE_ACTION,
            place: new Place(moment().unix(), name, newPath)
        });
    }
}