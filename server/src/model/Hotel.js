import mongoose from "mongoose";

const Schema = mongoose.Schema;

const hotelSchema = new Schema(
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
        seasonalHike: {
            Holidays: 20,
            Weekend: 10        
        },
        rooms : [
            {
                Room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
            },
        ],
        customers : [
            {
                Room: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
            },
        ],

        photoUrl: { type : String }
        
})

const Hotel = mongoose.model("Hotel", hotelSchema);
export default Hotel;
