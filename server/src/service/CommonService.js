import Hotel from "../model/Hotel.js";
import Reservation from "../model/Reservation.js";

class CommonService {

    getHotelReservations = async(hotelId, startDate, endDate) =>
    {

        try {

           
            
            const booked = await Reservation.find(
                {
                    hotelId : hotelId,
                    startDate: {
                        $lte: startDate,
                    },
                    endDate : {
                        $gte: endDate
                    }
                }
            )

            console.log("booked: ", booked);
            return booked;


        } catch (err) {
            console.error(err);
        }

    };

}

export default CommonService;