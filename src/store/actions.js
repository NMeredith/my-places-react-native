import moment from 'moment';
import Place from '../model/Place';
import { ADD_PLACE_ACTION } from './constants';


export const addPlace = ({name, image}) => {
    return {
        type: ADD_PLACE_ACTION,
        place: new Place(moment().unix(), name, image)
    }
}