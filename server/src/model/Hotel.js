import mongoose from 'mongoose';

const Schema = mongoose.Schema;


var hotelSchema = new Schema(
    {
        hotelName:{ type: String },
        hotelAddress:
        {
            city: { type: String },
            state: { type: String },
            street: { type: String },
            zipcode: { type: String },
            country: { type: String },
        },
        //hardcode or user input?
        SeasonalHike: {
            Holidays: 20,
            Weekend: 10        
        },
        Rooms : [
            {
                Room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
            },
        ],
        Customers : [
            {
                Room: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
            },
        ],
        
})
const Hotel = mongoose.model("Hotel", hotelSchema);
export default Hotel;
