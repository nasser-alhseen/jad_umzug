import express from 'express';
import control from '../controllers/servicesar_controller.js';
const router = express.Router();

router.post('/upload/:lang', control.upload);
router.delete('/delete/:id', control.delete);
router.get('/all/:lang', control.all);
export default router;
