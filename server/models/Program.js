import mongoose from 'mongoose';

const programSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  instructor: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Leadership', 'Engineering', 'Media', 'Business', 'Spirituality']
  },
  imageUrl: {
    type: String
  },
  lessonsCount: {
    type: Number,
    default: 10
  }
}, {
  timestamps: true
});

const Program = mongoose.model('Program', programSchema);
export default Program;
