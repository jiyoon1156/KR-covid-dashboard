import express from 'express';
import Vaccine from '../models/Vaccine.js';

const router = express.Router();

router.route('/')
	.get((req, res, next) => {
		try {
			const vaccineInfo = Vaccine.find({}).sort('date');
			res.json(vaccineInfo);
		} catch (err) {
			console.error(err);
			next(err);
		}
	})

	export default router;
