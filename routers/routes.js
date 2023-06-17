import express from 'express';
import pictures from './pictures.router.js';
import txt from './txt.router.js';

let router = express.Router();

router.use('/image', pictures);

router.use('/txt', txt);

export default router;
