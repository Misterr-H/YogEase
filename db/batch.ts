import mongoose from 'mongoose';

const batchSchema = new mongoose.Schema({
    timeSlot: { type: String, required: true },
    maximumCapacity: { type: Number, required: true },
    price: { type: Number, required: true },
});

const Batch = mongoose.model('Batch', batchSchema);

export default Batch;
