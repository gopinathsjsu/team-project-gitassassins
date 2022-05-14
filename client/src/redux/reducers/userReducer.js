import { LOCATION_FILTER, LOGIN_USER } from '../types'
  
const initialState = {
    authenticated : false,
    // authenticatedUser : {
    //     _id : '627feafa2c7557ea4e2032a1',
    //     firstName :"Jui",
    //     lastName :"Thombre",
    //     email:"jui@gmail.com",
    //     password:"jui",
    //     rewardPoints:0
    // },
    authenticatedUser : {},
    location : '',
}

export default function userReducer(state = initialState, action){
    switch(action.type){
        case LOGIN_USER:
            return {
                authenticatedUser : action.payload
            }
        
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