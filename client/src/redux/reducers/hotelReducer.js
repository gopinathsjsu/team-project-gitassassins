import { GET_ALL_HOTELS, GET_HOTEL, SET_SELECTED_ROOM, ROOM_SEARCH, BREAKFAST, FITNESSROOM, POOL , PARKING, MEALS } from '../types'
  
  const initialState = {
    breakfastRate : 20,
    fitnessRate : 5,
    swimmingRate : 8,
    parkingRate : 10,
    mealRate : 18,
    allHotels : [],
    selectedHotel : {},
    selectedRoom : '',
    roomSearch : false,
    startDate : '',
    endDate : '',
    breakfast : false,
    fitnessRoom : false,
    pool : false,
    parking : false,
    meals : false,

    availability : []
    // availability : [{
    //   type : 'single',
    //   price: 200,
    //   photoUrl: "https://14reasonswhy.gr/storage/2019/04/Small-Double-Room-2.jpg",
    //   maximumOccupancy : 2,
    //   availableRooms : 10
    // },
    // {
    //   type : 'king',
    //   price: 400,
    //   photoUrl: "https://dh-prod-cdn.azureedge.net/-/media/property/destination-hotels/hotel-de-anza/deluxe-de-anza-king.jpg?ts=6a31677d-e712-4e19-be27-eb691d802baa",
    //   maximumOccupancy : 5,
    //   availableRooms : 10
    // },
    // {
    //   type : 'queen',
    //   price: 300,
    //   photoUrl: "https://media-cdn.tripadvisor.com/media/photo-s/06/da/82/8e/rooms-hotel-tbilisi.jpg",
    //   maximumOccupancy : 4,
    //   availableRooms : 10
    // },
    // {
    //   type : 'suite',
    //   price: 600,
    //   photoUrl: "https://www.omnihotels.com/-/media/images/hotels/daldtn/reservationrooms/daldtn_lk_2.jpg?h=660&la=en&w=1170",
    //   maximumOccupancy : 6,
    //   availableRooms : 10
    // }]
  }
  
  export default function hotelReducer(state = initialState, action){
    switch(action.type){
      case BREAKFAST:
        return {
          ...state,
          breakfast : !state.breakfast,
        }

        case FITNESSROOM:
        return {
          ...state,
          fitnessRoom : !state.fitnessRoom,
        }

        case POOL:
        return {
          ...state,
          pool : !state.pool,
        }

        case PARKING:
        return {
          ...state,
          parking : !state.parking,
        }
        case MEALS:
        return {
          ...state,
          meals : !state.meals,
        }

      case GET_ALL_HOTELS:
        return {
          ...state,
          allHotels : action.payload
        }
        
      case GET_HOTEL:
        return {
          ...state,
          selectedHotel : action.payload
        }

      case SET_SELECTED_ROOM:
        return {
          ...state,
          selectedRoom : action.payload
        }

      case ROOM_SEARCH:
        return {
          ...state,
          roomSearch : true,
          availability : action.payload,
          startDate : action.startDate,
          endDate : action.endDate,
        }

      default : 
        return {
            ...state
        }
    }
  }