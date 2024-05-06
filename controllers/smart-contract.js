import SmartContract from '../models/SmartContract.js';


// Controller to get all contracts
export const getAllContracts = async (req, res) => {
    try {
        const contracts = await SmartContract.find();
        res.status(200).json(contracts);
    } catch (error) {
        res.status(400).json({ message: "Error fetching contracts", error: error });
    }
};

// Controller to create a new contract
export const createContract = async (req, res) => {
    const { chainName, contractCode, contractAddress, securityLevel } = req.body;
    try {
        const newContract = new SmartContract({
            chainName,
            contractCode,
            contractAddress,
            securityLevel,
            auditStatus: 'Pending' // Defaulting the audit status to 'Pending'
        });
        await newContract.save();
        res.status(201).send(newContract);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Controller to edit an existing audit
export const editAudit = async (req, res) => {
    const { id } = req.params;
    const { auditor, findings, recommendations } = req.body;
    try {
        const updatedContract = await SmartContract.findByIdAndUpdate(id, {
            $push: { auditHistory: { auditor, findings, recommendations } },
            $set: { auditStatus: 'In Progress' } // Optionally update status
        }, { new: true });
        res.status(200).send(updatedContract);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Controller to delete an audit
export const deleteAudit = async (req, res) => {
    const { id } = req.params;
    try {
        await SmartContract.findByIdAndDelete(id);
        res.status(200).send({ message: 'Contract deleted successfully' });
    } catch (error) {
        res.status(400).send(error);
    }
};
