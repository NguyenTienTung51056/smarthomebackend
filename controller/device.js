const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const Device = require('../model/devices');

function isValidObjectId(id) {
    return ObjectId.isValid(id) && new ObjectId(id).toString() === id;
}

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
    const { id } = req.params;

    try {
        const device = await Device.findById(id);

        if (!device) {
            return res.status(404).json({ message: 'Device not found' });
        }

        const allowedUpdates = ['name', 'valueName', 'status', 'type', 'mode', 'icon', 'valueOn', 'valueOff', 'data']; // Allowed fields
        const updates = Object.keys(req.body);
        const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));

        if (!isValidUpdate) {
            return res.status(400).json({ message: 'Invalid field(s) for update' });
        }

        updates.forEach((update) => (device[update] = req.body[update]));
        const updatedDevice = await device.save();

        res.status(200).json(updatedDevice);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



//update status device

const updateStatus = async (req, res) => {
    const { id } = req.params;

    try {
        const device = await Device.findById(id);

        if (!device) {
            return res.status(404).json({ message: 'Device not found' });
        }

        const allowedUpdates = ['name', 'valueName', 'status', 'type', 'mode', 'icon', 'valueOn', 'valueOff', 'data']; // Allowed fields
        const updates = Object.keys(req.body);
        const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));

        if (!isValidUpdate) {
            return res.status(400).json({ message: 'Invalid field(s) for update' });
        }

        updates.forEach((update) => (device[update] = req.body[update]));
        const updatedDevice = await device.save();

        res.status(200).json(updatedDevice);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



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
    const id = req.params.id;
    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    try {
        const device = await Device.findById(id);

        if (!device) {
            return res.status(404).json({ error: 'Device not found' });
        }

        return res.status(200).json(device);
    } catch (error) {
        // Xử lý khi có lỗi
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

//delete device
const deleteDevice = async (req, res) => {
    try {
        const device = await Device.deleteOne({ _id: req.params.id });
        res.status(200).json({
            message: "Device has been deleted...",
        });
    } catch (err) {
        res.status(500).json(err);
    }
}


module.exports = { create, update, devices, device, updateStatus, deleteDevice };