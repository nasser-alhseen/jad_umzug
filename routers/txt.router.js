import express from 'express';
import control from '../controllers/services.controller.js';
const router = express.Router();

router.post('/upload', control.upload);
router.delete('/delete/:id', control.delete);
router.post('/all', control.all);
export default router;
