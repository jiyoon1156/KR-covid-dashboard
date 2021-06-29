import mongoose from 'mongoose';

const CovidDailySchema = new mongoose.Schema({
	date: { type: Date, required: true, unique: true },
	confirmed: { type: Number, required: true },
});

const CovidDaily = mongoose.model("CovidDaily", CovidDailySchema);

export default CovidDaily;
