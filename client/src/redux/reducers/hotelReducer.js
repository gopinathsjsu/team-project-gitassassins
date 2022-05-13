import { GET_ALL_HOTELS, GET_HOTEL } from '../types'
  
  const initialState = {
    allHotels : [],
    selectedHotel : {},
    availability : {
      single: {
        availableRooms: 1,
        maximumOccupancy: 1,
        price: 200,
        photoUrl: "https://14reasonswhy.gr/storage/2019/04/Small-Double-Room-2.jpg",
      },
      king: {
        availableRooms: 1,
        maximumOccupancy: 6,
        price: 400,
        photoUrl: "https://dh-prod-cdn.azureedge.net/-/media/property/destination-hotels/hotel-de-anza/deluxe-de-anza-king.jpg?ts=6a31677d-e712-4e19-be27-eb691d802baa",
      },
      queen: {
        availableRooms: 2,
        maximumOccupancy: 3,
        price: 300,
        photoUrl: "https://media-cdn.tripadvisor.com/media/photo-s/06/da/82/8e/rooms-hotel-tbilisi.jpg",
      },
      suite: {
        availableRooms:  6,
        maximumOccupancy: 6,
        price: 600,
        photoUrl: "https://www.omnihotels.com/-/media/images/hotels/daldtn/reservationrooms/daldtn_lk_2.jpg?h=660&la=en&w=1170",
      },
    }
  }
  
  export default function hotelReducer(state = initialState, action){
    switch(action.type){
      case GET_ALL_HOTELS:
        return {
          allHotels : action.payload
        }
        
      case GET_HOTEL:
        return {
          ...state,
          selectedHotel : action.payload
        }

      default : 
        return {
            ...state
        }
    }
  }