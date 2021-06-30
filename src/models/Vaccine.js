import mongoose from 'mongoose';

const VaccineSchema = new mongoose.Schema({
	date: { type: Date, required: true, unique: true },
	accumulateFirstCnt: { type: Number, required: true },
	accumulateSecondCnt: { type: Number, required: true },
});

const Vaccine = mongoose.model("Vaccine", VaccineSchema);

export default Vaccine;
