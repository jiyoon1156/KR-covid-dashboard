import express from 'express';
import covidDaily from '../models/CovidDaily.js';

const router = express.Router();

router.route('/')
	.get(async (req, res, next) => {
		try {
			const covidInfo = await covidDaily.find({});
			res.json(covidInfo);
		} catch (err) {
			console.error(err);
			next(err);
		}
	})

export default router;
