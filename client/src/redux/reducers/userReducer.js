import { LOCATION_FILTER } from '../types'
  
const initialState = {
    location : '',
}

export default function (state = initialState, action){
    switch(action.type){
        case LOCATION_FILTER:
            return {
                location : action.payload
            }
            
        default : 
            return {
                ...state
            }
    }
}