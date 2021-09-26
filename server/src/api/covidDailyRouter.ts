import express from 'express';
import CovidDaily from '../models/CovidDaily';

const router = express.Router();

router.route('/')
	.get(async (req, res, next) => {
		try {
			const covidInfo = await CovidDaily.find({}).sort('date');
			res.json(covidInfo.slice(-9));
		} catch (err) {
			console.error(err);
			next(err);
		}
	})

export default router;
