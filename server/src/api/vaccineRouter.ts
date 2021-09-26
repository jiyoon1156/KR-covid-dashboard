import express from 'express';
import Vaccine from '../models/Vaccine';

const router = express.Router();

router.route('/')
	.get(async (req, res, next) => {
		try {
			const vaccineInfo = await Vaccine.find({}).sort('date');
			res.json(vaccineInfo.slice(-7));
		} catch (err) {
			console.error(err);
			next(err);
		}
	})

	export default router;
