import mongoose from "mongoose";

const writerSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  heading: {
    type: String,
    required: true,
  },
  story: {
    type: String,
    required: true,
  },
  storyImage: {
    public_id: {
      type: String,
    },
    originalUrl: {
      type: String,
    },
    compressedUrl: {
      type: String,
    },
  },
});

const Writer = mongoose.model("Writer", writerSchema);

export default Writer;
