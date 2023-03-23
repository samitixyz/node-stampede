const express =require("express");
const decodeRoutes = express.Router();
const decode_controller = require("../controllers/decodeController");
decodeRoutes.get('/decode', decode_controller.log_list);
decodeRoutes.post('/decode', decode_controller.decoding);
decodeRoutes.post('/download', decode_controller.download);

module.exports = decodeRoutes;
