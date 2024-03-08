import mongoose, { Schema } from "mongoose";

const vidSchema = new Schema({
  title: {
    type: String,
    required: false,
  },
  link: {
    type: String,
    required: true,
  },
  stkids: {
    type: [[String, Number]],
    required: false,
  },
})

const Video = mongoose.models.Video || mongoose.model("Video", vidSchema);

export default Video;