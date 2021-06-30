import mongoose from 'mongoose';

const CovidCompositionSchema = new mongoose.Schema({
	date: { type: Date, required: true, unique: true },
	accumulatedConfirmed: { type: Number, required: true },
	deaths: { type: Number, required: true },
	recovered: { type: Number, required: true },
	active: { type: Number, required: true },
});

const CovidComposition = mongoose.model("CovidComposition", CovidCompositionSchema);

export default CovidComposition;
