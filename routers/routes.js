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


export default router;
