import express from 'express';
import { createContract, editAudit, deleteAudit, getAllContracts } from '../controllers/smart-contract.js';

const router = express.Router();

router.get('/contracts', getAllContracts)
// Route to create a new smart contract
router.post('/contracts', createContract);

// Route to edit an existing audit
router.put('/contracts/:id/edit-audit', editAudit);

// Route to delete an audit
router.delete('/contracts/:id', deleteAudit);

export default router;
