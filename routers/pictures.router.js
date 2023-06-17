import express from 'express';
import { uploadImage } from '../middleware/uploadImage.js';
import control from '../controllers/pictures.controller.js';
const router = express.Router();

router.post('/upload', uploadImage('images'), control.upload);
router.delete('/delete/:id', control.delete);

router.get('/all', control.all);
export default router;
