const Supplier = require('../models/Supplier');

exports.createSupplier = async (req, res) => {
    try {
        const supplierData = req.body;
        const newSupplier = await Supplier.createSupplier(supplierData);
        res.status(201).json(newSupplier);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create supplier' });
    }
};

exports.getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.getAllSuppliers();
        res.json(suppliers);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch suppliers' });
    }
};

exports.getSupplierById = async (req, res) => {
    try {
        const supplier = await Supplier.getSupplierById(req.params.id);
        res.json(supplier);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch supplier' });
    }
};

exports.updateSupplier = async (req, res) => {
    try {
        const updatedSupplier = await Supplier.updateSupplier(req.params.id, req.body);
        res.json(updatedSupplier);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update supplier' });
    }
};

exports.deleteSupplier = async (req, res) => {
    try {
        await Supplier.deleteSupplier(req.params.id);
        res.json({ message: 'Supplier deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete supplier' });
    }
};