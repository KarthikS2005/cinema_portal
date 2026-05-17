import mongoose, { Schema, Document} from "mongoose";

export interface Movies extends Document {
  moviename:String,
  certificate:String,
  seatnumber:String,
  screen:String,
  projection:String,
  location:String,
}

const movieSchema: Schema<Movies> = new Schema({

  moviename: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  certificate: {
    type: String,
    required: [true, "certificate is required"],
    trim: true,
  },
  seatnumber: {
    type: String,
    required: [true, "seatnumber is required"],
    trim: true,
  },
  screen: {
    type: String,
    required: [true, "screen is required"],
    trim: true,
  },
  location: {
    type: String,
    required: [true, "location is required"],
    trim: true,
  },
  projection: {
    type: String,
    required: [true, "projection is required"],
    trim: true,
  },

});
const movieModel =
  (mongoose.models.User as mongoose.Model<Movies>) ||
  mongoose.model<Movies>("Movies", movieSchema);

export default movieModel;
