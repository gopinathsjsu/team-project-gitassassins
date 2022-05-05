import { GET_ALL_HOTELS } from '../types'
  
  const initialState = {
    allHotels : [],
  }
  
  export default function (state = initialState, action){
    switch(action.type){
        case GET_ALL_HOTELS:
            return {
              allHotels : action.payload
            }
          
        default : 
            return {
                ...state
            }
    }
  }