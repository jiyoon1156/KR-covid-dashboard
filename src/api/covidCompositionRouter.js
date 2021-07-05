import express from 'express';
import CovidComposition from '../models/CovidComposition.js';

const router = express.Router();

router.route('/')
	.get(async(req, res, next) => {
		try {
			const composition = await CovidComposition.find({}).sort('date');
			const len = composition.length;
			res.json(composition[len - 1]);
		} catch (err) {
			console.error(err);
			next(err);
		}
	});

export default router;
