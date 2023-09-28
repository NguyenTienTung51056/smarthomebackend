const express = require('express');
const router = express.Router();

const { create, update, devices, device,updateStatus } = require('../controller/device');

router.post("/", create);
router.put("/:id", update);
router.patch("/:id", updateStatus);
// router.patch("/:id", updateMode);
// router.patch("/:id", updateData);
// router.delete("/:id", deleteDevice);
router.get("/find/:id", device);
router.get("/", devices);

module.exports = router;
