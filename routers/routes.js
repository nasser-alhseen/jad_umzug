import express from 'express';
import pictures from './pictures.router.js';
import servicesRouter from './txt.router.js';
import servicesarRouter from './servicesar.js';

import opinionsRouter from './opinions._router.js';

let router = express.Router();

router.use('/image', pictures);
router.use('/services', servicesRouter);
router.use('/servicesar', servicesarRouter);
router.use('/opinions', opinionsRouter);
router.get('/available-dates', (req, res) => {
    const availableDates = ['2023-09-5'];
    res.json(availableDates);
});

export default router;
