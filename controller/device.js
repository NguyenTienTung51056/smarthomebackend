//controler for device
const Device = require('../model/devices');

const create = async (req, res) => {
    const newDevice = new Device(req.body);
    try {
        const device = await newDevice.save();
        res.status(200).json(device);
    } catch (err) {
        res.status(500).json(err);
    }
}


//update device
const update = async (req, res) => {
    const device = await Device.findById(req.params.id);
    try {
        const updatedDevice = await Device.updateOne(device, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updatedDevice);
    } catch (err) {
        res.status(500).json(err);
    }
}

//update status device

const updateStatus = async (req, res) => {
    const device = await Device.findById(req.params.id);
    try {
        const updatedStatus = await Device.updateOne(device, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updatedStatus);
    } catch (err) {
        res.status(500).json(err);
    }
}


//get device
const devices = async (req, res) => {
    try {
        const devices = await Device.find();
        res.status(200).json(devices);
    } catch (err) {
        res.status(500).json(err);
    }
}


//get device by id
const device = async (req, res) => {
    try {
        const device = await Device.findById(req.params.id);
        res.status(200).json(device);
    } catch (err) {
        res.status(500).json(err);
    }
}

//delete device
const deleteDevice = async (req, res) => {
    try {
        const device = await Device.deleteOne(req.params.id);
        res.status(200).json(device);
    } catch (err) {
        res.status(500).json(err);
    }
}


module.exports = { create, update, devices, device, updateStatus, deleteDevice };