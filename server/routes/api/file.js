const router = require('express').Router();
const multer = require('multer');
const FileController = require('../../controllers/FileController');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/filter', upload.single('csvFile'), FileController.filter);

module.exports = router;
