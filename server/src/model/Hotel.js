import mongoose from "mongoose";

const Schema = mongoose.Schema;

const hotelSchema = new Schema(
    {
        hotelName:{ type: String },
        hotelAddress:
        {
            city: { type: String },
            state: { type: String },
            zipcode: { type: String },
            country: { type: String },
        },
        //hardcode or user input?
        seasonalHike: {
            holidays: {type: Number, default : 20},
            weekend: {type: Number, default : 10},       
        },
        rooms : [
            {
                room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
            },
        ],
        customers : [
            {
                customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
            },
        ],

        photoUrl: { type : String, default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.britannica.com%2Ftopic%2Fhotel&psig=AOvVaw0HTIjedVKwz4Br3R-YL6rF&ust=1650848624215000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCJji9MHAq_cCFQAAAAAdAAAAABAD" }
        
})

const Hotel = mongoose.model("Hotel", hotelSchema);
export default Hotel;
