import { LOCATION_FILTER, LOGIN_USER, GET_LOYALTY } from '../types'
  
const initialState = {
    // authenticated : false,
    authenticated : true,
    authenticatedUser : {
        _id : '627feafa2c7557ea4e2032a1',
        firstName :"Jui",
        lastName :"Thombre",
        email:"jui@gmail.com",
        password:"jui",
        rewardPoints:100
    },
    // authenticatedUser : {},
    location : '',
    loyalty : 0
}

export default function userReducer(state = initialState, action){
    switch(action.type){
        case LOGIN_USER:
            return {
                ...state,
                authenticated : true,
                authenticatedUser : action.payload
            }
        
        case LOCATION_FILTER:
            return {
                ...state,
                location : action.payload
            }
        
        case GET_LOYALTY:
            return {
                ...state,
                loyalty : action.payload
            }
            
        default : 
            return {
                ...state
            }
    }
}