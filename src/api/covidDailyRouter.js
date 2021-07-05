import express from 'express';
import CovidDaily from '../models/CovidDaily.js';

const router = express.Router();

router.route('/')
	.get(async (req, res, next) => {
		try {
			const covidInfo = await CovidDaily.find({}).sort('date');
			res.json(covidInfo);
		} catch (err) {
			console.error(err);
			next(err);
		}
	})

export default router;
